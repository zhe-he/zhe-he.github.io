webpackJsonp([1],{

/***/ 376:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_13_0_5_vue_loader_lib_template_compiler_index_id_data_v_9e3bfa14_hasScoped_true_node_modules_vue_loader_13_0_5_vue_loader_lib_selector_type_template_index_0_about_vue__ = __webpack_require__(383);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(381)
}
var normalizeComponent = __webpack_require__(21)
/* script */
var __vue_script__ = null
/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-9e3bfa14"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_13_0_5_vue_loader_lib_template_compiler_index_id_data_v_9e3bfa14_hasScoped_true_node_modules_vue_loader_13_0_5_vue_loader_lib_selector_type_template_index_0_about_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/views/about.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] about.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9e3bfa14", Component.options)
  } else {
    hotAPI.reload("data-v-9e3bfa14", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 381:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(382);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(375)("f0eeb92a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/_css-loader@0.28.7@css-loader/index.js!../../node_modules/_vue-loader@13.0.5@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9e3bfa14\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../node_modules/_vue-loader@13.0.5@vue-loader/lib/selector.js?type=styles&index=0!./about.vue", function() {
     var newContent = require("!!../../node_modules/_css-loader@0.28.7@css-loader/index.js!../../node_modules/_vue-loader@13.0.5@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-9e3bfa14\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../node_modules/_vue-loader@13.0.5@vue-loader/lib/selector.js?type=styles&index=0!./about.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 382:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(374)(undefined);
// imports


// module
exports.push([module.i, "\n.about[data-v-9e3bfa14] {\n  line-height: 22px;\n  margin: 20px;\n}\n.about h2[data-v-9e3bfa14] {\n    font-size: 22px;\n    font-family: cursive;\n    margin-bottom: 20px;\n    color: #f16b17;\n}\n.about p[data-v-9e3bfa14] {\n    margin-bottom: 15px;\n}\n.about ul[data-v-9e3bfa14] {\n    color: #333;\n}\na.blog_link[data-v-9e3bfa14] {\n  color: #0f9c7c;\n  margin: 0 20px;\n}\n", ""]);

// exports


/***/ }),

/***/ 383:
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
      _c("article", { staticClass: "main-l" }, [
        _c(
          "h2",
          { staticClass: "about_h" },
          [
            _vm._v("您现在的位置是："),
            _c("router-link", { attrs: { to: "/" } }, [_vm._v("首页")]),
            _vm._v("> "),
            _c("span", [_vm._v("关于我")])
          ],
          1
        ),
        _vm._v(" "),
        _vm._m(0)
      ]),
      _vm._v(" "),
      _c(
        "aside",
        { staticClass: "main-r" },
        [
          _c("common-introduce"),
          _vm._v(" "),
          _c("a", { attrs: { href: "mailto:hezhe@ihangmei.com" } }, [
            _vm._v("联系我")
          ])
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "clear" })
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "about" }, [
      _c("h2", [_vm._v("Just about me")]),
      _vm._v(" "),
      _c("ul", [_c("p", [_vm._v("个人介绍个人介绍个人介绍")])]),
      _vm._v(" "),
      _c("h2", [_vm._v("About my blog")]),
      _vm._v(" "),
      _c("ul", { staticClass: "blog_a" }, [
        _c("p", [
          _vm._v("域  名：www.hezhe.com 创建于2017年07月07日 "),
          _c(
            "a",
            {
              staticClass: "blog_link",
              attrs: { href: "http://www.net.cn/domain/", target: "_blank" }
            },
            [_vm._v("注册域名")]
          ),
          _c(
            "a",
            {
              staticClass: "blog_link",
              attrs: {
                href: "http://koubei.baidu.com/womc/s/www.hezhe.com",
                target: "_blank"
              }
            },
            [_vm._v("邀你点评")]
          )
        ]),
        _vm._v(" "),
        _c("p", [
          _vm._v("服务器：阿里云服务器"),
          _c(
            "a",
            {
              staticClass: "blog_link",
              attrs: {
                href:
                  "http://www.aliyun.com/product/ecs/?ali_trackid=2:mm_11085263_4976026_15602229:1389838528_3k2_34164590",
                target: "_blank"
              }
            },
            [_vm._v("购买空间")]
          ),
          _c(
            "a",
            {
              staticClass: "blog_link",
              attrs: { href: "javascript:;", target: "_blank" }
            },
            [_vm._v("参考我的空间配置")]
          )
        ]),
        _vm._v(" "),
        _c("p", [_vm._v("程  序：nodejs")]),
        _vm._v(" "),
        _c("p", [_vm._v("微信公众号：何哲")])
      ])
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-9e3bfa14", esExports)
  }
}

/***/ })

});