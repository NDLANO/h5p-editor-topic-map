/*! For license information please see components-ThemePicker-ThemePicker-stories.09c39123.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkh5p_editor_topic_map=self.webpackChunkh5p_editor_topic_map||[]).push([[372],{"./src/components/ThemePicker/ThemePicker.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var _Primary$parameters,_Primary$parameters2,_Primary$parameters2$,_ThemePicker__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/ThemePicker/ThemePicker.tsx"),_types_ColorTheme__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/types/ColorTheme.ts"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/jsx-runtime.js");function _typeof(obj){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}function _defineProperty(obj,key,value){return(key=function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!==_typeof(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==_typeof(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===_typeof(key)?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(arr,i){var _i=null==arr?null:"undefined"!=typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"];if(null!=_i){var _s,_e,_x,_r,_arr=[],_n=!0,_d=!1;try{if(_x=(_i=_i.call(arr)).next,0===i){if(Object(_i)!==_i)return;_n=!1}else for(;!(_n=(_s=_x.call(_i)).done)&&(_arr.push(_s.value),_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{if(!_n&&null!=_i.return&&(_r=_i.return(),Object(_r)!==_r))return}finally{if(_d)throw _e}}return _arr}}(arr,i)||function _unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}const __WEBPACK_DEFAULT_EXPORT__={title:"Atoms/ThemePicker",component:_ThemePicker__WEBPACK_IMPORTED_MODULE_1__.J,args:{setTheme:function setTheme(theme){var _Object$entries$find;return console.info("Set theme to ".concat(null===(_Object$entries$find=Object.entries(_types_ColorTheme__WEBPACK_IMPORTED_MODULE_2__.U).find((function(_ref){var value=_slicedToArray(_ref,2)[1];return theme===value})))||void 0===_Object$entries$find?void 0:_Object$entries$find[0]))},activeTheme:_types_ColorTheme__WEBPACK_IMPORTED_MODULE_2__.U.Red}};var Template=function Template(args){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_ThemePicker__WEBPACK_IMPORTED_MODULE_1__.J,_objectSpread({},args))};Template.displayName="Template";var Primary=Template.bind({});Primary.args={},Primary.parameters=_objectSpread(_objectSpread({},Primary.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Primary$parameters=Primary.parameters)||void 0===_Primary$parameters?void 0:_Primary$parameters.docs),{},{source:_objectSpread({originalSource:"args => <ThemePicker {...args} />"},null===(_Primary$parameters2=Primary.parameters)||void 0===_Primary$parameters2||null===(_Primary$parameters2$=_Primary$parameters2.docs)||void 0===_Primary$parameters2$?void 0:_Primary$parameters2$.source)})});var __namedExportsOrder=["Primary"]},"./src/H5P/H5P.util.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{t:()=>t});var h5p_utils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/h5p-utils/dist/h5p-utils.es.js"),t=function t(key,vars){return h5p_utils__WEBPACK_IMPORTED_MODULE_0__._t.t("H5PEditor.TopicMap",key,vars)}},"./src/components/ThemePicker/ThemePicker.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{J:()=>ThemePicker});var react=__webpack_require__("./node_modules/react/index.js"),H5P_util=__webpack_require__("./src/H5P/H5P.util.ts"),theme_utils=__webpack_require__("./src/utils/theme.utils.ts");const ThemePicker_module_buttons="ThemePicker-module__buttons--oPzza",ThemePicker_module_button="ThemePicker-module__button--Pw5XQ",ThemePicker_module_buttonActive="ThemePicker-module__buttonActive--AL9Py",ThemePicker_module_colorCircles="ThemePicker-module__colorCircles--S_ty8",ThemePicker_module_colorCircle="ThemePicker-module__colorCircle--OUuPi";var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),ThemePicker=function ThemePicker(_ref){var setTheme=_ref.setTheme,activeTheme=_ref.activeTheme,renderColorCircles=react.useCallback((function(){return Array.from({length:4}).map((function(_,index){return(0,jsx_runtime.jsx)("span",{className:ThemePicker_module_colorCircle,style:{backgroundColor:"var(--theme-color-".concat(index+1,")")}},index)}))}),[]),colorThemes=react.useMemo((function(){return theme_utils.n.map((function(_ref2){var labelKey=_ref2.labelKey,value=_ref2.value;return(0,jsx_runtime.jsxs)("button",{type:"button",className:"theme-".concat(value," ").concat(ThemePicker_module_button).concat(value===activeTheme?" ".concat(ThemePicker_module_buttonActive):""),onClick:function onClick(){return setTheme(value)},children:[(0,H5P_util.t)(labelKey),(0,jsx_runtime.jsx)("div",{className:ThemePicker_module_colorCircles,children:renderColorCircles()})]},value)}))}),[activeTheme,renderColorCircles,setTheme]),themePickerLabel=(0,H5P_util.t)("theme-picker_label");return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)("div",{className:"h5peditor-label",children:themePickerLabel}),(0,jsx_runtime.jsx)("div",{className:ThemePicker_module_buttons,children:colorThemes})]})};try{ThemePicker.displayName="ThemePicker",ThemePicker.__docgenInfo={description:"",displayName:"ThemePicker",props:{activeTheme:{defaultValue:null,description:"",name:"activeTheme",required:!0,type:{name:"enum",value:[{value:'"1"'},{value:'"2"'},{value:'"3"'},{value:'"4"'}]}},setTheme:{defaultValue:null,description:"",name:"setTheme",required:!0,type:{name:"(theme: ColorTheme) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/ThemePicker/ThemePicker.tsx#ThemePicker"]={docgenInfo:ThemePicker.__docgenInfo,name:"ThemePicker",path:"src/components/ThemePicker/ThemePicker.tsx#ThemePicker"})}catch(__react_docgen_typescript_loader_error){}},"./src/types/ColorTheme.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{U:()=>ColorTheme});var ColorTheme=function(ColorTheme){return ColorTheme.Blue="1",ColorTheme.Green="2",ColorTheme.Red="3",ColorTheme.Gray="4",ColorTheme}({})},"./src/utils/theme.utils.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{n:()=>themes,u:()=>defaultTheme});var _types_ColorTheme__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/types/ColorTheme.ts"),themes=Object.values(_types_ColorTheme__WEBPACK_IMPORTED_MODULE_0__.U).map((function(value){return{value,labelKey:"global_theme-".concat(value)}})),defaultTheme=_types_ColorTheme__WEBPACK_IMPORTED_MODULE_0__.U.Blue},"./node_modules/h5p-utils/dist/h5p-utils.es.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Jn:()=>m,_t:()=>c,gX:()=>i});Object.defineProperty;const i=window.H5P??{},c=window.H5PEditor??{},m=t=>t?t.startsWith("http://")||t.startsWith("https://")?t:(t=>i.getPath(t,c.contentId))(t):null;class h extends i.EventDispatcher{constructor(s,n,r){super(),o(this,"wrapper"),this.params=s,this.contentId=n,this.extras=r,this.wrapper=document.createElement("div")}}class H extends i.EventDispatcher{constructor(s,n,r,p){super(),o(this,"wrapper"),this.parent=s,this.field=n,this.params=r,this.setValue=p,this.wrapper=document.createElement("div")}}},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{var f=__webpack_require__("./node_modules/react/index.js"),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.Fragment=l,exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")}}]);