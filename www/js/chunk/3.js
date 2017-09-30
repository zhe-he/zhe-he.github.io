webpackJsonp([3],{

/***/ 379:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_13_0_5_vue_loader_lib_template_compiler_index_id_data_v_d085ce32_hasScoped_false_node_modules_vue_loader_13_0_5_vue_loader_lib_selector_type_template_index_0_newlist_vue__ = __webpack_require__(387);
var disposed = false
var normalizeComponent = __webpack_require__(21)
/* script */
var __vue_script__ = null
/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_13_0_5_vue_loader_lib_template_compiler_index_id_data_v_d085ce32_hasScoped_false_node_modules_vue_loader_13_0_5_vue_loader_lib_selector_type_template_index_0_newlist_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/views/newlist.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] newlist.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d085ce32", Component.options)
  } else {
    hotAPI.reload("data-v-d085ce32", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 387:
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
              _c("span", [_vm._v("慢生活")])
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "bloglist" },
            _vm._l(10, function(i) {
              return _c("div", { key: i, staticClass: "newblog" }, [
                _c("ul", [
                  _c(
                    "h3",
                    [
                      _c("router-link", { attrs: { to: "/" } }, [
                        _vm._v("个人博客从简不繁")
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "autor autor2" }, [
                    _c("span", [_vm._v("作者：xx")]),
                    _c(
                      "span",
                      [
                        _vm._v("分类：["),
                        _c("router-link", { attrs: { to: "/" } }, [
                          _vm._v("日记")
                        ]),
                        _vm._v("]")
                      ],
                      1
                    ),
                    _c(
                      "span",
                      [
                        _vm._v("浏览（"),
                        _c("router-link", { attrs: { to: "/" } }, [
                          _vm._v("459")
                        ]),
                        _vm._v("）")
                      ],
                      1
                    ),
                    _c(
                      "span",
                      [
                        _vm._v("评论（"),
                        _c("router-link", { attrs: { to: "/" } }, [
                          _vm._v("30")
                        ]),
                        _vm._v("）")
                      ],
                      1
                    )
                  ]),
                  _vm._v(" "),
                  _c(
                    "p",
                    [
                      _vm._v(
                        "十一月中旬开始，排名突然下降了，网站“个人博客”关键词排名从第一页第二名滑落到100页以后了，个人博客这个关键词百度已经搜不到了，仅有google、搜狗... "
                      ),
                      _c(
                        "router-link",
                        { staticClass: "readmore", attrs: { to: "/" } },
                        [_vm._v("全文")]
                      )
                    ],
                    1
                  )
                ]),
                _vm._v(" "),
                _vm._m(0, true),
                _vm._v(" "),
                _c("div", { staticClass: "dateview" }, [_vm._v("yyyy-mm-dd")])
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
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("figure", [_c("img", { attrs: { src: "images/tmp/001.jpg" } })])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-d085ce32", esExports)
  }
}

/***/ })

});