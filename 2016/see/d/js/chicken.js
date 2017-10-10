/*
 * create by zhe-he
 * e-mail: luanhong_feiguo@sina.com
 * 
 */

new Vue({
	el: "#chicken",
	data: {
		c_money: 50,
		t_timer: null, 	// 弹窗时间控制器
		a_message: { 	// 弹窗
			font: '',
			isStatus: 1,
			isClose: true
		},
		isMenuCz: 0, 	// 充值菜单
		isGuize: false,  // 规则弹窗
		isTuijian: false,　// 推荐弹窗
		j_data: { 		// 用户的鸡蛋数据
			ji: 0,
			dan: 0,
			di: 1,
			die_ji: 0,
			friend: 0,
			all_money: 0
		},
		s_friend: [],
		tian: []
	},
	mounted: function (){
		/*var _this = this;
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
		}*/
		var _this = this;
		ajax({
			url: "inface/get_chicken.txt",
			data: {
				"user_id": user_id
			},
			type: "get",
			success: function (data){
				data = eval('('+data+')');
				_this.j_data = _this.copy(data.j_data);
				_this.tian = _this.copy(data.data);
				
				var s_time = 0;
				if (_this.j_data.friend > 0) {
					_this.show_msg(1,'通过你的小伙伴分享，你已获得了'+_this.j_data.friend+'个蛋。');
					_this.j_data.dan += _this.j_data.friend;
					_this.j_data.friend = 0;
					s_time = 2000;
				}

				if (_this.j_data.die_ji > 0) {
					setTimeout(function (){
						_this.show_msg(2,'很遗憾，你的鸡已不会生蛋了，将告别你。');
						_this.j_data.ji -= _this.j_data.die_ji;
					},s_time);
					
				}
			},
			error: function (){}
		});
		ajax({
			url: "inface/get_friend.txt",
			data: {
				"user_id": user_id
			},
			type: "get",
			success: function (data){
				data = eval('('+data+')');
				_this.s_friend = data.data.slice(0,8);
			},
			error: function (){}
		});

	},
	methods: {
		set_ji_di: function (type){
			if (type == 'ji') {
				for (var i = 0; i < this.tian.length; i++) {
					if (this.tian[i].ji.length<2) {
						this.tian[i].ji.push({dan:0});
						break;
					}
				}
			}else if(type == 'di'){
				for (var i = 0; i < this.tian.length; i++) {
					if (this.tian[i].isOpen != 1) {
						this.tian[i].isOpen = 1;
						break;
					}
				}
			}
		},
		copy: function (json){
			return JSON.parse(JSON.stringify(json));
		},
		put_dan: function (j,index,index2){
			var _this = this;
			if (j.dan>0) {
				ajax({
					url: "inface/put_dan.txt",
					data: {
						"user_id": user_id,
						"num_di": index,
						"num_ji": index2
					},
					type: "get",
					success: function(data){
						data = eval('('+data+')');
						if (!data.msg) {
							_this.j_data.dan += 5;
							_this.tian[index].ji[index2].dan = 0;
						}
					},
					error: function (){}
				})
			}
		},
		show_msg: function (status,font){
			this.a_message.isClose = false;
			this.a_message.isStatus = status;
			this.a_message.message = font;
		},
		show_menu_cz: function (num){
			this.isMenuCz = num;
		},
		mai:function(item,bool){
			var _this = this;
			if (item.isOpen) {
				if (item.ji.length<2) {
					if (!bool && item.ji.length==1 && item.ji[0].dan>0) {return };
					if (window.confirm('是否花100只蛋买一只鸡?')) {
						
						if (this.j_data.dan >= 100) {
							ajax({
								url: "inface/buy_ji_di.txt",
								data: {
									"user_id": user_id,
									"buy_ji": 1
								},
								type: "get",
								success: function (data){
									data = eval('('+data+')');
									if (!data.msg) {
										_this.j_data.dan -= 100;
										_this.j_data.ji += 1;
										_this.show_msg(1,'你已拥有一只超生产力的母鸡！');
										_this.set_ji_di('ji');
									}
								},
								error: function (){}
							});
							
						}else{
							this.show_msg(0,'鸡蛋不足，无法购买');
						}
					}
				}
			}else{
				if (window.confirm('是否花10只蛋买一块地?')) {
					if (this.j_data.dan >= 10) {
						ajax({
							url: "inface/buy_ji_di.txt",
							data: {
								"user_id": user_id,
								"buy_di": 1
							},
							type: "get",
							success: function (data){
								data = eval('('+data+')');
								if (!data.msg) {
									_this.j_data.dan -= 10;
									_this.j_data.di += 1;
									_this.show_msg(1,'你已永久拥有一块养鸡的地！');
									_this.set_ji_di('di');
								}
							},
							error: function (){}
						});
						
					}else{
						this.show_msg(0,'鸡蛋不足，无法购买');
					}
				}
			}
		},
		mai2: function (type){
			if (type == 1) {
				if (this.j_data.ji==20) {return}
				var cur = 0;
				for (var i = 0; i < this.tian.length; i++) {
					if (this.tian[i].ji.length<2) {
						cur = i;
						break;
					}
				}
				this.mai(this.tian[cur],true);
			}else if(type == 2){
				if (this.j_data.di==10) {return}
				var cur = 0;
				for (var i = 0; i < this.tian.length; i++) {
					if (this.tian[i].isOpen != 1) {
						cur = i;
						break;
					}
				}
				this.mai(this.tian[cur],true);
			}
		},
		cz: function(item){
			var _this = this;
			this.isMenuCz = item;
			if (item == 1) {
				var t2 = Math.floor(this.c_money/10) != Math.ceil(this.c_money/10);
				if(t2){
					this.show_msg(0,'请按10的倍数进行充值');
				}else if(this.c_money < 10){
					this.show_msg(0,'最少充值10元');
				}else if (window.confirm('充值'+this.c_money+'元？')) {
					ajax({
						url: "inface/put_cz.txt",
						data: {
							"user_id": user_id,
							"money": this.c_money
						},
						type: "get",
						success: function (data){
							data = eval('('+data+')');
							if (!data.msg) {
								_this.show_msg(1,'充值'+_this.c_money+'元成功');
								_this.j_data.dan += _this.c_money;
								setTimeout(function(){
									_this.show_msg(1,'您已获得'+_this.c_money+'只鸡蛋');
								},2000);
							}
						},
						error: function (){}
					});
				}
			}else if(item == 2){
				var t2 = Math.floor(this.c_money/10) != Math.ceil(this.c_money/10);

				if (this.j_data.dan < this.c_money) {
					this.show_msg(0,'鸡蛋不足'+this.c_money+'个,无法提现');
				}else if(this.c_money < 10){
					this.show_msg(0,'最少提现10个鸡蛋');
				}else if(t2){
					this.show_msg(0,'请按10个蛋的倍数进行提现');
				}else if (window.confirm('提现'+this.c_money+'个鸡蛋')) {
					ajax({
						url: "inface/put_tx.txt",
						data: {
							"user_id": user_id,
							"money": this.c_money
						},
						type: "get",
						success: function (data){
							data = eval('('+data+')');
							if (!data.msg) {
								_this.show_msg(1,'提现'+_this.c_money+'元成功，请等待客服处理');
								_this.j_data.dan -= _this.c_money;
								_this.j_data.all_money += _this.c_money;
							}
						},
						error: function (){}
					});
				}
			}
		}
	}
})