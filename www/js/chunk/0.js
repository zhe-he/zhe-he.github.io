webpackJsonp([0],{

/***/ 380:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_5_vue_loader_lib_selector_type_script_index_0_share_vue__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_5_vue_loader_lib_template_compiler_index_id_data_v_bb209370_hasScoped_true_node_modules_vue_loader_13_0_5_vue_loader_lib_selector_type_template_index_0_share_vue__ = __webpack_require__(391);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(388)
}
var normalizeComponent = __webpack_require__(21)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-bb209370"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_0_5_vue_loader_lib_selector_type_script_index_0_share_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_0_5_vue_loader_lib_template_compiler_index_id_data_v_bb209370_hasScoped_true_node_modules_vue_loader_13_0_5_vue_loader_lib_selector_type_template_index_0_share_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/views/share.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] share.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-bb209370", Component.options)
  } else {
    hotAPI.reload("data-v-bb209370", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 388:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(389);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(375)("df73e43e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/_css-loader@0.28.7@css-loader/index.js!../../node_modules/_vue-loader@13.0.5@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-bb209370\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../node_modules/_vue-loader@13.0.5@vue-loader/lib/selector.js?type=styles&index=0!./share.vue", function() {
     var newContent = require("!!../../node_modules/_css-loader@0.28.7@css-loader/index.js!../../node_modules/_vue-loader@13.0.5@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-bb209370\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../node_modules/_vue-loader@13.0.5@vue-loader/lib/selector.js?type=styles&index=0!./share.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 389:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(374)(undefined);
// imports


// module
exports.push([module.i, "\n.template[data-v-bb209370] {\n  margin: 0 10px 0 10px;\n}\n.template h3[data-v-bb209370] {\n    border-bottom: #333 2px solid;\n    width: 100%;\n    overflow: hidden;\n    font-size: 14px;\n    display: block;\n    clear: both;\n    margin-bottom: 10px;\n    position: relative;\n}\n.template h3 p[data-v-bb209370] {\n      background-color: #474645;\n      width: 180px;\n      height: 25px;\n      line-height: 25px;\n      color: #fff;\n      text-align: center;\n      -webkit-box-shadow: #999 4px 5px 1px;\n              box-shadow: #999 4px 5px 1px;\n}\n.template h3 p span[data-v-bb209370] {\n        color: #38b3d4;\n}\n.template ul li[data-v-bb209370] {\n    margin: 3px;\n    float: left;\n    display: block;\n    padding: 5px 5px 6px 5px;\n    -webkit-transition: all 1s;\n    transition: all 1s;\n}\n.template ul li img[data-v-bb209370] {\n      width: 140px;\n      height: 80px;\n      background: #FFF;\n      padding: 4px;\n      -webkit-box-shadow: 0px 0px 2px rgba(0, 0, 0, .5);\n              box-shadow: 0px 0px 2px rgba(0, 0, 0, .5);\n      display: block;\n}\n.template ul li span[data-v-bb209370] {\n      color: #fff;\n      display: block;\n      text-align: center;\n      margin-top: 5px;\n      width: 142px;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      height: 14px;\n}\n.template ul li[data-v-bb209370]:hover {\n      background-color: #666666;\n      padding: 5px 5px 6px 5px;\n}\n.more[data-v-bb209370] {\n  position: absolute;\n  right: 0;\n  top: 4px;\n  color: #666666;\n  font-size: 12px;\n}\n", ""]);

// exports


/***/ }),

/***/ 390:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var shareDate = __webpack_require__(412);
/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            share: shareDate.data
        };
    },
    mounted: function mounted() {}
});

/***/ }),

/***/ 391:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "ibody" },
    [
      _c("common-nav"),
      _vm._v(" "),
      _c(
        "article",
        { staticClass: "main-l" },
        [
          _c(
            "h2",
            { staticClass: "about_h" },
            [
              _vm._v("您现在的位置是："),
              _c("router-link", { attrs: { to: "/" } }, [_vm._v("首页")]),
              _vm._v("> "),
              _c("span", [_vm._v("程序人生")])
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "template" },
            _vm._l(_vm.share, function(item, index) {
              return _c("div", { key: index }, [
                _c(
                  "h3",
                  [
                    _c("p", [
                      _c("span", [_vm._v(_vm._s(item.title))]),
                      _vm._v("分享")
                    ]),
                    _vm._v(" "),
                    _c(
                      "router-link",
                      { staticClass: "more", attrs: { to: "/" } },
                      [_vm._v("更多>>")]
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "ul",
                  _vm._l(item.content, function(item2) {
                    return _c("li", [
                      _c("a", { attrs: { href: item2.url } }, [
                        _c("img", { attrs: { src: item2.imgSrc } })
                      ]),
                      _vm._v(" "),
                      _c("span", [_vm._v(_vm._s(item2.title))])
                    ])
                  })
                )
              ])
            })
          ),
          _vm._v(" "),
          _c("common-page")
        ],
        1
      ),
      _vm._v(" "),
      _c("common-aside"),
      _vm._v(" "),
      _c("div", { staticClass: "clear" })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-bb209370", esExports)
  }
}

/***/ }),

/***/ 412:
/***/ (function(module, exports) {

module.exports = {"version":"v1.0.0","data":[{"title":"js效果","content":[{"title":"3D旋转效果展示","url":"/2015/demo/3D_rotation/","imgSrc":"images/tmp/3D_rotation.jpg"},{"title":"寻路算法","url":"/2015/demo/algorithm/findWay/","imgSrc":"images/tmp/findWay.jpg"},{"title":"七皇后算法","url":"/2015/demo/algorithm/sevenQueen/","imgSrc":"images/tmp/sevenQueen.jpg"},{"title":"螺旋矩阵算法","url":"/2015/demo/algorithm/spiralMatrix/","imgSrc":"images/tmp/spiralMatrix.jpg"},{"title":"仿苹果桌面","url":"/2015/demo/apple_desktop/","imgSrc":"images/tmp/apple_desktop.jpg"},{"title":"仿苹果菜单","url":"/2015/demo/apple_menu/","imgSrc":"images/tmp/apple_menu.jpg"}]}]}

/***/ })

});