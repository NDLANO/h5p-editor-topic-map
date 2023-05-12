"use strict";(self.webpackChunkh5p_editor_topic_map=self.webpackChunkh5p_editor_topic_map||[]).push([[275],{"./src/components/Draggable/Draggable.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Primary:()=>Primary,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./node_modules/react/index.js");var _Primary$parameters,_Primary$parameters2,_Primary$parameters2$,_Draggable__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/components/Draggable/Draggable.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");function _typeof(obj){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}function _defineProperty(obj,key,value){return(key=function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!==_typeof(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==_typeof(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===_typeof(key)?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}const __WEBPACK_DEFAULT_EXPORT__={title:"Molecules/Draggable",component:_Draggable__WEBPACK_IMPORTED_MODULE_1__._,args:{updatePosition:function updatePosition(newPos){return console.info("New position",newPos)},initialXPosition:200,initialYPosition:200,height:100,width:100,gapSize:10,cellSize:10,gridSize:{width:200,height:100},initialHeight:45,initialWidth:95,id:"1",occupiedCells:[],backgroundImage:"https://images.unsplash.com/photo-1518701005037-d53b1f67bb1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1326&q=80",editItem:function editItem(id){return console.info("Edit item",id)},deleteItem:function deleteItem(id){return console.info("Delete item",id)}}};var Template=function Template(args){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_Draggable__WEBPACK_IMPORTED_MODULE_1__._,_objectSpread({},args))};Template.displayName="Template";var Primary=Template.bind({});Primary.args={},Primary.parameters=_objectSpread(_objectSpread({},Primary.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Primary$parameters=Primary.parameters)||void 0===_Primary$parameters?void 0:_Primary$parameters.docs),{},{source:_objectSpread({originalSource:"args => <Draggable {...args} />"},null===(_Primary$parameters2=Primary.parameters)||void 0===_Primary$parameters2||null===(_Primary$parameters2$=_Primary$parameters2.docs)||void 0===_Primary$parameters2$?void 0:_Primary$parameters2$.source)})});var __namedExportsOrder=["Primary"]},"./src/utils/grid.utils.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{kl:()=>calculatePosition,uk:()=>checkIfRightSideOfGrid,i6:()=>createArrowItem,zj:()=>createTopicMapItem,Z2:()=>findConnectedArrows,y8:()=>findHeightPercentage,i$:()=>findItem,uf:()=>findOccupiedCells,Ow:()=>findWidthPercentage,FS:()=>gridToPercentage,A0:()=>isDraggingLeft,bP:()=>isDraggingUp,o2:()=>mapTopicMapItemToElement,gY:()=>minimumSizeReached,vN:()=>positionIsFree,Ot:()=>resizeItems,U8:()=>scaleItemLength,$G:()=>updateItem});var lodash_intersectionby=__webpack_require__("./node_modules/lodash.intersectionby/index.js"),lodash_intersectionby_default=__webpack_require__.n(lodash_intersectionby);function _typeof(obj){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}function _toConsumableArray(arr){return function _arrayWithoutHoles(arr){if(Array.isArray(arr))return grid_utils_arrayLikeToArray(arr)}(arr)||function _iterableToArray(iter){if("undefined"!=typeof Symbol&&null!=iter[Symbol.iterator]||null!=iter["@@iterator"])return Array.from(iter)}(arr)||grid_utils_unsupportedIterableToArray(arr)||function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function grid_utils_unsupportedIterableToArray(o,minLen){if(o){if("string"==typeof o)return grid_utils_arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);return"Object"===n&&o.constructor&&(n=o.constructor.name),"Map"===n||"Set"===n?Array.from(o):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?grid_utils_arrayLikeToArray(o,minLen):void 0}}function grid_utils_arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}function _defineProperty(obj,key,value){return(key=function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!==_typeof(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==_typeof(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===_typeof(key)?key:String(key)}(key))in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}var resizeItems=function resizeItems(items,scaleFactor){return items.map((function(item){return function resizeItem(item,scaleFactor){return _objectSpread(_objectSpread({},item),{},{heightPercentage:item.heightPercentage*scaleFactor,widthPercentage:item.widthPercentage*scaleFactor,xPercentagePosition:item.xPercentagePosition*scaleFactor,yPercentagePosition:item.yPercentagePosition*scaleFactor})}(item,scaleFactor)}))},calculateXPercentage=function calculateXPercentage(xPx,width){return xPx/width*100},calculateYPercentage=function calculateYPercentage(yPx,height){return yPx/height*100},updateItem=function updateItem(items,updatedItem,width,height,_ref){var newPosition=_ref.newPosition,newSize=_ref.newSize;return items.map((function(item){if(!(item.id===updatedItem.id))return item;var newItem=_objectSpread({},item);return newPosition&&(newItem.xPercentagePosition=calculateXPercentage(newPosition.x,width),newItem.yPercentagePosition=calculateYPercentage(newPosition.y,height)),newSize&&(newItem.widthPercentage=calculateXPercentage(newSize.width,width),newItem.heightPercentage=calculateYPercentage(newSize.height,height)),newItem}))},findCellsElementOccupies=function findCellsElementOccupies(_ref2,gridWidth,gridHeight,gapSize,cellSize){var id=_ref2.id,type=_ref2.type,position=_ref2.position,size=_ref2.size,allCells=function getAllCells(gridWidth,gridHeight,gapSize,cellSize){for(var cells=[],stepSize=gapSize+cellSize,currentIndex=0,y=0;y<gridHeight;y+=stepSize)for(var x=0;x<gridWidth;x+=stepSize)cells.push({x,y,index:currentIndex}),currentIndex+=1;return cells}(gridWidth,gridHeight,gapSize,cellSize);return allCells.filter((function(cell){return function cellIsOccupiedByElement(elementPosition,elementSize,cellPosition){return cellPosition.x>=elementPosition.x-5&&cellPosition.x<=elementPosition.x+elementSize.width&&cellPosition.y>=elementPosition.y-5&&cellPosition.y<=elementPosition.y+elementSize.height}(position,size,cell)})).map((function(_ref3){var x=_ref3.x,y=_ref3.y,index=_ref3.index;return{occupiedById:id,occupiedByType:type,x,y,index}}))},findOccupiedCells=function findOccupiedCells(elements,gridWidth,gridHeight,gapSize,cellSize){var _step,occupiedCells=[],_iterator=function grid_utils_createForOfIteratorHelper(o,allowArrayLike){var it="undefined"!=typeof Symbol&&o[Symbol.iterator]||o["@@iterator"];if(!it){if(Array.isArray(o)||(it=grid_utils_unsupportedIterableToArray(o))||allowArrayLike&&o&&"number"==typeof o.length){it&&(o=it);var i=0,F=function F(){};return{s:F,n:function n(){return i>=o.length?{done:!0}:{done:!1,value:o[i++]}},e:function e(_e){throw _e},f:F}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var err,normalCompletion=!0,didErr=!1;return{s:function s(){it=it.call(o)},n:function n(){var step=it.next();return normalCompletion=step.done,step},e:function e(_e2){didErr=!0,err=_e2},f:function f(){try{normalCompletion||null==it.return||it.return()}finally{if(didErr)throw err}}}}(elements);try{for(_iterator.s();!(_step=_iterator.n()).done;){var element=_step.value;occupiedCells.push.apply(occupiedCells,_toConsumableArray(findCellsElementOccupies(element,gridWidth,gridHeight,gapSize,cellSize)))}}catch(err){_iterator.e(err)}finally{_iterator.f()}return occupiedCells},scaleItemLength=function scaleItemLength(percentage,length,cellSize){var newL=length*percentage/100;return newL>cellSize?newL:cellSize},calculatePosition=function calculatePosition(percentage,length){return length*percentage/100},minimumSizeReached=function minimumSizeReached(xPercentage,gridWidth,yPercentage,gridHeight){return gridWidth*xPercentage/100<0||gridHeight*yPercentage/100<0},mapTopicMapItemToElement=function mapTopicMapItemToElement(item,gridSize,cellSize){return{id:item.id,type:"item",position:{x:calculatePosition(item.xPercentagePosition,gridSize.width),y:calculatePosition(item.yPercentagePosition,gridSize.height)},size:{width:scaleItemLength(item.widthPercentage,gridSize.width,cellSize),height:scaleItemLength(item.heightPercentage,gridSize.height,cellSize)}}},positionIsFree=function positionIsFree(newPosition,elementId,elementSize,gridSize,gapSize,cellSize,occupiedCells){var cellsThisElementWillOccupy=findCellsElementOccupies({id:elementId,type:"item",position:newPosition,size:elementSize},gridSize.width,gridSize.height,gapSize,cellSize);return!function arraysHaveSomeOverlap(arr1,arr2){return lodash_intersectionby_default()(arr1,arr2,"index").length>0}(occupiedCells.filter((function(cell){return cell.occupiedById!==elementId})),cellsThisElementWillOccupy)},isDraggingLeft=function isDraggingLeft(indicatorIndex,boxStartPosition,numberOfColumns){return boxStartPosition%numberOfColumns>=indicatorIndex%numberOfColumns},isDraggingUp=function isDraggingUp(indicatorIndex,boxStartPosition,numberOfColumns,numberOfRows){return Math.floor(boxStartPosition/numberOfColumns)/numberOfRows*100>=Math.floor(indicatorIndex/numberOfColumns)/numberOfRows*100},findWidthPercentage=function findWidthPercentage(onlyScaleVertically,leftHandle,dragLeft,existingItem,xPercentagePosition,xEndPercentagePosition){return onlyScaleVertically?existingItem.widthPercentage:leftHandle&&!dragLeft?existingItem.widthPercentage-(xPercentagePosition-existingItem.xPercentagePosition):leftHandle&&dragLeft?existingItem.widthPercentage+(existingItem.xPercentagePosition-xPercentagePosition):xEndPercentagePosition-xPercentagePosition},findHeightPercentage=function findHeightPercentage(onlyScaleHorizontally,topHandle,dragUp,existingItem,yPercentagePosition,yEndPercentagePosition){return onlyScaleHorizontally?existingItem.heightPercentage:topHandle&&dragUp?existingItem.heightPercentage+(existingItem.yPercentagePosition-yPercentagePosition):topHandle&&!dragUp?existingItem.heightPercentage-(yPercentagePosition-existingItem.yPercentagePosition):yEndPercentagePosition-yPercentagePosition},createTopicMapItem=function createTopicMapItem(){return{id:crypto.randomUUID(),xPercentagePosition:0,yPercentagePosition:0,widthPercentage:0,heightPercentage:0,topicImage:void 0,label:"",description:""}},createArrowItem=function createArrowItem(startId,endId,label,arrowType,startPosition,endPosition,startGridPosition,endGridPosition,breakpoints,relativeBreakpoints){return{id:crypto.randomUUID(),label,arrowType,description:"",startElementId:startId,endElementId:endId,startPosition,endPosition,startGridPosition,endGridPosition,breakpoints,relativeBreakpoints}},findItem=function findItem(id,items){var _items$find;return id&&null!==(_items$find=items.find((function(item){return item.id===id})))&&void 0!==_items$find?_items$find:null},checkIfRightSideOfGrid=function checkIfRightSideOfGrid(xPosition,gridWidth){return xPosition>gridWidth/2},findConnectedArrows=function findConnectedArrows(itemId,arrows){return arrows.filter((function(arrow){return[arrow.startElementId,arrow.endElementId].includes(itemId)}))},gridToPercentage=function gridToPercentage(gridPosition,numberOfColumns,numberOfRows){return{x:gridPosition.x/numberOfColumns*100,y:gridPosition.y/numberOfRows*100}}}}]);