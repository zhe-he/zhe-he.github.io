webpackJsonp([2],{

/***/ 377:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_13_0_5_vue_loader_lib_template_compiler_index_id_data_v_72c0306e_hasScoped_true_node_modules_vue_loader_13_0_5_vue_loader_lib_selector_type_template_index_0_new_vue__ = __webpack_require__(386);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(384)
}
var normalizeComponent = __webpack_require__(21)
/* script */
var __vue_script__ = null
/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-72c0306e"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_13_0_5_vue_loader_lib_template_compiler_index_id_data_v_72c0306e_hasScoped_true_node_modules_vue_loader_13_0_5_vue_loader_lib_selector_type_template_index_0_new_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/views/new.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] new.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-72c0306e", Component.options)
  } else {
    hotAPI.reload("data-v-72c0306e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 384:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(385);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(375)("1e4fb7bd", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/_css-loader@0.28.7@css-loader/index.js!../../node_modules/_vue-loader@13.0.5@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-72c0306e\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../node_modules/_vue-loader@13.0.5@vue-loader/lib/selector.js?type=styles&index=0!./new.vue", function() {
     var newContent = require("!!../../node_modules/_css-loader@0.28.7@css-loader/index.js!../../node_modules/_vue-loader@13.0.5@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-72c0306e\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/_sass-loader@6.0.6@sass-loader/lib/loader.js!../../node_modules/_vue-loader@13.0.5@vue-loader/lib/selector.js?type=styles&index=0!./new.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 385:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(374)(undefined);
// imports


// module
exports.push([module.i, "\n.index_about[data-v-72c0306e] {\n  margin: 20px;\n}\n.c_titile[data-v-72c0306e] {\n  font-size: 22px;\n  margin: 20px 0;\n  text-align: center;\n}\n.box_c[data-v-72c0306e] {\n  color: #999;\n  text-align: center;\n}\n.box_c span[data-v-72c0306e] {\n    margin: 0 10px;\n}\n.box_c span a[data-v-72c0306e] {\n      color: #099;\n}\n.infos[data-v-72c0306e] {\n  overflow: hidden;\n  margin: 20px 0;\n  line-height: 28px;\n  font-size: 14px;\n  text-indent: 2em;\n  color: #525554;\n}\n.infos p[data-v-72c0306e] {\n    margin-bottom: 10px;\n}\n.infos p img[data-v-72c0306e] {\n      display: block;\n      margin: auto;\n}\n.nextinfo[data-v-72c0306e] {\n  line-height: 24px;\n}\n.nextinfo a[data-v-72c0306e], .otherlink li a[data-v-72c0306e] {\n  color: #756f71;\n}\n.nextinfo a[data-v-72c0306e]:hover, .otherlink li a[data-v-72c0306e]:hover {\n    text-decoration: underline;\n}\n.otherlink h2[data-v-72c0306e] {\n  border-bottom: #099 2px solid;\n  line-height: 40px;\n  font-size: 12px;\n  background: url(" + __webpack_require__(378) + ") 10px center no-repeat;\n  padding-left: 40px;\n  color: #099;\n}\n.otherlink ul[data-v-72c0306e] {\n  margin: 10px 0;\n}\n.otherlink li[data-v-72c0306e] {\n  line-height: 24px;\n  height: 24px;\n  display: block;\n  width: 290px;\n  float: left;\n  overflow: hidden;\n  margin-right: 30px;\n}\n", ""]);

// exports


/***/ }),

/***/ 386:
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
            _vm._v(">"),
            _c("router-link", { attrs: { to: "/newlist" } }, [_vm._v("慢生活")]),
            _vm._v("> "),
            _c("span", [_vm._v("xxx")])
          ],
          1
        ),
        _vm._v(" "),
        _c("div", { staticClass: "index_about" }, [
          _c("h2", { staticClass: "c_titile" }, [_vm._v("标题")]),
          _vm._v(" "),
          _vm._m(0),
          _vm._v(" "),
          _vm._m(1),
          _vm._v(" "),
          _vm._m(2),
          _vm._v(" "),
          _c("div", { staticClass: "nextinfo" }, [
            _c(
              "p",
              [
                _vm._v("上一篇："),
                _c("router-link", { attrs: { to: "/" } }, [_vm._v("xxx")])
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "p",
              [
                _vm._v("下一篇："),
                _c("router-link", { attrs: { to: "/" } }, [_vm._v("xxx")])
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "otherlink" }, [
            _c("h2", [_vm._v("相关文章")]),
            _vm._v(" "),
            _c(
              "ul",
              _vm._l(6, function(i) {
                return _c(
                  "li",
                  { key: i },
                  [
                    _c(
                      "router-link",
                      { attrs: { to: "/", title: "现在，我相信爱情！" } },
                      [_vm._v("现在，我相信爱情！")]
                    )
                  ],
                  1
                )
              })
            )
          ])
        ])
      ]),
      _vm._v(" "),
      _c("common-aside"),
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
    return _c("p", { staticClass: "box_c" }, [
      _c("span", { staticClass: "d_time" }, [_vm._v("发布时间：yyyy-mm-dd")]),
      _c("span", [_vm._v("编辑：xxx")]),
      _c("span", [_vm._v("浏览（390）")]),
      _c("span", [_vm._v("评论览（14）")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("ul", { staticClass: "infos" }, [
      _c("p", [
        _vm._v("文字文字文字文字："),
        _c("img", { attrs: { src: "images/tmp/color.jpg", alt: "主色调" } })
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "keybq" }, [
      _c("p", [_c("span", [_vm._v("关键字词")]), _vm._v("：黑色,个人博客,时间轴,响应式")])
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-72c0306e", esExports)
  }
}

/***/ })

});