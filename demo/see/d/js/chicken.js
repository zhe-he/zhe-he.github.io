/*
 * create by zhe-he
 * e-mail: luanhong_feiguo@sina.com
 * 
 */

new Vue({
	el: "#chicken",
	data: {
		t_timer: null,
		a_tixian: {
			me: 0,
			friend: 0,
			all: 0
		},
		a_message: {
			font: '',
			isStatus: 1,
			isClose: true
		},
		isMenuCz: 0,
		isGuize: false, 
		isTuijian: false,
		j_data: {
			ji: 8,
			dan: 15,
			di: 5
		}
	},
	computed: {
		tian: function (){
			var arr = [];
			for (var i = 0; i < 10; i++) {
				arr.push({"active": 0,"numji": 0});	
			}
			for (var i = 0; i < this.j_data.di; i++) {
				arr[i].active = 1;
			}
			var x_ji = this.j_data.ji/2;
			for (var i = 0; i < x_ji; i++) {
				arr[i].numji = 2;
			}
			Math.floor(x_ji) != Math.ceil(x_ji)?arr[i-1].numji = 1:'';
			return arr;
		}
	},
	mounted: function (){
		var _this = this;
		if (Math.random()<0.5) {
			_this.a_message.isClose = false;
			_this.a_message.isStatus = 1;
			var num = 10;
			_this.a_message.message = '通过你的小伙伴分享，你已获得了'+num+'个蛋。';
			_this.j_data.dan += num;
		}
		if (Math.random()<0.5) {
			setTimeout(function (){
				_this.a_message.isClose = true;
				_this.$nextTick(function (){
					var num2 = 3;
					_this.j_data.ji -= num2;
					_this.a_message.isClose = false;
					_this.a_message.isStatus = 2;
					_this.a_message.message = '你的鸡已不会生蛋了，将告别你';
				});
			},2000);
		}
	},
	methods: {
		show_menu_cz: function (num){
			this.isMenuCz = num;
		},
		mai: function (item){
			var _this = this;
			if (item.active) {
				if (item.numji<2) {
					if (window.confirm('是否花100只蛋买一只鸡?')) {
						_this.a_message.isClose = false;
						if (_this.j_data.ji==20) {
							_this.a_message.isStatus = 2;
							_this.a_message.message = '你已拥有20只超生产力的母鸡，无法再兑换！';
						}else{
							if (_this.j_data.dan >= 100) {
								_this.j_data.dan -= 100;
								_this.a_message.isStatus = 1;
								_this.j_data.ji += 1;
								_this.a_message.message = '你已拥有一只超生产力的母鸡！';
							}else{
								_this.a_message.isStatus = 2;
								_this.a_message.message = '鸡蛋不足，无法购买';
							}	
						}
					}
				}
			}else{
				if (window.confirm('是否花10只蛋买一块地?')) {
					_this.a_message.isClose = false;
					if (_this.j_data.di == 10) {
						_this.a_message.isStatus = 2;
						_this.a_message.message = '你已永久拥有满10块养鸡的地，无法再兑换！';
					}else{
						if (_this.j_data.dan >= 10) {
							_this.j_data.dan -= 10;
							_this.a_message.isStatus = 1;
							_this.j_data.di += 1;
							_this.a_message.message = '你已永久拥有一块养鸡的地！';
						}else{
							_this.a_message.isStatus = 2;
							_this.a_message.message = '鸡蛋不足，无法购买';
						}
					}
				}
			}
		},
		cz: function (index){
			var _this = this;
			
			var ms1,ms2;
			this.a_message.isStatus = 1;
			switch(index){
				case 0:
					if (this.j_data.ji==20) {
						this.a_message.isStatus = 0;
						ms1 = '你已拥有20只超生产力的母鸡，无法再兑换！';
					}else{
						this.j_data.ji+=1;
						ms1 = '充值100元成功';
						ms2 = '你已拥有一只超生产力的母鸡！';
					}
					
					break;
				case 1:
					this.j_data.dan+=10;
					ms1 = '充值10元成功';
					ms2 = '你已成功兑换10个蛋！';
					break;
				case 2:
					if (this.j_data.di == 10) {
						this.a_message.isStatus = 0;
						ms1 = '你已永久拥有满10块养鸡的地，无法再兑换！';
					}else{
						this.j_data.di+=1;
						ms1 = '充值10元成功';
						ms2 = '你已永久拥有一块养鸡的地！';
					}
					break;
			}
			this.a_message.isClose = false;
			this.a_message.message = ms1;
			clearInterval(this.t_timer);
			if (ms2) {
				this.t_timer = setTimeout(function (){
					_this.a_message.isClose = true;
					_this.$nextTick(function (){
						_this.a_message.isClose = false;
						_this.a_message.message = ms2;
					});
				}, 1000);
			}
			
		},
		tixian: function (){
			if (this.j_data.dan>10) {
				var x = this.j_data.dan/10|0;
				this.j_data.dan -= (x*10);

				this.a_message.isClose = false;
				this.a_message.isStatus = 1;
				this.a_message.message = '恭喜你，提现'+x*10+'元成功！';

				this.a_tixian.me += x*10;
				this.a_tixian.all += x*10;
			}else{
				this.a_message.isClose = false;
				this.a_message.isStatus = 2;
				this.a_message.message = '鸡蛋少于10个，无法提现';
			}
		}
	}
})