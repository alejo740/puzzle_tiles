(function () { "use strict";
var $hxClasses = {},$estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,matchedPos: function() {
		if(this.r.m == null) throw "No string matched";
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,matched: function(n) {
		return this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
			var $r;
			throw "EReg::matched";
			return $r;
		}(this));
	}
	,match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,__class__: EReg
}
var HxOverrides = function() { }
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d < 10?"0" + d:"" + d) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
}
HxOverrides.strDate = function(s) {
	switch(s.length) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k = s.split("-");
		return new Date(k[0],k[1] - 1,k[2],0,0,0);
	case 19:
		var k = s.split(" ");
		var y = k[0].split("-");
		var t = k[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw "Invalid date format : " + s;
	}
}
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
}
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
}
HxOverrides.remove = function(a,obj) {
	var i = 0;
	var l = a.length;
	while(i < l) {
		if(a[i] == obj) {
			a.splice(i,1);
			return true;
		}
		i++;
	}
	return false;
}
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var Lambda = function() { }
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	var a = new Array();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
}
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = $iterator(it)();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = $iterator(it)();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
}
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,__class__: List
}
var Main = function() { }
$hxClasses["Main"] = Main;
Main.__name__ = ["Main"];
Main.onLoadConfigAssets = function(pack) {
	globals.NDiGameGlobals.getInstance().initGlobalConfigData();
	managers.NDiLocalizationManager.getInstance().initLocalizationData();
	managers.NDiResourcesManager.getInstance().loadAssetPack(globals.NDiGameConstants.ASSET_PACKAGE_LOADING,null,Main.onLoadInitialAssets);
}
Main.onLoadInitialAssets = function(pack) {
	managers.NDiSceneManager.getInstance().changeScene(globals.NDiTypeScene.NDI_TYPE_SCENE_MAINMENU);
}
Main.main = function() {
	flambe.System.init();
	util.NDiSaveData.initInstance();
	globals.NDiGameGlobals.initInstance();
	managers.NDiSceneManager.initInstance();
	managers.NDiResourcesManager.initInstance();
	managers.NDiAudioManager.initInstance();
	managers.NDiLocalizationManager.initInstance();
	managers.NDiResourcesManager.getInstance().loadAssetPack(globals.NDiGameConstants.ASSET_PACKAGE_CONFIG,null,Main.onLoadConfigAssets);
}
var IMap = function() { }
$hxClasses["IMap"] = IMap;
IMap.__name__ = ["IMap"];
var Reflect = function() { }
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
}
Reflect.compare = function(a,b) {
	return a == b?0:a > b?1:-1;
}
Reflect.isEnumValue = function(v) {
	return v != null && v.__enum__ != null;
}
Reflect.deleteField = function(o,field) {
	if(!Reflect.hasField(o,field)) return false;
	delete(o[field]);
	return true;
}
var Std = function() { }
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	addSub: function(s,pos,len) {
		this.b += len == null?HxOverrides.substr(s,pos,null):HxOverrides.substr(s,pos,len);
	}
	,__class__: StringBuf
}
var StringTools = function() { }
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
}
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
}
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
}
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
}
var ValueType = $hxClasses["ValueType"] = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] }
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { }
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	return o.__class__;
}
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
}
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
}
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
}
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
}
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
}
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
}
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
}
Type.allEnums = function(e) {
	var all = [];
	var cst = e.__constructs__;
	var _g = 0;
	while(_g < cst.length) {
		var c = cst[_g];
		++_g;
		var v = Reflect.field(e,c);
		if(!Reflect.isFunction(v)) all.push(v);
	}
	return all;
}
var XmlType = $hxClasses["XmlType"] = { __ename__ : ["XmlType"], __constructs__ : [] }
var Xml = function() {
};
$hxClasses["Xml"] = Xml;
Xml.__name__ = ["Xml"];
Xml.parse = function(str) {
	return haxe.xml.Parser.parse(str);
}
Xml.createElement = function(name) {
	var r = new Xml();
	r.nodeType = Xml.Element;
	r._children = new Array();
	r._attributes = new haxe.ds.StringMap();
	r.set_nodeName(name);
	return r;
}
Xml.createPCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.PCData;
	r.set_nodeValue(data);
	return r;
}
Xml.createCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.CData;
	r.set_nodeValue(data);
	return r;
}
Xml.createComment = function(data) {
	var r = new Xml();
	r.nodeType = Xml.Comment;
	r.set_nodeValue(data);
	return r;
}
Xml.createDocType = function(data) {
	var r = new Xml();
	r.nodeType = Xml.DocType;
	r.set_nodeValue(data);
	return r;
}
Xml.createProcessingInstruction = function(data) {
	var r = new Xml();
	r.nodeType = Xml.ProcessingInstruction;
	r.set_nodeValue(data);
	return r;
}
Xml.createDocument = function() {
	var r = new Xml();
	r.nodeType = Xml.Document;
	r._children = new Array();
	return r;
}
Xml.prototype = {
	addChild: function(x) {
		if(this._children == null) throw "bad nodetype";
		if(x._parent != null) HxOverrides.remove(x._parent._children,x);
		x._parent = this;
		this._children.push(x);
	}
	,firstElement: function() {
		if(this._children == null) throw "bad nodetype";
		var cur = 0;
		var l = this._children.length;
		while(cur < l) {
			var n = this._children[cur];
			if(n.nodeType == Xml.Element) return n;
			cur++;
		}
		return null;
	}
	,elementsNamed: function(name) {
		if(this._children == null) throw "bad nodetype";
		return { cur : 0, x : this._children, hasNext : function() {
			var k = this.cur;
			var l = this.x.length;
			while(k < l) {
				var n = this.x[k];
				if(n.nodeType == Xml.Element && n._nodeName == name) break;
				k++;
			}
			this.cur = k;
			return k < l;
		}, next : function() {
			var k = this.cur;
			var l = this.x.length;
			while(k < l) {
				var n = this.x[k];
				k++;
				if(n.nodeType == Xml.Element && n._nodeName == name) {
					this.cur = k;
					return n;
				}
			}
			return null;
		}};
	}
	,iterator: function() {
		if(this._children == null) throw "bad nodetype";
		return { cur : 0, x : this._children, hasNext : function() {
			return this.cur < this.x.length;
		}, next : function() {
			return this.x[this.cur++];
		}};
	}
	,exists: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.exists(att);
	}
	,set: function(att,value) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		this._attributes.set(att,value);
	}
	,get: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.get(att);
	}
	,set_nodeValue: function(v) {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue = v;
	}
	,get_nodeValue: function() {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue;
	}
	,set_nodeName: function(n) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName = n;
	}
	,get_nodeName: function() {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName;
	}
	,__class__: Xml
}
var data = {}
data.NDiCreditData = function() {
};
$hxClasses["data.NDiCreditData"] = data.NDiCreditData;
data.NDiCreditData.__name__ = ["data","NDiCreditData"];
data.NDiCreditData.prototype = {
	__class__: data.NDiCreditData
}
data.NDiLocalizationData = function() {
	this.id = "";
	this.fontScale = 0;
	this.offsetX = 0;
	this.offsetY = 0;
	this.fontName = "";
	this.description = "";
	this.content = "";
};
$hxClasses["data.NDiLocalizationData"] = data.NDiLocalizationData;
data.NDiLocalizationData.__name__ = ["data","NDiLocalizationData"];
data.NDiLocalizationData.prototype = {
	__class__: data.NDiLocalizationData
}
var factories = {}
factories.NDiEnemyFactory = function() { }
$hxClasses["factories.NDiEnemyFactory"] = factories.NDiEnemyFactory;
factories.NDiEnemyFactory.__name__ = ["factories","NDiEnemyFactory"];
factories.NDiEnemyFactory.createEnemy = function(valueIndex) {
	var typeEnemy = globals.NDiGameConstants.ARRAY_ENUM_TYPE_ENEMIES[valueIndex + 1];
	var newEnemy = null;
	if(typeEnemy == globals.NDiTypeEnemy.NDI_TYPE_ENEMY_MOUSER) newEnemy = new game_objects.enemies.NDiMouserEnemy(valueIndex); else if(typeEnemy == globals.NDiTypeEnemy.NDI_TYPE_ENEMY_FOOTBOT) newEnemy = new game_objects.enemies.NDiFootBotEnemy(valueIndex); else if(typeEnemy == globals.NDiTypeEnemy.NDI_TYPE_ENEMY_KRANG) newEnemy = new game_objects.enemies.NDiKrangEnemy(valueIndex); else if(typeEnemy == globals.NDiTypeEnemy.NDI_TYPE_ENEMY_RAHZAR) newEnemy = new game_objects.enemies.NDiDogPoundEnemy(valueIndex); else if(typeEnemy == globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SNAKEWEED) newEnemy = new game_objects.enemies.NDiSnakeWeedEnemy(valueIndex); else if(typeEnemy == globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SPIDERBYTEZ) newEnemy = new game_objects.enemies.NDiSpiderBytezEnemy(valueIndex); else if(typeEnemy == globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SHREDDER) newEnemy = new game_objects.enemies.NDiShredderEnemy(valueIndex);
	return newEnemy;
}
factories.NDiSceneFactory = function() { }
$hxClasses["factories.NDiSceneFactory"] = factories.NDiSceneFactory;
factories.NDiSceneFactory.__name__ = ["factories","NDiSceneFactory"];
factories.NDiSceneFactory.createScene = function(sceneType) {
	var newScene = null;
	if(sceneType == globals.NDiTypeScene.NDI_TYPE_SCENE_TEST) newScene = new scenes.NDiTestScene(); else if(sceneType == globals.NDiTypeScene.NDI_TYPE_SCENE_MAINMENU) newScene = new scenes.NDiMainMenuScene(); else if(sceneType == globals.NDiTypeScene.NDI_TYPE_SCENE_GAMEPLAY) newScene = new scenes.NDiGamePlayScene(); else if(sceneType == globals.NDiTypeScene.NDI_TYPE_SCENE_SPLASH_NDI) newScene = new scenes.NDiSplashNDiScene(); else if(sceneType == globals.NDiTypeScene.NDI_TYPE_SCENE_SPLASH_NICKELODEON) newScene = new scenes.NDiSplashNickelodeonScene(); else if(sceneType == globals.NDiTypeScene.NDI_TYPE_SCENE_CREDITS) newScene = new scenes.NDiCreditsScene(); else if(sceneType == globals.NDiTypeScene.NDI_TYPE_SCENE_INTRO) newScene = new scenes.NDiIntroScene(); else if(sceneType == globals.NDiTypeScene.NDI_TYPE_SCENE_TUTORIAL) newScene = new scenes.NDiTutorialScene();
	return newScene;
}
var flambe = {}
flambe.util = {}
flambe.util.Disposable = function() { }
$hxClasses["flambe.util.Disposable"] = flambe.util.Disposable;
flambe.util.Disposable.__name__ = ["flambe","util","Disposable"];
flambe.util.Disposable.prototype = {
	__class__: flambe.util.Disposable
}
flambe.Component = function() { }
$hxClasses["flambe.Component"] = flambe.Component;
flambe.Component.__name__ = ["flambe","Component"];
flambe.Component.__interfaces__ = [flambe.util.Disposable];
flambe.Component.prototype = {
	init: function(owner,next) {
		this.owner = owner;
		this.next = next;
	}
	,get_name: function() {
		return null;
	}
	,dispose: function() {
		if(this.owner != null) this.owner.remove(this);
	}
	,onUpdate: function(dt) {
	}
	,onRemoved: function() {
	}
	,onAdded: function() {
	}
	,__class__: flambe.Component
}
flambe.Entity = function() {
	this.firstComponent = null;
	this.next = null;
	this.firstChild = null;
	this.parent = null;
	this._compMap = { };
};
$hxClasses["flambe.Entity"] = flambe.Entity;
flambe.Entity.__name__ = ["flambe","Entity"];
flambe.Entity.__interfaces__ = [flambe.util.Disposable];
flambe.Entity.prototype = {
	dispose: function() {
		if(this.parent != null) this.parent.removeChild(this);
		while(this.firstComponent != null) this.firstComponent.dispose();
		this.disposeChildren();
	}
	,disposeChildren: function() {
		while(this.firstChild != null) this.firstChild.dispose();
	}
	,removeChild: function(entity) {
		var prev = null, p = this.firstChild;
		while(p != null) {
			var next = p.next;
			if(p == entity) {
				if(prev == null) this.firstChild = next; else prev.next = next;
				p.parent = null;
				p.next = null;
				return;
			}
			prev = p;
			p = next;
		}
	}
	,addChild: function(entity,append) {
		if(append == null) append = true;
		if(entity.parent != null) entity.parent.removeChild(entity);
		entity.parent = this;
		if(append) {
			var tail = null, p = this.firstChild;
			while(p != null) {
				tail = p;
				p = p.next;
			}
			if(tail != null) tail.next = entity; else this.firstChild = entity;
		} else {
			entity.next = this.firstChild;
			this.firstChild = entity;
		}
		return this;
	}
	,remove: function(component) {
		var prev = null, p = this.firstComponent;
		while(p != null) {
			var next = p.next;
			if(p == component) {
				if(prev == null) this.firstComponent = next; else prev.init(this,next);
				delete(this._compMap[p.get_name()]);
				p.onRemoved();
				p.init(null,null);
				return true;
			}
			prev = p;
			p = next;
		}
		return false;
	}
	,add: function(component) {
		if(component.owner != null) component.owner.remove(component);
		var name = component.get_name();
		var prev = this._compMap[name];
		if(prev != null) this.remove(prev);
		this._compMap[name] = component;
		var tail = null, p = this.firstComponent;
		while(p != null) {
			tail = p;
			p = p.next;
		}
		if(tail != null) tail.next = component; else this.firstComponent = component;
		component.init(this,null);
		component.onAdded();
		return this;
	}
	,__class__: flambe.Entity
}
flambe.platform = {}
flambe.platform.Platform = function() { }
$hxClasses["flambe.platform.Platform"] = flambe.platform.Platform;
flambe.platform.Platform.__name__ = ["flambe","platform","Platform"];
flambe.platform.Platform.prototype = {
	__class__: flambe.platform.Platform
}
flambe.platform.html = {}
flambe.platform.html.HtmlPlatform = function() {
};
$hxClasses["flambe.platform.html.HtmlPlatform"] = flambe.platform.html.HtmlPlatform;
flambe.platform.html.HtmlPlatform.__name__ = ["flambe","platform","html","HtmlPlatform"];
flambe.platform.html.HtmlPlatform.__interfaces__ = [flambe.platform.Platform];
flambe.platform.html.HtmlPlatform.prototype = {
	createRenderer: function(canvas) {
		try {
			var gl = js.html._CanvasElement.CanvasUtil.getContextWebGL(canvas,{ alpha : false, depth : false});
			if(gl != null) {
				if(flambe.platform.html.HtmlUtil.detectSlowDriver(gl)) null; else return new flambe.platform.html.WebGLRenderer(this._stage,gl);
			}
		} catch( _ ) {
		}
		return new flambe.platform.html.CanvasRenderer(canvas);
		return null;
	}
	,getY: function(event,bounds) {
		return (event.clientY - bounds.top) * this._stage.get_height() / bounds.height;
	}
	,getX: function(event,bounds) {
		return (event.clientX - bounds.left) * this._stage.get_width() / bounds.width;
	}
	,getRenderer: function() {
		return this._renderer;
	}
	,getPointer: function() {
		return this._pointer;
	}
	,update: function(now) {
		var dt = (now - this._lastUpdate) / 1000;
		this._lastUpdate = now;
		if(flambe.System.hidden._value) return;
		if(this._skipFrame) {
			this._skipFrame = false;
			return;
		}
		this.mainLoop.update(dt);
		this.mainLoop.render(this._renderer);
	}
	,getStorage: function() {
		if(this._storage == null) {
			var localStorage = js.Browser.getLocalStorage();
			if(localStorage != null) this._storage = new flambe.platform.html.HtmlStorage(localStorage); else this._storage = new flambe.platform.DummyStorage();
		}
		return this._storage;
	}
	,getStage: function() {
		return this._stage;
	}
	,loadAssetPack: function(manifest) {
		return new flambe.platform.html.HtmlAssetPackLoader(this,manifest).promise;
	}
	,init: function() {
		var _g = this;
		flambe.platform.html.HtmlUtil.fixAndroidMath();
		var canvas = null;
		try {
			canvas = js.Browser.window.flambe.canvas;
		} catch( error ) {
		}
		canvas.setAttribute("tabindex","0");
		canvas.style.outlineStyle = "none";
		canvas.setAttribute("moz-opaque","true");
		this._stage = new flambe.platform.html.HtmlStage(canvas);
		this._pointer = new flambe.platform.BasicPointer();
		this._mouse = new flambe.platform.html.HtmlMouse(this._pointer,canvas);
		this._renderer = this.createRenderer(canvas);
		this.mainLoop = new flambe.platform.MainLoop();
		this.musicPlaying = false;
		this._canvas = canvas;
		this._container = canvas.parentElement;
		this._container.style.overflow = "hidden";
		this._container.style.position = "relative";
		this._container.style.msTouchAction = "none";
		var lastTouchTime = 0;
		var onMouse = function(event) {
			if(event.timeStamp - lastTouchTime < 1000) return;
			var bounds = canvas.getBoundingClientRect();
			var x = _g.getX(event,bounds);
			var y = _g.getY(event,bounds);
			switch(event.type) {
			case "mousedown":
				if(event.target == canvas) {
					event.preventDefault();
					_g._mouse.submitDown(x,y,event.button);
					canvas.focus();
				}
				break;
			case "mousemove":
				_g._mouse.submitMove(x,y);
				break;
			case "mouseup":
				_g._mouse.submitUp(x,y,event.button);
				break;
			case "mousewheel":case "DOMMouseScroll":
				var velocity = event.type == "mousewheel"?event.wheelDelta / 40:-event.detail;
				if(_g._mouse.submitScroll(x,y,velocity)) event.preventDefault();
				break;
			}
		};
		js.Browser.window.addEventListener("mousedown",onMouse,false);
		js.Browser.window.addEventListener("mousemove",onMouse,false);
		js.Browser.window.addEventListener("mouseup",onMouse,false);
		canvas.addEventListener("mousewheel",onMouse,false);
		canvas.addEventListener("DOMMouseScroll",onMouse,false);
		var standardTouch = typeof(js.Browser.window.ontouchstart) != "undefined";
		var msTouch = 'msMaxTouchPoints' in window.navigator && (window.navigator.msMaxTouchPoints > 1);
		if(standardTouch || msTouch) {
			var basicTouch = new flambe.platform.BasicTouch(this._pointer,standardTouch?4:js.Browser.navigator.msMaxTouchPoints);
			this._touch = basicTouch;
			var onTouch = function(event) {
				var changedTouches = standardTouch?event.changedTouches:[event];
				var bounds = event.target.getBoundingClientRect();
				lastTouchTime = event.timeStamp;
				switch(event.type) {
				case "touchstart":case "MSPointerDown":
					event.preventDefault();
					if(flambe.platform.html.HtmlUtil.SHOULD_HIDE_MOBILE_BROWSER) flambe.platform.html.HtmlUtil.hideMobileBrowser();
					var _g1 = 0;
					while(_g1 < changedTouches.length) {
						var touch = changedTouches[_g1];
						++_g1;
						var x = _g.getX(touch,bounds);
						var y = _g.getY(touch,bounds);
						var id = (standardTouch?touch.identifier:touch.pointerId) | 0;
						basicTouch.submitDown(id,x,y);
					}
					break;
				case "touchmove":case "MSPointerMove":
					event.preventDefault();
					var _g1 = 0;
					while(_g1 < changedTouches.length) {
						var touch = changedTouches[_g1];
						++_g1;
						var x = _g.getX(touch,bounds);
						var y = _g.getY(touch,bounds);
						var id = (standardTouch?touch.identifier:touch.pointerId) | 0;
						basicTouch.submitMove(id,x,y);
					}
					break;
				case "touchend":case "touchcancel":case "MSPointerUp":
					var _g1 = 0;
					while(_g1 < changedTouches.length) {
						var touch = changedTouches[_g1];
						++_g1;
						var x = _g.getX(touch,bounds);
						var y = _g.getY(touch,bounds);
						var id = (standardTouch?touch.identifier:touch.pointerId) | 0;
						basicTouch.submitUp(id,x,y);
					}
					break;
				}
			};
			if(standardTouch) {
				canvas.addEventListener("touchstart",onTouch,false);
				canvas.addEventListener("touchmove",onTouch,false);
				canvas.addEventListener("touchend",onTouch,false);
				canvas.addEventListener("touchcancel",onTouch,false);
			} else {
				canvas.addEventListener("MSPointerDown",onTouch,false);
				canvas.addEventListener("MSPointerMove",onTouch,false);
				canvas.addEventListener("MSPointerUp",onTouch,false);
			}
		} else this._touch = new flambe.platform.DummyTouch();
		var oldErrorHandler = js.Browser.window.onerror;
		js.Browser.window.onerror = function(message,url,line) {
			flambe.System.uncaughtError.emit(message);
			return oldErrorHandler != null?oldErrorHandler(message,url,line):false;
		};
		var hiddenApi = flambe.platform.html.HtmlUtil.loadExtension("hidden",js.Browser.document);
		if(hiddenApi.value != null) {
			var onVisibilityChanged = function(_) {
				flambe.System.hidden.set__(Reflect.field(js.Browser.document,hiddenApi.field));
			};
			onVisibilityChanged(null);
			js.Browser.document.addEventListener(hiddenApi.prefix + "visibilitychange",onVisibilityChanged,false);
		} else {
			var onPageTransitionChange = function(event) {
				flambe.System.hidden.set__(event.type == "pagehide");
			};
			js.Browser.window.addEventListener("pageshow",onPageTransitionChange,false);
			js.Browser.window.addEventListener("pagehide",onPageTransitionChange,false);
		}
		flambe.System.hidden.get_changed().connect(function(hidden,_) {
			if(!hidden) _g._skipFrame = true;
		});
		this._skipFrame = false;
		this._lastUpdate = Date.now();
		var requestAnimationFrame = flambe.platform.html.HtmlUtil.loadExtension("requestAnimationFrame").value;
		if(requestAnimationFrame != null) {
			var performance = js.Browser.window.performance;
			var hasPerfNow = performance != null && flambe.platform.html.HtmlUtil.polyfill("now",performance);
			if(hasPerfNow) this._lastUpdate = performance.now(); else null;
			var updateFrame = null;
			updateFrame = function(now) {
				_g.update(hasPerfNow?performance.now():now);
				requestAnimationFrame(updateFrame,canvas);
			};
			requestAnimationFrame(updateFrame,canvas);
		} else js.Browser.window.setInterval(function() {
			_g.update(Date.now());
		},16);
		null;
	}
	,__class__: flambe.platform.html.HtmlPlatform
}
flambe.util.Value = function(value,listener) {
	this._value = value;
	this._changed = listener != null?new flambe.util.Signal2(listener):null;
};
$hxClasses["flambe.util.Value"] = flambe.util.Value;
flambe.util.Value.__name__ = ["flambe","util","Value"];
flambe.util.Value.prototype = {
	get_changed: function() {
		if(this._changed == null) this._changed = new flambe.util.Signal2();
		return this._changed;
	}
	,set__: function(newValue) {
		var oldValue = this._value;
		if(newValue != oldValue) {
			this._value = newValue;
			if(this._changed != null) this._changed.emit(newValue,oldValue);
		}
		return newValue;
	}
	,watch: function(listener) {
		listener(this._value,this._value);
		return this.get_changed().connect(listener);
	}
	,__class__: flambe.util.Value
}
flambe.util.SignalConnection = function(signal,listener) {
	this._next = null;
	this._signal = signal;
	this._listener = listener;
	this.stayInList = true;
};
$hxClasses["flambe.util.SignalConnection"] = flambe.util.SignalConnection;
flambe.util.SignalConnection.__name__ = ["flambe","util","SignalConnection"];
flambe.util.SignalConnection.__interfaces__ = [flambe.util.Disposable];
flambe.util.SignalConnection.prototype = {
	dispose: function() {
		if(this._signal != null) {
			this._signal.disconnect(this);
			this._signal = null;
		}
	}
	,once: function() {
		this.stayInList = false;
		return this;
	}
	,__class__: flambe.util.SignalConnection
}
flambe.util.SignalBase = function(listener) {
	this._head = listener != null?new flambe.util.SignalConnection(this,listener):null;
	this._deferredTasks = null;
};
$hxClasses["flambe.util.SignalBase"] = flambe.util.SignalBase;
flambe.util.SignalBase.__name__ = ["flambe","util","SignalBase"];
flambe.util.SignalBase.prototype = {
	listRemove: function(conn) {
		var prev = null, p = this._head;
		while(p != null) {
			if(p == conn) {
				var next = p._next;
				if(prev == null) this._head = next; else prev._next = next;
				return;
			}
			prev = p;
			p = p._next;
		}
	}
	,listAdd: function(conn,prioritize) {
		if(prioritize) {
			conn._next = this._head;
			this._head = conn;
		} else {
			var tail = null, p = this._head;
			while(p != null) {
				tail = p;
				p = p._next;
			}
			if(tail != null) tail._next = conn; else this._head = conn;
		}
	}
	,didEmit: function(head) {
		this._head = head;
		var snapshot = this._deferredTasks;
		this._deferredTasks = null;
		while(snapshot != null) {
			snapshot.fn();
			snapshot = snapshot.next;
		}
	}
	,willEmit: function() {
		var snapshot = this._head;
		this._head = flambe.util.SignalBase.DISPATCHING_SENTINEL;
		return snapshot;
	}
	,defer: function(fn) {
		var tail = null, p = this._deferredTasks;
		while(p != null) {
			tail = p;
			p = p.next;
		}
		var task = new flambe.util._SignalBase.Task(fn);
		if(tail != null) tail.next = task; else this._deferredTasks = task;
	}
	,disconnect: function(conn) {
		var _g = this;
		if(this._head == flambe.util.SignalBase.DISPATCHING_SENTINEL) this.defer(function() {
			_g.listRemove(conn);
		}); else this.listRemove(conn);
	}
	,connectImpl: function(listener,prioritize) {
		var _g = this;
		var conn = new flambe.util.SignalConnection(this,listener);
		if(this._head == flambe.util.SignalBase.DISPATCHING_SENTINEL) this.defer(function() {
			_g.listAdd(conn,prioritize);
		}); else this.listAdd(conn,prioritize);
		return conn;
	}
	,__class__: flambe.util.SignalBase
}
flambe.util.Signal2 = function(listener) {
	flambe.util.SignalBase.call(this,listener);
};
$hxClasses["flambe.util.Signal2"] = flambe.util.Signal2;
flambe.util.Signal2.__name__ = ["flambe","util","Signal2"];
flambe.util.Signal2.__super__ = flambe.util.SignalBase;
flambe.util.Signal2.prototype = $extend(flambe.util.SignalBase.prototype,{
	emitImpl: function(arg1,arg2) {
		var head = this.willEmit();
		var p = head;
		while(p != null) {
			p._listener(arg1,arg2);
			if(!p.stayInList) p.dispose();
			p = p._next;
		}
		this.didEmit(head);
	}
	,emit: function(arg1,arg2) {
		var _g = this;
		if(this._head == flambe.util.SignalBase.DISPATCHING_SENTINEL) this.defer(function() {
			_g.emitImpl(arg1,arg2);
		}); else this.emitImpl(arg1,arg2);
	}
	,connect: function(listener,prioritize) {
		if(prioritize == null) prioritize = false;
		return this.connectImpl(listener,prioritize);
	}
	,__class__: flambe.util.Signal2
});
flambe.util.Signal1 = function(listener) {
	flambe.util.SignalBase.call(this,listener);
};
$hxClasses["flambe.util.Signal1"] = flambe.util.Signal1;
flambe.util.Signal1.__name__ = ["flambe","util","Signal1"];
flambe.util.Signal1.__super__ = flambe.util.SignalBase;
flambe.util.Signal1.prototype = $extend(flambe.util.SignalBase.prototype,{
	emitImpl: function(arg1) {
		var head = this.willEmit();
		var p = head;
		while(p != null) {
			p._listener(arg1);
			if(!p.stayInList) p.dispose();
			p = p._next;
		}
		this.didEmit(head);
	}
	,emit: function(arg1) {
		var _g = this;
		if(this._head == flambe.util.SignalBase.DISPATCHING_SENTINEL) this.defer(function() {
			_g.emitImpl(arg1);
		}); else this.emitImpl(arg1);
	}
	,connect: function(listener,prioritize) {
		if(prioritize == null) prioritize = false;
		return this.connectImpl(listener,prioritize);
	}
	,__class__: flambe.util.Signal1
});
flambe.animation = {}
flambe.animation.AnimatedFloat = function(value,listener) {
	this._behavior = null;
	flambe.util.Value.call(this,value,listener);
};
$hxClasses["flambe.animation.AnimatedFloat"] = flambe.animation.AnimatedFloat;
flambe.animation.AnimatedFloat.__name__ = ["flambe","animation","AnimatedFloat"];
flambe.animation.AnimatedFloat.__super__ = flambe.util.Value;
flambe.animation.AnimatedFloat.prototype = $extend(flambe.util.Value.prototype,{
	set_behavior: function(behavior) {
		this._behavior = behavior;
		this.update(0);
		return behavior;
	}
	,animateTo: function(to,seconds,easing) {
		this.set_behavior(new flambe.animation.Tween(this._value,to,seconds,easing));
	}
	,update: function(dt) {
		if(this._behavior != null) {
			flambe.util.Value.prototype.set__.call(this,this._behavior.update(dt));
			if(this._behavior.isComplete()) this._behavior = null;
		}
	}
	,set__: function(value) {
		this._behavior = null;
		return flambe.util.Value.prototype.set__.call(this,value);
	}
	,__class__: flambe.animation.AnimatedFloat
});
flambe.System = function() { }
$hxClasses["flambe.System"] = flambe.System;
flambe.System.__name__ = ["flambe","System"];
flambe.System.init = function() {
	if(!flambe.System._calledInit) {
		flambe.System._platform.init();
		flambe.System._calledInit = true;
	}
}
flambe.SpeedAdjuster = function() {
	this._realDt = 0;
};
$hxClasses["flambe.SpeedAdjuster"] = flambe.SpeedAdjuster;
flambe.SpeedAdjuster.__name__ = ["flambe","SpeedAdjuster"];
flambe.SpeedAdjuster.__super__ = flambe.Component;
flambe.SpeedAdjuster.prototype = $extend(flambe.Component.prototype,{
	onUpdate: function(dt) {
		if(this._realDt > 0) {
			dt = this._realDt;
			this._realDt = 0;
		}
		this.scale.update(dt);
	}
	,get_name: function() {
		return "SpeedAdjuster_21";
	}
	,__class__: flambe.SpeedAdjuster
});
flambe.animation.Behavior = function() { }
$hxClasses["flambe.animation.Behavior"] = flambe.animation.Behavior;
flambe.animation.Behavior.__name__ = ["flambe","animation","Behavior"];
flambe.animation.Behavior.prototype = {
	__class__: flambe.animation.Behavior
}
flambe.animation.Ease = function() { }
$hxClasses["flambe.animation.Ease"] = flambe.animation.Ease;
flambe.animation.Ease.__name__ = ["flambe","animation","Ease"];
flambe.animation.Ease.linear = function(t) {
	return t;
}
flambe.animation.Ease.quintInOut = function(t) {
	return (t *= 2) < 1?t * t * t * t * t / 2:((t -= 2) * t * t * t * t + 2) / 2;
}
flambe.animation.Ease.bounceOut = function(t) {
	if(t < 1 / 2.75) return 7.5625 * t * t;
	if(t < 2 / 2.75) return 7.5625 * (t - 1.5 / 2.75) * (t - 1.5 / 2.75) + .75;
	if(t < 2.5 / 2.75) return 7.5625 * (t - 2.25 / 2.75) * (t - 2.25 / 2.75) + .9375;
	return 7.5625 * (t - 2.625 / 2.75) * (t - 2.625 / 2.75) + .984375;
}
flambe.animation.Tween = function(from,to,seconds,easing) {
	this._from = from;
	this._to = to;
	this._duration = seconds;
	this.elapsed = 0;
	this._easing = easing != null?easing:flambe.animation.Ease.linear;
};
$hxClasses["flambe.animation.Tween"] = flambe.animation.Tween;
flambe.animation.Tween.__name__ = ["flambe","animation","Tween"];
flambe.animation.Tween.__interfaces__ = [flambe.animation.Behavior];
flambe.animation.Tween.prototype = {
	isComplete: function() {
		return this.elapsed >= this._duration;
	}
	,update: function(dt) {
		this.elapsed += dt;
		if(this.elapsed >= this._duration) return this._to; else return this._from + (this._to - this._from) * this._easing(this.elapsed / this._duration);
	}
	,__class__: flambe.animation.Tween
}
flambe.asset = {}
flambe.asset.Asset = function() { }
$hxClasses["flambe.asset.Asset"] = flambe.asset.Asset;
flambe.asset.Asset.__name__ = ["flambe","asset","Asset"];
flambe.asset.Asset.__interfaces__ = [flambe.util.Disposable];
flambe.asset.Asset.prototype = {
	__class__: flambe.asset.Asset
}
flambe.asset.AssetFormat = $hxClasses["flambe.asset.AssetFormat"] = { __ename__ : ["flambe","asset","AssetFormat"], __constructs__ : ["WEBP","JXR","PNG","JPG","GIF","DDS","PVR","PKM","MP3","M4A","OPUS","OGG","WAV","Data"] }
flambe.asset.AssetFormat.WEBP = ["WEBP",0];
flambe.asset.AssetFormat.WEBP.toString = $estr;
flambe.asset.AssetFormat.WEBP.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.JXR = ["JXR",1];
flambe.asset.AssetFormat.JXR.toString = $estr;
flambe.asset.AssetFormat.JXR.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.PNG = ["PNG",2];
flambe.asset.AssetFormat.PNG.toString = $estr;
flambe.asset.AssetFormat.PNG.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.JPG = ["JPG",3];
flambe.asset.AssetFormat.JPG.toString = $estr;
flambe.asset.AssetFormat.JPG.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.GIF = ["GIF",4];
flambe.asset.AssetFormat.GIF.toString = $estr;
flambe.asset.AssetFormat.GIF.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.DDS = ["DDS",5];
flambe.asset.AssetFormat.DDS.toString = $estr;
flambe.asset.AssetFormat.DDS.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.PVR = ["PVR",6];
flambe.asset.AssetFormat.PVR.toString = $estr;
flambe.asset.AssetFormat.PVR.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.PKM = ["PKM",7];
flambe.asset.AssetFormat.PKM.toString = $estr;
flambe.asset.AssetFormat.PKM.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.MP3 = ["MP3",8];
flambe.asset.AssetFormat.MP3.toString = $estr;
flambe.asset.AssetFormat.MP3.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.M4A = ["M4A",9];
flambe.asset.AssetFormat.M4A.toString = $estr;
flambe.asset.AssetFormat.M4A.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.OPUS = ["OPUS",10];
flambe.asset.AssetFormat.OPUS.toString = $estr;
flambe.asset.AssetFormat.OPUS.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.OGG = ["OGG",11];
flambe.asset.AssetFormat.OGG.toString = $estr;
flambe.asset.AssetFormat.OGG.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.WAV = ["WAV",12];
flambe.asset.AssetFormat.WAV.toString = $estr;
flambe.asset.AssetFormat.WAV.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.Data = ["Data",13];
flambe.asset.AssetFormat.Data.toString = $estr;
flambe.asset.AssetFormat.Data.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetEntry = function(name,url,format,bytes) {
	this.name = name;
	this.url = url;
	this.format = format;
	this.bytes = bytes;
};
$hxClasses["flambe.asset.AssetEntry"] = flambe.asset.AssetEntry;
flambe.asset.AssetEntry.__name__ = ["flambe","asset","AssetEntry"];
flambe.asset.AssetEntry.prototype = {
	__class__: flambe.asset.AssetEntry
}
flambe.asset.AssetPack = function() { }
$hxClasses["flambe.asset.AssetPack"] = flambe.asset.AssetPack;
flambe.asset.AssetPack.__name__ = ["flambe","asset","AssetPack"];
flambe.asset.AssetPack.__interfaces__ = [flambe.util.Disposable];
flambe.asset.AssetPack.prototype = {
	__class__: flambe.asset.AssetPack
}
flambe.asset.File = function() { }
$hxClasses["flambe.asset.File"] = flambe.asset.File;
flambe.asset.File.__name__ = ["flambe","asset","File"];
flambe.asset.File.__interfaces__ = [flambe.asset.Asset];
flambe.asset.File.prototype = {
	__class__: flambe.asset.File
}
var js = {}
js.Browser = function() { }
$hxClasses["js.Browser"] = js.Browser;
js.Browser.__name__ = ["js","Browser"];
js.Browser.getLocalStorage = function() {
	try {
		var s = js.Browser.window.localStorage;
		s.getItem("");
		return s;
	} catch( e ) {
		return null;
	}
}
flambe.asset.Manifest = function() {
	this._entries = [];
};
$hxClasses["flambe.asset.Manifest"] = flambe.asset.Manifest;
flambe.asset.Manifest.__name__ = ["flambe","asset","Manifest"];
flambe.asset.Manifest.build = function(packName,required) {
	if(required == null) required = true;
	var packData = Reflect.field(haxe.rtti.Meta.getType(flambe.asset.Manifest).assets[0],packName);
	if(packData == null) {
		if(required) throw flambe.util.Strings.withFields("Missing asset pack",["name",packName]);
		return null;
	}
	var manifest = new flambe.asset.Manifest();
	manifest.set_relativeBasePath("assets");
	var _g = 0;
	while(_g < packData.length) {
		var asset = packData[_g];
		++_g;
		var name = asset.name;
		var path = packName + "/" + name + "?v=" + Std.string(asset.md5);
		var format = flambe.asset.Manifest.inferFormat(name);
		if(format != flambe.asset.AssetFormat.Data) name = flambe.util.Strings.removeFileExtension(name);
		manifest.add(name,path,asset.bytes,format);
	}
	return manifest;
}
flambe.asset.Manifest.inferFormat = function(url) {
	var extension = flambe.util.Strings.getUrlExtension(url);
	if(extension != null) {
		var _g = extension.toLowerCase();
		switch(_g) {
		case "gif":
			return flambe.asset.AssetFormat.GIF;
		case "jpg":case "jpeg":
			return flambe.asset.AssetFormat.JPG;
		case "jxr":case "wdp":
			return flambe.asset.AssetFormat.JXR;
		case "png":
			return flambe.asset.AssetFormat.PNG;
		case "webp":
			return flambe.asset.AssetFormat.WEBP;
		case "dds":
			return flambe.asset.AssetFormat.DDS;
		case "pvr":
			return flambe.asset.AssetFormat.PVR;
		case "pkm":
			return flambe.asset.AssetFormat.PKM;
		case "m4a":
			return flambe.asset.AssetFormat.M4A;
		case "mp3":
			return flambe.asset.AssetFormat.MP3;
		case "ogg":
			return flambe.asset.AssetFormat.OGG;
		case "opus":
			return flambe.asset.AssetFormat.OPUS;
		case "wav":
			return flambe.asset.AssetFormat.WAV;
		}
	} else null;
	return flambe.asset.AssetFormat.Data;
}
flambe.asset.Manifest.prototype = {
	set_externalBasePath: function(basePath) {
		this._externalBasePath = basePath;
		if(basePath != null) null;
		return basePath;
	}
	,get_externalBasePath: function() {
		return this._externalBasePath;
	}
	,set_relativeBasePath: function(basePath) {
		this._relativeBasePath = basePath;
		if(basePath != null) null;
		return basePath;
	}
	,get_relativeBasePath: function() {
		return this._relativeBasePath;
	}
	,getFullURL: function(entry) {
		var restricted = this.get_externalBasePath() != null && flambe.asset.Manifest._supportsCrossOrigin?this.get_externalBasePath():this.get_relativeBasePath();
		var unrestricted = this.get_externalBasePath() != null?this.get_externalBasePath():this.get_relativeBasePath();
		var base = unrestricted;
		if(entry.format == flambe.asset.AssetFormat.Data) base = restricted;
		return base != null?flambe.util.Strings.joinPath(base,entry.url):entry.url;
	}
	,iterator: function() {
		return HxOverrides.iter(this._entries);
	}
	,add: function(name,url,bytes,format) {
		if(bytes == null) bytes = 0;
		if(format == null) format = flambe.asset.Manifest.inferFormat(url);
		var entry = new flambe.asset.AssetEntry(name,url,format,bytes);
		this._entries.push(entry);
		return entry;
	}
	,__class__: flambe.asset.Manifest
}
flambe.display = {}
flambe.display.BlendMode = $hxClasses["flambe.display.BlendMode"] = { __ename__ : ["flambe","display","BlendMode"], __constructs__ : ["Normal","Add","Mask","Copy"] }
flambe.display.BlendMode.Normal = ["Normal",0];
flambe.display.BlendMode.Normal.toString = $estr;
flambe.display.BlendMode.Normal.__enum__ = flambe.display.BlendMode;
flambe.display.BlendMode.Add = ["Add",1];
flambe.display.BlendMode.Add.toString = $estr;
flambe.display.BlendMode.Add.__enum__ = flambe.display.BlendMode;
flambe.display.BlendMode.Mask = ["Mask",2];
flambe.display.BlendMode.Mask.toString = $estr;
flambe.display.BlendMode.Mask.__enum__ = flambe.display.BlendMode;
flambe.display.BlendMode.Copy = ["Copy",3];
flambe.display.BlendMode.Copy.toString = $estr;
flambe.display.BlendMode.Copy.__enum__ = flambe.display.BlendMode;
flambe.math = {}
flambe.math.Point = function(x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
};
$hxClasses["flambe.math.Point"] = flambe.math.Point;
flambe.math.Point.__name__ = ["flambe","math","Point"];
flambe.math.Point.prototype = {
	__class__: flambe.math.Point
}
flambe.display.Sprite = function() {
	this.scissor = null;
	this.blendMode = null;
	var _g = this;
	this._flags = 139;
	this._localMatrix = new flambe.math.Matrix();
	var dirtyMatrix = function(_,_1) {
		_g._flags = _g._flags | 12;
	};
	this.x = new flambe.animation.AnimatedFloat(0,dirtyMatrix);
	this.y = new flambe.animation.AnimatedFloat(0,dirtyMatrix);
	this.rotation = new flambe.animation.AnimatedFloat(0,dirtyMatrix);
	this.scaleX = new flambe.animation.AnimatedFloat(1,dirtyMatrix);
	this.scaleY = new flambe.animation.AnimatedFloat(1,dirtyMatrix);
	this.anchorX = new flambe.animation.AnimatedFloat(0,dirtyMatrix);
	this.anchorY = new flambe.animation.AnimatedFloat(0,dirtyMatrix);
	this.alpha = new flambe.animation.AnimatedFloat(1);
};
$hxClasses["flambe.display.Sprite"] = flambe.display.Sprite;
flambe.display.Sprite.__name__ = ["flambe","display","Sprite"];
flambe.display.Sprite.hitTest = function(entity,x,y) {
	var sprite = entity._compMap.Sprite_5;
	if(sprite != null) {
		if(!((sprite._flags & 3) == 3)) return null;
		if(sprite.getLocalMatrix().inverseTransform(x,y,flambe.display.Sprite._scratchPoint)) {
			x = flambe.display.Sprite._scratchPoint.x;
			y = flambe.display.Sprite._scratchPoint.y;
		}
		var scissor = sprite.scissor;
		if(scissor != null && !scissor.contains(x,y)) return null;
	}
	var result = flambe.display.Sprite.hitTestBackwards(entity.firstChild,x,y);
	if(result != null) return result;
	return sprite != null && sprite.containsLocal(x,y)?sprite:null;
}
flambe.display.Sprite.getBounds = function(entity,result) {
	if(result == null) result = new flambe.math.Rectangle();
	result.set(1.79769313486231e+308,1.79769313486231e+308,-1.79769313486231e+308,-1.79769313486231e+308);
	flambe.display.Sprite.getBoundsImpl(entity,null,result);
	result.width -= result.x;
	result.height -= result.y;
	return result;
}
flambe.display.Sprite.render = function(entity,g) {
	var sprite = entity._compMap.Sprite_5;
	if(sprite != null) {
		var alpha = sprite.alpha._value;
		if(!((sprite._flags & 1) != 0) || alpha <= 0) return;
		g.save();
		if(alpha < 1) g.multiplyAlpha(alpha);
		if(sprite.blendMode != null) g.setBlendMode(sprite.blendMode);
		var matrix = sprite.getLocalMatrix();
		var m02 = matrix.m02;
		var m12 = matrix.m12;
		if((sprite._flags & 128) != 0) {
			m02 = Math.round(m02);
			m12 = Math.round(m12);
		}
		g.transform(matrix.m00,matrix.m10,matrix.m01,matrix.m11,m02,m12);
		var scissor = sprite.scissor;
		if(scissor != null) g.applyScissor(scissor.x,scissor.y,scissor.width,scissor.height);
		sprite.draw(g);
	}
	var director = entity._compMap.Director_19;
	if(director != null) {
		var scenes = director.occludedScenes;
		var _g = 0;
		while(_g < scenes.length) {
			var scene = scenes[_g];
			++_g;
			flambe.display.Sprite.render(scene,g);
		}
	}
	var p = entity.firstChild;
	while(p != null) {
		var next = p.next;
		flambe.display.Sprite.render(p,g);
		p = next;
	}
	if(sprite != null) g.restore();
}
flambe.display.Sprite.hitTestBackwards = function(entity,x,y) {
	if(entity != null) {
		var result = flambe.display.Sprite.hitTestBackwards(entity.next,x,y);
		return result != null?result:flambe.display.Sprite.hitTest(entity,x,y);
	}
	return null;
}
flambe.display.Sprite.getBoundsImpl = function(entity,matrix,result) {
	var sprite = entity._compMap.Sprite_5;
	if(sprite != null) {
		matrix = matrix != null?flambe.math.Matrix.multiply(matrix,sprite.getLocalMatrix()):sprite.getLocalMatrix();
		var x1 = 0.0, y1 = 0.0;
		var x2 = sprite.getNaturalWidth(), y2 = sprite.getNaturalHeight();
		if(x2 > x1 && y2 > y1) {
			flambe.display.Sprite.extendRect(matrix,x1,y1,result);
			flambe.display.Sprite.extendRect(matrix,x2,y1,result);
			flambe.display.Sprite.extendRect(matrix,x2,y2,result);
			flambe.display.Sprite.extendRect(matrix,x1,y2,result);
		}
	}
	var director = entity._compMap.Director_19;
	if(director != null) {
		var scenes = director.occludedScenes;
		var ii = 0, ll = scenes.length;
		while(ii < ll) {
			flambe.display.Sprite.getBoundsImpl(scenes[ii],matrix,result);
			++ii;
		}
	}
	var p = entity.firstChild;
	while(p != null) {
		var next = p.next;
		flambe.display.Sprite.getBoundsImpl(p,matrix,result);
		p = next;
	}
}
flambe.display.Sprite.extendRect = function(matrix,x,y,rect) {
	var p = matrix.transform(x,y,flambe.display.Sprite._scratchPoint);
	x = p.x;
	y = p.y;
	if(x < rect.x) rect.x = x;
	if(y < rect.y) rect.y = y;
	if(x > rect.width) rect.width = x;
	if(y > rect.height) rect.height = y;
}
flambe.display.Sprite.__super__ = flambe.Component;
flambe.display.Sprite.prototype = $extend(flambe.Component.prototype,{
	set_pointerEnabled: function(pointerEnabled) {
		this._flags = flambe.util.BitSets.set(this._flags,2,pointerEnabled);
		return pointerEnabled;
	}
	,set_visible: function(visible) {
		this._flags = flambe.util.BitSets.set(this._flags,1,visible);
		return visible;
	}
	,get_pointerUp: function() {
		if(this._pointerUp == null) this._pointerUp = new flambe.util.Signal1();
		return this._pointerUp;
	}
	,get_pointerMove: function() {
		if(this._pointerMove == null) this._pointerMove = new flambe.util.Signal1();
		return this._pointerMove;
	}
	,get_pointerDown: function() {
		if(this._pointerDown == null) this._pointerDown = new flambe.util.Signal1();
		return this._pointerDown;
	}
	,draw: function(g) {
	}
	,onUpdate: function(dt) {
		this.x.update(dt);
		this.y.update(dt);
		this.rotation.update(dt);
		this.scaleX.update(dt);
		this.scaleY.update(dt);
		this.alpha.update(dt);
		this.anchorX.update(dt);
		this.anchorY.update(dt);
	}
	,disablePointer: function() {
		this.set_pointerEnabled(false);
		return this;
	}
	,setScale: function(scale) {
		this.scaleX.set__(scale);
		this.scaleY.set__(scale);
		return this;
	}
	,centerAnchor: function() {
		this.anchorX.set__(this.getNaturalWidth() / 2);
		this.anchorY.set__(this.getNaturalHeight() / 2);
		return this;
	}
	,setAnchor: function(x,y) {
		this.anchorX.set__(x);
		this.anchorY.set__(y);
		return this;
	}
	,getLocalMatrix: function() {
		if((this._flags & 4) != 0) {
			this._flags = this._flags & -5;
			this._localMatrix.compose(this.x._value,this.y._value,this.scaleX._value,this.scaleY._value,this.rotation._value * 3.141592653589793 / 180);
			this._localMatrix.translate(-this.anchorX._value,-this.anchorY._value);
		}
		return this._localMatrix;
	}
	,containsLocal: function(localX,localY) {
		return localX >= 0 && localX < this.getNaturalWidth() && localY >= 0 && localY < this.getNaturalHeight();
	}
	,getNaturalHeight: function() {
		return 0;
	}
	,getNaturalWidth: function() {
		return 0;
	}
	,get_name: function() {
		return "Sprite_5";
	}
	,__class__: flambe.display.Sprite
});
flambe.display.FillSprite = function(color,width,height) {
	flambe.display.Sprite.call(this);
	this.color = color;
	this.width = new flambe.animation.AnimatedFloat(width);
	this.height = new flambe.animation.AnimatedFloat(height);
};
$hxClasses["flambe.display.FillSprite"] = flambe.display.FillSprite;
flambe.display.FillSprite.__name__ = ["flambe","display","FillSprite"];
flambe.display.FillSprite.__super__ = flambe.display.Sprite;
flambe.display.FillSprite.prototype = $extend(flambe.display.Sprite.prototype,{
	onUpdate: function(dt) {
		flambe.display.Sprite.prototype.onUpdate.call(this,dt);
		this.width.update(dt);
		this.height.update(dt);
	}
	,getNaturalHeight: function() {
		return this.height._value;
	}
	,getNaturalWidth: function() {
		return this.width._value;
	}
	,draw: function(g) {
		g.fillRect(this.color,0,0,this.width._value,this.height._value);
	}
	,__class__: flambe.display.FillSprite
});
flambe.display.Glyph = function(charCode) {
	this._kernings = null;
	this.xAdvance = 0;
	this.yOffset = 0;
	this.xOffset = 0;
	this.page = null;
	this.height = 0;
	this.width = 0;
	this.y = 0;
	this.x = 0;
	this.charCode = charCode;
};
$hxClasses["flambe.display.Glyph"] = flambe.display.Glyph;
flambe.display.Glyph.__name__ = ["flambe","display","Glyph"];
flambe.display.Glyph.prototype = {
	setKerning: function(nextCharCode,amount) {
		if(this._kernings == null) this._kernings = new haxe.ds.IntMap();
		this._kernings.set(nextCharCode,amount);
	}
	,getKerning: function(nextCharCode) {
		return this._kernings != null?this._kernings.get(nextCharCode) | 0:0;
	}
	,draw: function(g,destX,destY) {
		if(this.width > 0) g.drawSubImage(this.page,destX + this.xOffset,destY + this.yOffset,this.x,this.y,this.width,this.height);
	}
	,__class__: flambe.display.Glyph
}
flambe.display.Font = function(pack,name) {
	this.name = name;
	this._pack = pack;
	this.reload();
};
$hxClasses["flambe.display.Font"] = flambe.display.Font;
flambe.display.Font.__name__ = ["flambe","display","Font"];
flambe.display.Font.prototype = {
	reload: function() {
		this._glyphs = new haxe.ds.IntMap();
		this._glyphs.set(flambe.display.Font.NEWLINE.charCode,flambe.display.Font.NEWLINE);
		var parser = new flambe.display._Font.ConfigParser(this._pack.getFile(this.name + ".fnt").toString());
		var pages = new haxe.ds.IntMap();
		var idx = this.name.lastIndexOf("/");
		var basePath = idx >= 0?HxOverrides.substr(this.name,0,idx + 1):"";
		var $it0 = parser.keywords();
		while( $it0.hasNext() ) {
			var keyword = $it0.next();
			switch(keyword) {
			case "info":
				var $it1 = parser.pairs();
				while( $it1.hasNext() ) {
					var pair = $it1.next();
					switch(pair.key) {
					case "size":
						this.size = pair.getInt();
						break;
					}
				}
				break;
			case "page":
				var pageId = 0;
				var file = null;
				var $it2 = parser.pairs();
				while( $it2.hasNext() ) {
					var pair = $it2.next();
					switch(pair.key) {
					case "id":
						pageId = pair.getInt();
						break;
					case "file":
						file = pair.getString();
						break;
					}
				}
				pages.set(pageId,this._pack.getTexture(basePath + flambe.util.Strings.removeFileExtension(file)));
				break;
			case "char":
				var glyph = null;
				var $it3 = parser.pairs();
				while( $it3.hasNext() ) {
					var pair = $it3.next();
					switch(pair.key) {
					case "id":
						glyph = new flambe.display.Glyph(pair.getInt());
						break;
					case "x":
						glyph.x = pair.getInt();
						break;
					case "y":
						glyph.y = pair.getInt();
						break;
					case "width":
						glyph.width = pair.getInt();
						break;
					case "height":
						glyph.height = pair.getInt();
						break;
					case "page":
						glyph.page = pages.get(pair.getInt());
						break;
					case "xoffset":
						glyph.xOffset = pair.getInt();
						break;
					case "yoffset":
						glyph.yOffset = pair.getInt();
						break;
					case "xadvance":
						glyph.xAdvance = pair.getInt();
						break;
					}
				}
				this._glyphs.set(glyph.charCode,glyph);
				break;
			case "kerning":
				var first = null;
				var second = -1;
				var $it4 = parser.pairs();
				while( $it4.hasNext() ) {
					var pair = $it4.next();
					switch(pair.key) {
					case "first":
						first = this._glyphs.get(pair.getInt());
						break;
					case "second":
						second = pair.getInt();
						break;
					case "amount":
						first.setKerning(second,pair.getInt());
						break;
					}
				}
				break;
			}
		}
	}
	,layoutText: function(text,align,wrapWidth) {
		if(wrapWidth == null) wrapWidth = 0;
		if(align == null) align = flambe.display.TextAlign.Left;
		return new flambe.display.TextLayout(this,text,align,wrapWidth);
	}
	,__class__: flambe.display.Font
}
flambe.display.TextAlign = $hxClasses["flambe.display.TextAlign"] = { __ename__ : ["flambe","display","TextAlign"], __constructs__ : ["Left","Center","Right"] }
flambe.display.TextAlign.Left = ["Left",0];
flambe.display.TextAlign.Left.toString = $estr;
flambe.display.TextAlign.Left.__enum__ = flambe.display.TextAlign;
flambe.display.TextAlign.Center = ["Center",1];
flambe.display.TextAlign.Center.toString = $estr;
flambe.display.TextAlign.Center.__enum__ = flambe.display.TextAlign;
flambe.display.TextAlign.Right = ["Right",2];
flambe.display.TextAlign.Right.toString = $estr;
flambe.display.TextAlign.Right.__enum__ = flambe.display.TextAlign;
flambe.display.TextLayout = function(font,text,align,wrapWidth) {
	this.lines = 0;
	var _g = this;
	this._font = font;
	this._glyphs = [];
	this._offsets = [];
	this.bounds = new flambe.math.Rectangle();
	var lineWidths = [];
	var ll = text.length;
	var _g1 = 0;
	while(_g1 < ll) {
		var ii = _g1++;
		var charCode = text.charCodeAt(ii);
		var glyph = font._glyphs.get(charCode);
		if(glyph != null) this._glyphs.push(glyph); else null;
	}
	var lastSpaceIdx = -1;
	var lineWidth = 0.0;
	var lineHeight = 0.0;
	var newline = font._glyphs.get(10);
	var addLine = function() {
		_g.bounds.width = flambe.math.FMath.max(_g.bounds.width,lineWidth);
		_g.bounds.height += lineHeight;
		lineWidths[_g.lines] = lineWidth;
		lineWidth = 0;
		lineHeight = 0;
		++_g.lines;
	};
	var ii = 0;
	while(ii < this._glyphs.length) {
		var glyph = this._glyphs[ii];
		this._offsets[ii] = lineWidth;
		var wordWrap = wrapWidth > 0 && lineWidth + glyph.width > wrapWidth;
		if(wordWrap || glyph == newline) {
			if(wordWrap) {
				if(lastSpaceIdx >= 0) {
					this._glyphs[lastSpaceIdx] = newline;
					lineWidth = this._offsets[lastSpaceIdx];
					ii = lastSpaceIdx;
				} else this._glyphs.splice(ii,0,newline);
			}
			lastSpaceIdx = -1;
			lineHeight = font.size;
			addLine();
		} else {
			if(glyph.charCode == 32) lastSpaceIdx = ii;
			lineWidth += glyph.xAdvance;
			lineHeight = flambe.math.FMath.max(lineHeight,glyph.height + glyph.yOffset);
			if(ii + 1 < this._glyphs.length) {
				var nextGlyph = this._glyphs[ii + 1];
				lineWidth += glyph.getKerning(nextGlyph.charCode);
			}
		}
		++ii;
	}
	addLine();
	var lineY = 0.0;
	var alignOffset = flambe.display.TextLayout.getAlignOffset(align,lineWidths[0],wrapWidth);
	var top = 1.79769313486231e+308;
	var bottom = -1.79769313486231e+308;
	var line = 0;
	var ii1 = 0;
	var ll1 = this._glyphs.length;
	while(ii1 < ll1) {
		var glyph = this._glyphs[ii1];
		if(glyph.charCode == 10) {
			lineY += font.size;
			++line;
			alignOffset = flambe.display.TextLayout.getAlignOffset(align,lineWidths[line],wrapWidth);
		}
		this._offsets[ii1] += alignOffset;
		var glyphY = lineY + glyph.yOffset;
		top = top < glyphY?top:glyphY;
		bottom = flambe.math.FMath.max(bottom,glyphY + glyph.height);
		++ii1;
	}
	this.bounds.x = flambe.display.TextLayout.getAlignOffset(align,this.bounds.width,wrapWidth);
	this.bounds.y = top;
	this.bounds.height = bottom - top;
};
$hxClasses["flambe.display.TextLayout"] = flambe.display.TextLayout;
flambe.display.TextLayout.__name__ = ["flambe","display","TextLayout"];
flambe.display.TextLayout.getAlignOffset = function(align,lineWidth,totalWidth) {
	switch( (align)[1] ) {
	case 0:
		return 0;
	case 2:
		return totalWidth - lineWidth;
	case 1:
		return (totalWidth - lineWidth) / 2;
	}
}
flambe.display.TextLayout.prototype = {
	draw: function(g,align) {
		var y = 0.0;
		var ii = 0;
		var ll = this._glyphs.length;
		while(ii < ll) {
			var glyph = this._glyphs[ii];
			if(glyph.charCode == 10) y += this._font.size; else {
				var x = this._offsets[ii];
				glyph.draw(g,x,y);
			}
			++ii;
		}
	}
	,__class__: flambe.display.TextLayout
}
flambe.display._Font = {}
flambe.display._Font.ConfigParser = function(config) {
	this._configText = config;
	this._keywordPattern = new EReg("([a-z]+)(.*)","");
	this._pairPattern = new EReg("([a-z]+)=(\"[^\"]*\"|[^\\s]+)","");
};
$hxClasses["flambe.display._Font.ConfigParser"] = flambe.display._Font.ConfigParser;
flambe.display._Font.ConfigParser.__name__ = ["flambe","display","_Font","ConfigParser"];
flambe.display._Font.ConfigParser.advance = function(text,expr) {
	var m = expr.matchedPos();
	return HxOverrides.substr(text,m.pos + m.len,text.length);
}
flambe.display._Font.ConfigParser.prototype = {
	pairs: function() {
		var _g = this;
		var text = this._pairText;
		return { next : function() {
			text = flambe.display._Font.ConfigParser.advance(text,_g._pairPattern);
			return new flambe.display._Font.ConfigPair(_g._pairPattern.matched(1),_g._pairPattern.matched(2));
		}, hasNext : function() {
			return _g._pairPattern.match(text);
		}};
	}
	,keywords: function() {
		var _g = this;
		var text = this._configText;
		return { next : function() {
			text = flambe.display._Font.ConfigParser.advance(text,_g._keywordPattern);
			_g._pairText = _g._keywordPattern.matched(2);
			return _g._keywordPattern.matched(1);
		}, hasNext : function() {
			return _g._keywordPattern.match(text);
		}};
	}
	,__class__: flambe.display._Font.ConfigParser
}
flambe.display._Font.ConfigPair = function(key,value) {
	this.key = key;
	this._value = value;
};
$hxClasses["flambe.display._Font.ConfigPair"] = flambe.display._Font.ConfigPair;
flambe.display._Font.ConfigPair.__name__ = ["flambe","display","_Font","ConfigPair"];
flambe.display._Font.ConfigPair.prototype = {
	getString: function() {
		if(this._value.charCodeAt(0) != 34) return null;
		return HxOverrides.substr(this._value,1,this._value.length - 2);
	}
	,getInt: function() {
		return Std.parseInt(this._value);
	}
	,__class__: flambe.display._Font.ConfigPair
}
flambe.display.Graphics = function() { }
$hxClasses["flambe.display.Graphics"] = flambe.display.Graphics;
flambe.display.Graphics.__name__ = ["flambe","display","Graphics"];
flambe.display.Graphics.prototype = {
	__class__: flambe.display.Graphics
}
flambe.display.ImageSprite = function(texture) {
	flambe.display.Sprite.call(this);
	this.texture = texture;
};
$hxClasses["flambe.display.ImageSprite"] = flambe.display.ImageSprite;
flambe.display.ImageSprite.__name__ = ["flambe","display","ImageSprite"];
flambe.display.ImageSprite.__super__ = flambe.display.Sprite;
flambe.display.ImageSprite.prototype = $extend(flambe.display.Sprite.prototype,{
	getNaturalHeight: function() {
		return this.texture.get_height();
	}
	,getNaturalWidth: function() {
		return this.texture.get_width();
	}
	,draw: function(g) {
		g.drawImage(this.texture,0,0);
	}
	,__class__: flambe.display.ImageSprite
});
flambe.display.Orientation = $hxClasses["flambe.display.Orientation"] = { __ename__ : ["flambe","display","Orientation"], __constructs__ : ["Portrait","Landscape"] }
flambe.display.Orientation.Portrait = ["Portrait",0];
flambe.display.Orientation.Portrait.toString = $estr;
flambe.display.Orientation.Portrait.__enum__ = flambe.display.Orientation;
flambe.display.Orientation.Landscape = ["Landscape",1];
flambe.display.Orientation.Landscape.toString = $estr;
flambe.display.Orientation.Landscape.__enum__ = flambe.display.Orientation;
flambe.display.PatternSprite = function(texture,width,height) {
	if(height == null) height = -1;
	if(width == null) width = -1;
	flambe.display.Sprite.call(this);
	this.texture = texture;
	if(width < 0) width = texture.get_width();
	this.width = new flambe.animation.AnimatedFloat(width);
	if(height < 0) height = texture.get_height();
	this.height = new flambe.animation.AnimatedFloat(height);
};
$hxClasses["flambe.display.PatternSprite"] = flambe.display.PatternSprite;
flambe.display.PatternSprite.__name__ = ["flambe","display","PatternSprite"];
flambe.display.PatternSprite.__super__ = flambe.display.Sprite;
flambe.display.PatternSprite.prototype = $extend(flambe.display.Sprite.prototype,{
	onUpdate: function(dt) {
		flambe.display.Sprite.prototype.onUpdate.call(this,dt);
		this.width.update(dt);
		this.height.update(dt);
	}
	,getNaturalHeight: function() {
		return this.height._value;
	}
	,getNaturalWidth: function() {
		return this.width._value;
	}
	,draw: function(g) {
		g.drawPattern(this.texture,0,0,this.width._value,this.height._value);
	}
	,__class__: flambe.display.PatternSprite
});
flambe.display.TextSprite = function(font,text) {
	if(text == null) text = "";
	this._layout = null;
	var _g = this;
	flambe.display.Sprite.call(this);
	this._font = font;
	this._text = text;
	this._align = flambe.display.TextAlign.Left;
	this._flags = this._flags | 64;
	this.wrapWidth = new flambe.animation.AnimatedFloat(0,function(_,_1) {
		_g._flags = _g._flags | 64;
	});
};
$hxClasses["flambe.display.TextSprite"] = flambe.display.TextSprite;
flambe.display.TextSprite.__name__ = ["flambe","display","TextSprite"];
flambe.display.TextSprite.__super__ = flambe.display.Sprite;
flambe.display.TextSprite.prototype = $extend(flambe.display.Sprite.prototype,{
	onUpdate: function(dt) {
		flambe.display.Sprite.prototype.onUpdate.call(this,dt);
		this.wrapWidth.update(dt);
	}
	,updateLayout: function() {
		if((this._flags & 64) != 0) {
			this._flags = this._flags & -65;
			this._layout = this._font.layoutText(this._text,this._align,this.wrapWidth._value);
		}
	}
	,set_align: function(align) {
		if(align != this._align) {
			this._align = align;
			this._flags = this._flags | 64;
		}
		return align;
	}
	,set_font: function(font) {
		if(font != this._font) {
			this._font = font;
			this._flags = this._flags | 64;
		}
		return font;
	}
	,set_text: function(text) {
		if(text != this._text) {
			this._text = text;
			this._flags = this._flags | 64;
		}
		return text;
	}
	,containsLocal: function(localX,localY) {
		this.updateLayout();
		return this._layout.bounds.contains(localX,localY);
	}
	,getNaturalHeight: function() {
		this.updateLayout();
		return this._layout.lines * this._font.size;
	}
	,getNaturalWidth: function() {
		this.updateLayout();
		return this.wrapWidth._value > 0?this.wrapWidth._value:this._layout.bounds.width;
	}
	,draw: function(g) {
		this.updateLayout();
		this._layout.draw(g,this._align);
	}
	,__class__: flambe.display.TextSprite
});
flambe.display.Texture = function() { }
$hxClasses["flambe.display.Texture"] = flambe.display.Texture;
flambe.display.Texture.__name__ = ["flambe","display","Texture"];
flambe.display.Texture.__interfaces__ = [flambe.asset.Asset];
flambe.display.Texture.prototype = {
	__class__: flambe.display.Texture
}
flambe.input = {}
flambe.input.MouseButton = $hxClasses["flambe.input.MouseButton"] = { __ename__ : ["flambe","input","MouseButton"], __constructs__ : ["Left","Middle","Right","Unknown"] }
flambe.input.MouseButton.Left = ["Left",0];
flambe.input.MouseButton.Left.toString = $estr;
flambe.input.MouseButton.Left.__enum__ = flambe.input.MouseButton;
flambe.input.MouseButton.Middle = ["Middle",1];
flambe.input.MouseButton.Middle.toString = $estr;
flambe.input.MouseButton.Middle.__enum__ = flambe.input.MouseButton;
flambe.input.MouseButton.Right = ["Right",2];
flambe.input.MouseButton.Right.toString = $estr;
flambe.input.MouseButton.Right.__enum__ = flambe.input.MouseButton;
flambe.input.MouseButton.Unknown = function(buttonCode) { var $x = ["Unknown",3,buttonCode]; $x.__enum__ = flambe.input.MouseButton; $x.toString = $estr; return $x; }
flambe.input.MouseCursor = $hxClasses["flambe.input.MouseCursor"] = { __ename__ : ["flambe","input","MouseCursor"], __constructs__ : ["Default","Button","None"] }
flambe.input.MouseCursor.Default = ["Default",0];
flambe.input.MouseCursor.Default.toString = $estr;
flambe.input.MouseCursor.Default.__enum__ = flambe.input.MouseCursor;
flambe.input.MouseCursor.Button = ["Button",1];
flambe.input.MouseCursor.Button.toString = $estr;
flambe.input.MouseCursor.Button.__enum__ = flambe.input.MouseCursor;
flambe.input.MouseCursor.None = ["None",2];
flambe.input.MouseCursor.None.toString = $estr;
flambe.input.MouseCursor.None.__enum__ = flambe.input.MouseCursor;
flambe.input.MouseEvent = function() {
	this.init(0,0,0,null);
};
$hxClasses["flambe.input.MouseEvent"] = flambe.input.MouseEvent;
flambe.input.MouseEvent.__name__ = ["flambe","input","MouseEvent"];
flambe.input.MouseEvent.prototype = {
	init: function(id,viewX,viewY,button) {
		this.id = id;
		this.viewX = viewX;
		this.viewY = viewY;
		this.button = button;
	}
	,__class__: flambe.input.MouseEvent
}
flambe.input.EventSource = $hxClasses["flambe.input.EventSource"] = { __ename__ : ["flambe","input","EventSource"], __constructs__ : ["Mouse","Touch"] }
flambe.input.EventSource.Mouse = function(event) { var $x = ["Mouse",0,event]; $x.__enum__ = flambe.input.EventSource; $x.toString = $estr; return $x; }
flambe.input.EventSource.Touch = function(point) { var $x = ["Touch",1,point]; $x.__enum__ = flambe.input.EventSource; $x.toString = $estr; return $x; }
flambe.input.PointerEvent = function() {
	this.init(0,0,0,null,null);
};
$hxClasses["flambe.input.PointerEvent"] = flambe.input.PointerEvent;
flambe.input.PointerEvent.__name__ = ["flambe","input","PointerEvent"];
flambe.input.PointerEvent.prototype = {
	init: function(id,viewX,viewY,hit,source) {
		this.id = id;
		this.viewX = viewX;
		this.viewY = viewY;
		this.hit = hit;
		this.source = source;
		this._stopped = false;
	}
	,__class__: flambe.input.PointerEvent
}
flambe.input.TouchPoint = function(id) {
	this.id = id;
	this._source = flambe.input.EventSource.Touch(this);
};
$hxClasses["flambe.input.TouchPoint"] = flambe.input.TouchPoint;
flambe.input.TouchPoint.__name__ = ["flambe","input","TouchPoint"];
flambe.input.TouchPoint.prototype = {
	init: function(viewX,viewY) {
		this.viewX = viewX;
		this.viewY = viewY;
	}
	,__class__: flambe.input.TouchPoint
}
flambe.math.FMath = function() { }
$hxClasses["flambe.math.FMath"] = flambe.math.FMath;
flambe.math.FMath.__name__ = ["flambe","math","FMath"];
flambe.math.FMath.max = function(a,b) {
	return a > b?a:b;
}
flambe.math.FMath.min = function(a,b) {
	return a < b?a:b;
}
flambe.math.FMath.clamp = function(value,min,max) {
	return value < min?min:value > max?max:value;
}
flambe.math.Matrix = function() {
	this.identity();
};
$hxClasses["flambe.math.Matrix"] = flambe.math.Matrix;
flambe.math.Matrix.__name__ = ["flambe","math","Matrix"];
flambe.math.Matrix.multiply = function(lhs,rhs,result) {
	if(result == null) result = new flambe.math.Matrix();
	var a = lhs.m00 * rhs.m00 + lhs.m01 * rhs.m10;
	var b = lhs.m00 * rhs.m01 + lhs.m01 * rhs.m11;
	var c = lhs.m00 * rhs.m02 + lhs.m01 * rhs.m12 + lhs.m02;
	result.m00 = a;
	result.m01 = b;
	result.m02 = c;
	a = lhs.m10 * rhs.m00 + lhs.m11 * rhs.m10;
	b = lhs.m10 * rhs.m01 + lhs.m11 * rhs.m11;
	c = lhs.m10 * rhs.m02 + lhs.m11 * rhs.m12 + lhs.m12;
	result.m10 = a;
	result.m11 = b;
	result.m12 = c;
	return result;
}
flambe.math.Matrix.prototype = {
	clone: function(result) {
		if(result == null) result = new flambe.math.Matrix();
		result.set(this.m00,this.m10,this.m01,this.m11,this.m02,this.m12);
		return result;
	}
	,inverseTransform: function(x,y,result) {
		var det = this.determinant();
		if(det == 0) return false;
		x -= this.m02;
		y -= this.m12;
		result.x = (x * this.m11 - y * this.m01) / det;
		result.y = (y * this.m00 - x * this.m10) / det;
		return true;
	}
	,determinant: function() {
		return this.m00 * this.m11 - this.m01 * this.m10;
	}
	,transformArray: function(points,length,result) {
		var ii = 0;
		while(ii < length) {
			var x = points[ii], y = points[ii + 1];
			result[ii++] = x * this.m00 + y * this.m01 + this.m02;
			result[ii++] = x * this.m10 + y * this.m11 + this.m12;
		}
	}
	,transform: function(x,y,result) {
		if(result == null) result = new flambe.math.Point();
		result.x = x * this.m00 + y * this.m01 + this.m02;
		result.y = x * this.m10 + y * this.m11 + this.m12;
		return result;
	}
	,invert: function() {
		var det = this.determinant();
		if(det == 0) return false;
		this.set(this.m11 / det,-this.m01 / det,-this.m10 / det,this.m00 / det,(this.m01 * this.m12 - this.m11 * this.m02) / det,(this.m10 * this.m02 - this.m00 * this.m12) / det);
		return true;
	}
	,translate: function(x,y) {
		this.m02 += this.m00 * x + this.m01 * y;
		this.m12 += this.m11 * y + this.m10 * x;
	}
	,compose: function(x,y,scaleX,scaleY,rotation) {
		var sin = Math.sin(rotation);
		var cos = Math.cos(rotation);
		this.set(cos * scaleX,sin * scaleX,-sin * scaleY,cos * scaleY,x,y);
	}
	,identity: function() {
		this.set(1,0,0,1,0,0);
	}
	,set: function(m00,m10,m01,m11,m02,m12) {
		this.m00 = m00;
		this.m01 = m01;
		this.m02 = m02;
		this.m10 = m10;
		this.m11 = m11;
		this.m12 = m12;
	}
	,__class__: flambe.math.Matrix
}
flambe.math.Rectangle = function(x,y,width,height) {
	if(height == null) height = 0;
	if(width == null) width = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.set(x,y,width,height);
};
$hxClasses["flambe.math.Rectangle"] = flambe.math.Rectangle;
flambe.math.Rectangle.__name__ = ["flambe","math","Rectangle"];
flambe.math.Rectangle.prototype = {
	equals: function(other) {
		return this.x == other.x && this.y == other.y && this.width == other.width && this.height == other.height;
	}
	,clone: function(result) {
		if(result == null) result = new flambe.math.Rectangle();
		result.set(this.x,this.y,this.width,this.height);
		return result;
	}
	,contains: function(x,y) {
		x -= this.x;
		if(this.width >= 0) {
			if(x < 0 || x > this.width) return false;
		} else if(x > 0 || x < this.width) return false;
		y -= this.y;
		if(this.height >= 0) {
			if(y < 0 || y > this.height) return false;
		} else if(y > 0 || y < this.height) return false;
		return true;
	}
	,set: function(x,y,width,height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
	,__class__: flambe.math.Rectangle
}
flambe.platform.BasicAsset = function() {
	this._disposed = false;
};
$hxClasses["flambe.platform.BasicAsset"] = flambe.platform.BasicAsset;
flambe.platform.BasicAsset.__name__ = ["flambe","platform","BasicAsset"];
flambe.platform.BasicAsset.__interfaces__ = [flambe.asset.Asset];
flambe.platform.BasicAsset.prototype = {
	onDisposed: function() {
		null;
	}
	,dispose: function() {
		if(!this._disposed) {
			this._disposed = true;
			this.onDisposed();
		}
	}
	,__class__: flambe.platform.BasicAsset
}
flambe.platform.BasicAssetPackLoader = function(platform,manifest) {
	var _g = this;
	this.manifest = manifest;
	this._platform = platform;
	this.promise = new flambe.util.Promise();
	this._bytesLoaded = new haxe.ds.StringMap();
	this._pack = new flambe.platform._BasicAssetPackLoader.BasicAssetPack(manifest,this);
	var entries = Lambda.array(manifest);
	if(entries.length == 0) this.handleSuccess(); else {
		var groups = new haxe.ds.StringMap();
		var _g1 = 0;
		while(_g1 < entries.length) {
			var entry = entries[_g1];
			++_g1;
			var group = groups.get(entry.name);
			if(group == null) {
				group = [];
				groups.set(entry.name,group);
			}
			group.push(entry);
		}
		this._assetsRemaining = Lambda.count(groups);
		var $it0 = (((function() {
			return function(_e) {
				return (function() {
					return function() {
						return _e.iterator();
					};
				})();
			};
		})())(groups))();
		while( $it0.hasNext() ) {
			var group = $it0.next();
			var group1 = [group];
			this.pickBestEntry(group1[0],(function(group1) {
				return function(bestEntry) {
					if(bestEntry != null) {
						var url = manifest.getFullURL(bestEntry);
						try {
							_g.loadEntry(url,bestEntry);
						} catch( error ) {
							_g.handleError(bestEntry,"Unexpected error: " + Std.string(error));
						}
						var _g1 = _g.promise;
						_g1.set_total(_g1._total + bestEntry.bytes);
					} else {
						var badEntry = group1[0][0];
						if(flambe.platform.BasicAssetPackLoader.isAudio(badEntry.format)) _g.handleLoad(badEntry,flambe.platform.DummySound.getInstance()); else _g.handleError(badEntry,"Could not find a supported format to load");
					}
				};
			})(group1));
		}
	}
};
$hxClasses["flambe.platform.BasicAssetPackLoader"] = flambe.platform.BasicAssetPackLoader;
flambe.platform.BasicAssetPackLoader.__name__ = ["flambe","platform","BasicAssetPackLoader"];
flambe.platform.BasicAssetPackLoader.isAudio = function(format) {
	switch( (format)[1] ) {
	case 8:
	case 9:
	case 10:
	case 11:
	case 12:
		return true;
	default:
		return false;
	}
}
flambe.platform.BasicAssetPackLoader.prototype = {
	handleTextureError: function(entry) {
		this.handleError(entry,"Failed to create texture. Is the GPU context unavailable?");
	}
	,handleError: function(entry,message) {
		this.promise.error.emit(flambe.util.Strings.withFields(message,["url",entry.url]));
	}
	,handleSuccess: function() {
		this.promise.set_result(this._pack);
	}
	,handleProgress: function(entry,bytesLoaded) {
		this._bytesLoaded.set(entry.name,bytesLoaded);
		var bytesTotal = 0;
		var $it0 = ((function(_e) {
			return function() {
				return _e.iterator();
			};
		})(this._bytesLoaded))();
		while( $it0.hasNext() ) {
			var bytes = $it0.next();
			bytesTotal += bytes;
		}
		this.promise.set_progress(bytesTotal);
	}
	,handleLoad: function(entry,asset) {
		if(this._pack.disposed) return;
		this.handleProgress(entry,entry.bytes);
		var map;
		switch( (entry.format)[1] ) {
		case 0:
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
		case 7:
			map = this._pack.textures;
			break;
		case 8:
		case 9:
		case 10:
		case 11:
		case 12:
			map = this._pack.sounds;
			break;
		case 13:
			map = this._pack.files;
			break;
		}
		map.set(entry.name,asset);
		this._assetsRemaining -= 1;
		if(this._assetsRemaining == 0) this.handleSuccess();
	}
	,getAssetFormats: function(fn) {
		null;
	}
	,loadEntry: function(url,entry) {
		null;
	}
	,pickBestEntry: function(entries,fn) {
		var onFormatsAvailable = function(formats) {
			var _g = 0;
			while(_g < formats.length) {
				var format = formats[_g];
				++_g;
				var _g1 = 0;
				while(_g1 < entries.length) {
					var entry = entries[_g1];
					++_g1;
					if(entry.format == format) {
						fn(entry);
						return;
					}
				}
			}
			fn(null);
		};
		this.getAssetFormats(onFormatsAvailable);
	}
	,onDisposed: function() {
	}
	,__class__: flambe.platform.BasicAssetPackLoader
}
flambe.platform._BasicAssetPackLoader = {}
flambe.platform._BasicAssetPackLoader.BasicAssetPack = function(manifest,loader) {
	this.disposed = false;
	this._manifest = manifest;
	this.loader = loader;
	this.textures = new haxe.ds.StringMap();
	this.sounds = new haxe.ds.StringMap();
	this.files = new haxe.ds.StringMap();
};
$hxClasses["flambe.platform._BasicAssetPackLoader.BasicAssetPack"] = flambe.platform._BasicAssetPackLoader.BasicAssetPack;
flambe.platform._BasicAssetPackLoader.BasicAssetPack.__name__ = ["flambe","platform","_BasicAssetPackLoader","BasicAssetPack"];
flambe.platform._BasicAssetPackLoader.BasicAssetPack.__interfaces__ = [flambe.asset.AssetPack];
flambe.platform._BasicAssetPackLoader.BasicAssetPack.prototype = {
	dispose: function() {
		if(!this.disposed) {
			this.disposed = true;
			var $it0 = ((function(_e) {
				return function() {
					return _e.iterator();
				};
			})(this.textures))();
			while( $it0.hasNext() ) {
				var texture = $it0.next();
				texture.dispose();
			}
			this.textures = null;
			var $it1 = ((function(_e1) {
				return function() {
					return _e1.iterator();
				};
			})(this.sounds))();
			while( $it1.hasNext() ) {
				var sound = $it1.next();
				sound.dispose();
			}
			this.sounds = null;
			var $it2 = ((function(_e2) {
				return function() {
					return _e2.iterator();
				};
			})(this.files))();
			while( $it2.hasNext() ) {
				var file = $it2.next();
				file.dispose();
			}
			this.files = null;
			this.loader.onDisposed();
		}
	}
	,getFile: function(name,required) {
		if(required == null) required = true;
		var file = this.files.get(name);
		if(file == null && required) throw flambe.util.Strings.withFields("Missing file",["name",name]);
		return file;
	}
	,getSound: function(name,required) {
		if(required == null) required = true;
		var sound = this.sounds.get(name);
		if(sound == null && required) throw flambe.util.Strings.withFields("Missing sound",["name",name]);
		return sound;
	}
	,getTexture: function(name,required) {
		if(required == null) required = true;
		var texture = this.textures.get(name);
		if(texture == null && required) throw flambe.util.Strings.withFields("Missing texture",["name",name]);
		return texture;
	}
	,__class__: flambe.platform._BasicAssetPackLoader.BasicAssetPack
}
flambe.platform.BasicFile = function(content) {
	flambe.platform.BasicAsset.call(this);
	this._content = content;
};
$hxClasses["flambe.platform.BasicFile"] = flambe.platform.BasicFile;
flambe.platform.BasicFile.__name__ = ["flambe","platform","BasicFile"];
flambe.platform.BasicFile.__interfaces__ = [flambe.asset.File];
flambe.platform.BasicFile.__super__ = flambe.platform.BasicAsset;
flambe.platform.BasicFile.prototype = $extend(flambe.platform.BasicAsset.prototype,{
	onDisposed: function() {
		this._content = null;
	}
	,toString: function() {
		return this._content;
	}
	,__class__: flambe.platform.BasicFile
});
flambe.subsystem = {}
flambe.subsystem.MouseSystem = function() { }
$hxClasses["flambe.subsystem.MouseSystem"] = flambe.subsystem.MouseSystem;
flambe.subsystem.MouseSystem.__name__ = ["flambe","subsystem","MouseSystem"];
flambe.platform.BasicMouse = function(pointer) {
	this._pointer = pointer;
	this._source = flambe.input.EventSource.Mouse(flambe.platform.BasicMouse._sharedEvent);
	this.down = new flambe.util.Signal1();
	this.move = new flambe.util.Signal1();
	this.up = new flambe.util.Signal1();
	this.scroll = new flambe.util.Signal1();
	this._x = 0;
	this._y = 0;
	this._cursor = flambe.input.MouseCursor.Default;
	this._buttonStates = new haxe.ds.IntMap();
};
$hxClasses["flambe.platform.BasicMouse"] = flambe.platform.BasicMouse;
flambe.platform.BasicMouse.__name__ = ["flambe","platform","BasicMouse"];
flambe.platform.BasicMouse.__interfaces__ = [flambe.subsystem.MouseSystem];
flambe.platform.BasicMouse.prototype = {
	prepare: function(viewX,viewY,button) {
		this._x = viewX;
		this._y = viewY;
		flambe.platform.BasicMouse._sharedEvent.init(flambe.platform.BasicMouse._sharedEvent.id + 1,viewX,viewY,button);
	}
	,submitScroll: function(viewX,viewY,velocity) {
		this._x = viewX;
		this._y = viewY;
		if(!(this.scroll._head != null)) return false;
		this.scroll.emit(velocity);
		return true;
	}
	,submitUp: function(viewX,viewY,buttonCode) {
		if(this._buttonStates.exists(buttonCode)) {
			this._buttonStates.remove(buttonCode);
			this.prepare(viewX,viewY,flambe.platform.MouseCodes.toButton(buttonCode));
			this._pointer.submitUp(viewX,viewY,this._source);
			this.up.emit(flambe.platform.BasicMouse._sharedEvent);
		}
	}
	,submitMove: function(viewX,viewY) {
		this.prepare(viewX,viewY,null);
		this._pointer.submitMove(viewX,viewY,this._source);
		this.move.emit(flambe.platform.BasicMouse._sharedEvent);
	}
	,submitDown: function(viewX,viewY,buttonCode) {
		if(!this._buttonStates.exists(buttonCode)) {
			this._buttonStates.set(buttonCode,true);
			this.prepare(viewX,viewY,flambe.platform.MouseCodes.toButton(buttonCode));
			this._pointer.submitDown(viewX,viewY,this._source);
			this.down.emit(flambe.platform.BasicMouse._sharedEvent);
		}
	}
	,__class__: flambe.platform.BasicMouse
}
flambe.subsystem.PointerSystem = function() { }
$hxClasses["flambe.subsystem.PointerSystem"] = flambe.subsystem.PointerSystem;
flambe.subsystem.PointerSystem.__name__ = ["flambe","subsystem","PointerSystem"];
flambe.subsystem.PointerSystem.prototype = {
	__class__: flambe.subsystem.PointerSystem
}
flambe.platform.BasicPointer = function(x,y,isDown) {
	if(isDown == null) isDown = false;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.down = new flambe.util.Signal1();
	this.move = new flambe.util.Signal1();
	this.up = new flambe.util.Signal1();
	this._x = x;
	this._y = y;
	this._isDown = isDown;
};
$hxClasses["flambe.platform.BasicPointer"] = flambe.platform.BasicPointer;
flambe.platform.BasicPointer.__name__ = ["flambe","platform","BasicPointer"];
flambe.platform.BasicPointer.__interfaces__ = [flambe.subsystem.PointerSystem];
flambe.platform.BasicPointer.prototype = {
	prepare: function(viewX,viewY,hit,source) {
		this._x = viewX;
		this._y = viewY;
		flambe.platform.BasicPointer._sharedEvent.init(flambe.platform.BasicPointer._sharedEvent.id + 1,viewX,viewY,hit,source);
	}
	,submitUp: function(viewX,viewY,source) {
		if(!this._isDown) return;
		this._isDown = false;
		var chain = [];
		var hit = flambe.display.Sprite.hitTest(flambe.System.root,viewX,viewY);
		if(hit != null) {
			var entity = hit.owner;
			do {
				var sprite = entity._compMap.Sprite_5;
				if(sprite != null) chain.push(sprite);
				entity = entity.parent;
			} while(entity != null);
		}
		this.prepare(viewX,viewY,hit,source);
		var _g = 0;
		while(_g < chain.length) {
			var sprite = chain[_g];
			++_g;
			var signal = sprite._pointerUp;
			if(signal != null) {
				signal.emit(flambe.platform.BasicPointer._sharedEvent);
				if(flambe.platform.BasicPointer._sharedEvent._stopped) return;
			}
		}
		this.up.emit(flambe.platform.BasicPointer._sharedEvent);
	}
	,submitMove: function(viewX,viewY,source) {
		var chain = [];
		var hit = flambe.display.Sprite.hitTest(flambe.System.root,viewX,viewY);
		if(hit != null) {
			var entity = hit.owner;
			do {
				var sprite = entity._compMap.Sprite_5;
				if(sprite != null) chain.push(sprite);
				entity = entity.parent;
			} while(entity != null);
		}
		this.prepare(viewX,viewY,hit,source);
		var _g = 0;
		while(_g < chain.length) {
			var sprite = chain[_g];
			++_g;
			var signal = sprite._pointerMove;
			if(signal != null) {
				signal.emit(flambe.platform.BasicPointer._sharedEvent);
				if(flambe.platform.BasicPointer._sharedEvent._stopped) return;
			}
		}
		this.move.emit(flambe.platform.BasicPointer._sharedEvent);
	}
	,submitDown: function(viewX,viewY,source) {
		if(this._isDown) return;
		this._isDown = true;
		var chain = [];
		var hit = flambe.display.Sprite.hitTest(flambe.System.root,viewX,viewY);
		if(hit != null) {
			var entity = hit.owner;
			do {
				var sprite = entity._compMap.Sprite_5;
				if(sprite != null) chain.push(sprite);
				entity = entity.parent;
			} while(entity != null);
		}
		this.prepare(viewX,viewY,hit,source);
		var _g = 0;
		while(_g < chain.length) {
			var sprite = chain[_g];
			++_g;
			var signal = sprite._pointerDown;
			if(signal != null) {
				signal.emit(flambe.platform.BasicPointer._sharedEvent);
				if(flambe.platform.BasicPointer._sharedEvent._stopped) return;
			}
		}
		this.down.emit(flambe.platform.BasicPointer._sharedEvent);
	}
	,__class__: flambe.platform.BasicPointer
}
flambe.subsystem.TouchSystem = function() { }
$hxClasses["flambe.subsystem.TouchSystem"] = flambe.subsystem.TouchSystem;
flambe.subsystem.TouchSystem.__name__ = ["flambe","subsystem","TouchSystem"];
flambe.platform.BasicTouch = function(pointer,maxPoints) {
	if(maxPoints == null) maxPoints = 4;
	this._pointer = pointer;
	this._maxPoints = maxPoints;
	this._pointMap = new haxe.ds.IntMap();
	this._points = [];
	this.down = new flambe.util.Signal1();
	this.move = new flambe.util.Signal1();
	this.up = new flambe.util.Signal1();
};
$hxClasses["flambe.platform.BasicTouch"] = flambe.platform.BasicTouch;
flambe.platform.BasicTouch.__name__ = ["flambe","platform","BasicTouch"];
flambe.platform.BasicTouch.__interfaces__ = [flambe.subsystem.TouchSystem];
flambe.platform.BasicTouch.prototype = {
	submitUp: function(id,viewX,viewY) {
		var point = this._pointMap.get(id);
		if(point != null) {
			point.init(viewX,viewY);
			this._pointMap.remove(id);
			HxOverrides.remove(this._points,point);
			if(this._pointerTouch == point) {
				this._pointerTouch = null;
				this._pointer.submitUp(viewX,viewY,point._source);
			}
			this.up.emit(point);
		}
	}
	,submitMove: function(id,viewX,viewY) {
		var point = this._pointMap.get(id);
		if(point != null) {
			point.init(viewX,viewY);
			if(this._pointerTouch == point) this._pointer.submitMove(viewX,viewY,point._source);
			this.move.emit(point);
		}
	}
	,submitDown: function(id,viewX,viewY) {
		if(!this._pointMap.exists(id)) {
			var point = new flambe.input.TouchPoint(id);
			point.init(viewX,viewY);
			this._pointMap.set(id,point);
			this._points.push(point);
			if(this._pointerTouch == null) {
				this._pointerTouch = point;
				this._pointer.submitDown(viewX,viewY,point._source);
			}
			this.down.emit(point);
		}
	}
	,__class__: flambe.platform.BasicTouch
}
flambe.sound = {}
flambe.sound.Sound = function() { }
$hxClasses["flambe.sound.Sound"] = flambe.sound.Sound;
flambe.sound.Sound.__name__ = ["flambe","sound","Sound"];
flambe.sound.Sound.__interfaces__ = [flambe.asset.Asset];
flambe.sound.Sound.prototype = {
	__class__: flambe.sound.Sound
}
flambe.platform.DummySound = function() {
	flambe.platform.BasicAsset.call(this);
	this._playback = new flambe.platform.DummyPlayback(this);
};
$hxClasses["flambe.platform.DummySound"] = flambe.platform.DummySound;
flambe.platform.DummySound.__name__ = ["flambe","platform","DummySound"];
flambe.platform.DummySound.__interfaces__ = [flambe.sound.Sound];
flambe.platform.DummySound.getInstance = function() {
	if(flambe.platform.DummySound._instance == null) flambe.platform.DummySound._instance = new flambe.platform.DummySound();
	return flambe.platform.DummySound._instance;
}
flambe.platform.DummySound.__super__ = flambe.platform.BasicAsset;
flambe.platform.DummySound.prototype = $extend(flambe.platform.BasicAsset.prototype,{
	loop: function(volume) {
		if(volume == null) volume = 1.0;
		return this._playback;
	}
	,play: function(volume) {
		if(volume == null) volume = 1.0;
		return this._playback;
	}
	,__class__: flambe.platform.DummySound
});
flambe.sound.Playback = function() { }
$hxClasses["flambe.sound.Playback"] = flambe.sound.Playback;
flambe.sound.Playback.__name__ = ["flambe","sound","Playback"];
flambe.sound.Playback.__interfaces__ = [flambe.util.Disposable];
flambe.sound.Playback.prototype = {
	__class__: flambe.sound.Playback
}
flambe.platform.DummyPlayback = function(sound) {
	this._sound = sound;
	this.volume = new flambe.animation.AnimatedFloat(0);
};
$hxClasses["flambe.platform.DummyPlayback"] = flambe.platform.DummyPlayback;
flambe.platform.DummyPlayback.__name__ = ["flambe","platform","DummyPlayback"];
flambe.platform.DummyPlayback.__interfaces__ = [flambe.sound.Playback];
flambe.platform.DummyPlayback.prototype = {
	dispose: function() {
	}
	,set_paused: function(paused) {
		return true;
	}
	,__class__: flambe.platform.DummyPlayback
}
flambe.subsystem.StorageSystem = function() { }
$hxClasses["flambe.subsystem.StorageSystem"] = flambe.subsystem.StorageSystem;
flambe.subsystem.StorageSystem.__name__ = ["flambe","subsystem","StorageSystem"];
flambe.subsystem.StorageSystem.prototype = {
	__class__: flambe.subsystem.StorageSystem
}
flambe.platform.DummyStorage = function() {
	this.clear();
};
$hxClasses["flambe.platform.DummyStorage"] = flambe.platform.DummyStorage;
flambe.platform.DummyStorage.__name__ = ["flambe","platform","DummyStorage"];
flambe.platform.DummyStorage.__interfaces__ = [flambe.subsystem.StorageSystem];
flambe.platform.DummyStorage.prototype = {
	clear: function() {
		this._hash = new haxe.ds.StringMap();
	}
	,get: function(key,defaultValue) {
		return this._hash.exists(key)?this._hash.get(key):defaultValue;
	}
	,set: function(key,value) {
		var value1 = value;
		this._hash.set(key,value1);
		return true;
	}
	,__class__: flambe.platform.DummyStorage
}
flambe.platform.DummyTouch = function() {
	this.down = new flambe.util.Signal1();
	this.move = new flambe.util.Signal1();
	this.up = new flambe.util.Signal1();
};
$hxClasses["flambe.platform.DummyTouch"] = flambe.platform.DummyTouch;
flambe.platform.DummyTouch.__name__ = ["flambe","platform","DummyTouch"];
flambe.platform.DummyTouch.__interfaces__ = [flambe.subsystem.TouchSystem];
flambe.platform.DummyTouch.prototype = {
	__class__: flambe.platform.DummyTouch
}
flambe.platform.EventGroup = function() {
	this._entries = [];
};
$hxClasses["flambe.platform.EventGroup"] = flambe.platform.EventGroup;
flambe.platform.EventGroup.__name__ = ["flambe","platform","EventGroup"];
flambe.platform.EventGroup.__interfaces__ = [flambe.util.Disposable];
flambe.platform.EventGroup.prototype = {
	dispose: function() {
		var _g = 0, _g1 = this._entries;
		while(_g < _g1.length) {
			var entry = _g1[_g];
			++_g;
			entry.dispatcher.removeEventListener(entry.type,entry.listener,false);
		}
		this._entries = [];
	}
	,addDisposingListener: function(dispatcher,type,listener) {
		var _g = this;
		this.addListener(dispatcher,type,function(event) {
			_g.dispose();
			listener(event);
		});
	}
	,addListener: function(dispatcher,type,listener) {
		dispatcher.addEventListener(type,listener,false);
		this._entries.push(new flambe.platform._EventGroup.Entry(dispatcher,type,listener));
	}
	,__class__: flambe.platform.EventGroup
}
flambe.platform._EventGroup = {}
flambe.platform._EventGroup.Entry = function(dispatcher,type,listener) {
	this.dispatcher = dispatcher;
	this.type = type;
	this.listener = listener;
};
$hxClasses["flambe.platform._EventGroup.Entry"] = flambe.platform._EventGroup.Entry;
flambe.platform._EventGroup.Entry.__name__ = ["flambe","platform","_EventGroup","Entry"];
flambe.platform._EventGroup.Entry.prototype = {
	__class__: flambe.platform._EventGroup.Entry
}
flambe.platform.InternalGraphics = function() { }
$hxClasses["flambe.platform.InternalGraphics"] = flambe.platform.InternalGraphics;
flambe.platform.InternalGraphics.__name__ = ["flambe","platform","InternalGraphics"];
flambe.platform.InternalGraphics.__interfaces__ = [flambe.display.Graphics];
flambe.platform.InternalGraphics.prototype = {
	__class__: flambe.platform.InternalGraphics
}
flambe.platform.MainLoop = function() {
	this._tickables = [];
};
$hxClasses["flambe.platform.MainLoop"] = flambe.platform.MainLoop;
flambe.platform.MainLoop.__name__ = ["flambe","platform","MainLoop"];
flambe.platform.MainLoop.updateEntity = function(entity,dt) {
	var speed = entity._compMap.SpeedAdjuster_21;
	if(speed != null) {
		speed._realDt = dt;
		dt *= speed.scale._value;
		if(dt <= 0) {
			speed.onUpdate(dt);
			return;
		}
	}
	var p = entity.firstComponent;
	while(p != null) {
		var next = p.next;
		p.onUpdate(dt);
		p = next;
	}
	var p1 = entity.firstChild;
	while(p1 != null) {
		var next = p1.next;
		flambe.platform.MainLoop.updateEntity(p1,dt);
		p1 = next;
	}
}
flambe.platform.MainLoop.prototype = {
	addTickable: function(t) {
		this._tickables.push(t);
	}
	,render: function(renderer) {
		var graphics = renderer.graphics;
		if(graphics != null) {
			renderer.willRender();
			flambe.display.Sprite.render(flambe.System.root,graphics);
			renderer.didRender();
		}
	}
	,update: function(dt) {
		if(dt <= 0) return;
		if(dt > 1) dt = 1;
		var ii = 0;
		while(ii < this._tickables.length) {
			var t = this._tickables[ii];
			if(t == null || t.update(dt)) this._tickables.splice(ii,1); else ++ii;
		}
		flambe.System.volume.update(dt);
		flambe.platform.MainLoop.updateEntity(flambe.System.root,dt);
	}
	,__class__: flambe.platform.MainLoop
}
flambe.platform.MouseCodes = function() { }
$hxClasses["flambe.platform.MouseCodes"] = flambe.platform.MouseCodes;
flambe.platform.MouseCodes.__name__ = ["flambe","platform","MouseCodes"];
flambe.platform.MouseCodes.toButton = function(buttonCode) {
	switch(buttonCode) {
	case 0:
		return flambe.input.MouseButton.Left;
	case 1:
		return flambe.input.MouseButton.Middle;
	case 2:
		return flambe.input.MouseButton.Right;
	}
	return flambe.input.MouseButton.Unknown(buttonCode);
}
flambe.platform.Renderer = function() { }
$hxClasses["flambe.platform.Renderer"] = flambe.platform.Renderer;
flambe.platform.Renderer.__name__ = ["flambe","platform","Renderer"];
flambe.platform.Renderer.prototype = {
	__class__: flambe.platform.Renderer
}
flambe.platform.Tickable = function() { }
$hxClasses["flambe.platform.Tickable"] = flambe.platform.Tickable;
flambe.platform.Tickable.__name__ = ["flambe","platform","Tickable"];
flambe.platform.Tickable.prototype = {
	__class__: flambe.platform.Tickable
}
flambe.platform.html.CanvasGraphics = function(canvas) {
	this._firstDraw = false;
	this._canvasCtx = canvas.getContext("2d");
};
$hxClasses["flambe.platform.html.CanvasGraphics"] = flambe.platform.html.CanvasGraphics;
flambe.platform.html.CanvasGraphics.__name__ = ["flambe","platform","html","CanvasGraphics"];
flambe.platform.html.CanvasGraphics.__interfaces__ = [flambe.platform.InternalGraphics];
flambe.platform.html.CanvasGraphics.prototype = {
	onResize: function(width,height) {
	}
	,didRender: function() {
	}
	,willRender: function() {
		this._firstDraw = true;
	}
	,applyScissor: function(x,y,width,height) {
		this._canvasCtx.beginPath();
		this._canvasCtx.rect(x | 0,y | 0,width | 0,height | 0);
		this._canvasCtx.clip();
	}
	,setBlendMode: function(blendMode) {
		var op;
		switch( (blendMode)[1] ) {
		case 0:
			op = "source-over";
			break;
		case 1:
			op = "lighter";
			break;
		case 2:
			op = "destination-in";
			break;
		case 3:
			op = "copy";
			break;
		}
		this._canvasCtx.globalCompositeOperation = op;
	}
	,multiplyAlpha: function(factor) {
		this._canvasCtx.globalAlpha *= factor;
	}
	,fillRect: function(color,x,y,width,height) {
		if(this._firstDraw) {
			this._firstDraw = false;
			this._canvasCtx.globalCompositeOperation = "copy";
			this.fillRect(color,x,y,width,height);
			this._canvasCtx.globalCompositeOperation = "source-over";
			return;
		}
		var hex = (16777215 & color).toString(16);
		while(hex.length < 6) hex = "0" + Std.string(hex);
		this._canvasCtx.fillStyle = "#" + Std.string(hex);
		this._canvasCtx.fillRect(x | 0,y | 0,width | 0,height | 0);
	}
	,drawPattern: function(texture,x,y,width,height) {
		if(this._firstDraw) {
			this._firstDraw = false;
			this._canvasCtx.globalCompositeOperation = "copy";
			this.drawPattern(texture,x,y,width,height);
			this._canvasCtx.globalCompositeOperation = "source-over";
			return;
		}
		var texture1 = texture;
		if(texture1.pattern == null) texture1.pattern = this._canvasCtx.createPattern(texture1.image,"repeat");
		this._canvasCtx.fillStyle = texture1.pattern;
		this._canvasCtx.fillRect(x | 0,y | 0,width | 0,height | 0);
	}
	,drawSubImage: function(texture,destX,destY,sourceX,sourceY,sourceW,sourceH) {
		if(this._firstDraw) {
			this._firstDraw = false;
			this._canvasCtx.globalCompositeOperation = "copy";
			this.drawSubImage(texture,destX,destY,sourceX,sourceY,sourceW,sourceH);
			this._canvasCtx.globalCompositeOperation = "source-over";
			return;
		}
		var texture1 = texture;
		this._canvasCtx.drawImage(texture1.image,sourceX | 0,sourceY | 0,sourceW | 0,sourceH | 0,destX | 0,destY | 0,sourceW | 0,sourceH | 0);
	}
	,drawImage: function(texture,x,y) {
		if(this._firstDraw) {
			this._firstDraw = false;
			this._canvasCtx.globalCompositeOperation = "copy";
			this.drawImage(texture,x,y);
			this._canvasCtx.globalCompositeOperation = "source-over";
			return;
		}
		var texture1 = texture;
		this._canvasCtx.drawImage(texture1.image,x | 0,y | 0);
	}
	,restore: function() {
		this._canvasCtx.restore();
	}
	,transform: function(m00,m10,m01,m11,m02,m12) {
		this._canvasCtx.transform(m00,m10,m01,m11,m02,m12);
	}
	,save: function() {
		this._canvasCtx.save();
	}
	,__class__: flambe.platform.html.CanvasGraphics
}
flambe.platform.html.CanvasRenderer = function(canvas) {
	this.graphics = new flambe.platform.html.CanvasGraphics(canvas);
	flambe.System.hasGPU.set__(true);
};
$hxClasses["flambe.platform.html.CanvasRenderer"] = flambe.platform.html.CanvasRenderer;
flambe.platform.html.CanvasRenderer.__name__ = ["flambe","platform","html","CanvasRenderer"];
flambe.platform.html.CanvasRenderer.__interfaces__ = [flambe.platform.Renderer];
flambe.platform.html.CanvasRenderer.prototype = {
	didRender: function() {
		this.graphics.didRender();
	}
	,willRender: function() {
		this.graphics.willRender();
	}
	,createCompressedTexture: function(format,data) {
		return null;
	}
	,getCompressedTextureFormats: function() {
		return [];
	}
	,createTexture: function(image) {
		return new flambe.platform.html.CanvasTexture(flambe.platform.html.CanvasRenderer.CANVAS_TEXTURES?flambe.platform.html.HtmlUtil.createCanvas(image):image);
	}
	,__class__: flambe.platform.html.CanvasRenderer
}
flambe.platform.html.CanvasTexture = function(image) {
	this._graphics = null;
	this.pattern = null;
	flambe.platform.BasicAsset.call(this);
	this.image = image;
};
$hxClasses["flambe.platform.html.CanvasTexture"] = flambe.platform.html.CanvasTexture;
flambe.platform.html.CanvasTexture.__name__ = ["flambe","platform","html","CanvasTexture"];
flambe.platform.html.CanvasTexture.__interfaces__ = [flambe.display.Texture];
flambe.platform.html.CanvasTexture.__super__ = flambe.platform.BasicAsset;
flambe.platform.html.CanvasTexture.prototype = $extend(flambe.platform.BasicAsset.prototype,{
	onDisposed: function() {
		this.image = null;
		this.pattern = null;
		this._graphics = null;
	}
	,get_height: function() {
		return this.image.height;
	}
	,get_width: function() {
		return this.image.width;
	}
	,__class__: flambe.platform.html.CanvasTexture
});
flambe.platform.html.HtmlAssetPackLoader = function(platform,manifest) {
	flambe.platform.BasicAssetPackLoader.call(this,platform,manifest);
};
$hxClasses["flambe.platform.html.HtmlAssetPackLoader"] = flambe.platform.html.HtmlAssetPackLoader;
flambe.platform.html.HtmlAssetPackLoader.__name__ = ["flambe","platform","html","HtmlAssetPackLoader"];
flambe.platform.html.HtmlAssetPackLoader.detectImageFormats = function(fn) {
	var formats = [flambe.asset.AssetFormat.PNG,flambe.asset.AssetFormat.JPG,flambe.asset.AssetFormat.GIF];
	var formatTests = 2;
	var checkRemaining = function() {
		--formatTests;
		if(formatTests == 0) fn(formats);
	};
	var webp = js.Browser.document.createElement("img");
	webp.onload = webp.onerror = function(_) {
		if(webp.width == 1) formats.unshift(flambe.asset.AssetFormat.WEBP);
		checkRemaining();
	};
	webp.src = "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==";
	var jxr = js.Browser.document.createElement("img");
	jxr.onload = jxr.onerror = function(_) {
		if(jxr.width == 1) formats.unshift(flambe.asset.AssetFormat.JXR);
		checkRemaining();
	};
	jxr.src = "data:image/vnd.ms-photo;base64,SUm8AQgAAAAFAAG8AQAQAAAASgAAAIC8BAABAAAAAQAAAIG8BAABAAAAAQAAAMC8BAABAAAAWgAAAMG8BAABAAAAHwAAAAAAAAAkw91vA07+S7GFPXd2jckNV01QSE9UTwAZAYBxAAAAABP/gAAEb/8AAQAAAQAAAA==";
}
flambe.platform.html.HtmlAssetPackLoader.detectAudioFormats = function() {
	var audio = js.Browser.document.createElement("audio");
	if(audio == null || $bind(audio,audio.canPlayType) == null) return [];
	var blacklist = new EReg("\\b(iPhone|iPod|iPad|Android)\\b","");
	var userAgent = js.Browser.window.navigator.userAgent;
	if(!flambe.platform.html.WebAudioSound.get_supported() && blacklist.match(userAgent)) return [];
	var types = [{ format : flambe.asset.AssetFormat.M4A, mimeType : "audio/mp4; codecs=mp4a"},{ format : flambe.asset.AssetFormat.MP3, mimeType : "audio/mpeg"},{ format : flambe.asset.AssetFormat.OPUS, mimeType : "audio/ogg; codecs=opus"},{ format : flambe.asset.AssetFormat.OGG, mimeType : "audio/ogg; codecs=vorbis"},{ format : flambe.asset.AssetFormat.WAV, mimeType : "audio/wav"}];
	var result = [];
	var _g = 0;
	while(_g < types.length) {
		var type = types[_g];
		++_g;
		var canPlayType = "";
		try {
			canPlayType = audio.canPlayType(type.mimeType);
		} catch( _ ) {
		}
		if(canPlayType != "") result.push(type.format);
	}
	return result;
}
flambe.platform.html.HtmlAssetPackLoader.supportsBlob = function() {
	if(flambe.platform.html.HtmlAssetPackLoader._detectBlobSupport) {
		flambe.platform.html.HtmlAssetPackLoader._detectBlobSupport = false;
		var xhr = new XMLHttpRequest();
		xhr.open("GET",".",true);
		xhr.responseType = "blob";
		if(xhr.responseType != "blob") return false;
		flambe.platform.html.HtmlAssetPackLoader._URL = flambe.platform.html.HtmlUtil.loadExtension("URL").value;
	}
	return flambe.platform.html.HtmlAssetPackLoader._URL != null && flambe.platform.html.HtmlAssetPackLoader._URL.createObjectURL != null;
}
flambe.platform.html.HtmlAssetPackLoader.__super__ = flambe.platform.BasicAssetPackLoader;
flambe.platform.html.HtmlAssetPackLoader.prototype = $extend(flambe.platform.BasicAssetPackLoader.prototype,{
	download: function(url,entry,responseType,onLoad) {
		var _g = this;
		var xhr = new XMLHttpRequest();
		var lastActivity = 0.0;
		var start = function() {
			lastActivity = Date.now();
			xhr.open("GET",url,true);
			xhr.responseType = responseType;
			if(xhr.responseType == "") xhr.responseType = "arraybuffer";
			xhr.send();
		};
		var interval = 0;
		if(typeof(xhr.onprogress) != "undefined") {
			var attempts = 4;
			xhr.onprogress = function(event) {
				lastActivity = Date.now();
				_g.handleProgress(entry,event.loaded);
			};
			interval = js.Browser.window.setInterval(function() {
				if(xhr.readyState >= 1 && Date.now() - lastActivity > 5000) {
					xhr.abort();
					--attempts;
					if(attempts > 0) start(); else {
						js.Browser.window.clearInterval(interval);
						_g.handleError(entry,"Request timed out");
					}
				}
			},1000);
		}
		xhr.onload = function(_) {
			js.Browser.window.clearInterval(interval);
			var response = xhr.response;
			if(response == null) response = xhr.responseText; else if(responseType == "blob" && xhr.responseType == "arraybuffer") response = new Blob([xhr.response]);
			onLoad(response);
		};
		xhr.onerror = function(_) {
			js.Browser.window.clearInterval(interval);
			_g.handleError(entry,"Failed to load asset: error #" + xhr.status);
		};
		start();
		return xhr;
	}
	,getAssetFormats: function(fn) {
		var _g = this;
		if(flambe.platform.html.HtmlAssetPackLoader._supportedFormats == null) {
			flambe.platform.html.HtmlAssetPackLoader._supportedFormats = new flambe.util.Promise();
			flambe.platform.html.HtmlAssetPackLoader.detectImageFormats(function(imageFormats) {
				flambe.platform.html.HtmlAssetPackLoader._supportedFormats.set_result(_g._platform.getRenderer().getCompressedTextureFormats().concat(imageFormats).concat(flambe.platform.html.HtmlAssetPackLoader.detectAudioFormats()).concat([flambe.asset.AssetFormat.Data]));
			});
		}
		flambe.platform.html.HtmlAssetPackLoader._supportedFormats.get(fn);
	}
	,loadEntry: function(url,entry) {
		var _g = this;
		switch( (entry.format)[1] ) {
		case 0:
		case 1:
		case 2:
		case 3:
		case 4:
			var image = js.Browser.document.createElement("img");
			var events = new flambe.platform.EventGroup();
			events.addDisposingListener(image,"load",function(_) {
				if(flambe.platform.html.HtmlAssetPackLoader.supportsBlob()) flambe.platform.html.HtmlAssetPackLoader._URL.revokeObjectURL(image.src);
				var texture = _g._platform.getRenderer().createTexture(image);
				if(texture != null) _g.handleLoad(entry,texture); else _g.handleTextureError(entry);
			});
			events.addDisposingListener(image,"error",function(_) {
				_g.handleError(entry,"Failed to load image");
			});
			if(flambe.platform.html.HtmlAssetPackLoader.supportsBlob()) this.download(url,entry,"blob",function(blob) {
				image.src = flambe.platform.html.HtmlAssetPackLoader._URL.createObjectURL(blob);
			}); else image.src = url;
			break;
		case 5:
		case 6:
		case 7:
			this.download(url,entry,"arraybuffer",function(buffer) {
				var texture = _g._platform.getRenderer().createCompressedTexture(entry.format,null);
				if(texture != null) _g.handleLoad(entry,texture); else _g.handleTextureError(entry);
			});
			break;
		case 8:
		case 9:
		case 10:
		case 11:
		case 12:
			if(flambe.platform.html.WebAudioSound.get_supported()) this.download(url,entry,"arraybuffer",function(buffer) {
				flambe.platform.html.WebAudioSound.ctx.decodeAudioData(buffer,function(decoded) {
					_g.handleLoad(entry,new flambe.platform.html.WebAudioSound(decoded));
				},function() {
					_g.handleLoad(entry,flambe.platform.DummySound.getInstance());
				});
			}); else {
				var audio = js.Browser.document.createElement("audio");
				audio.preload = "auto";
				var ref = ++flambe.platform.html.HtmlAssetPackLoader._mediaRefCount;
				if(flambe.platform.html.HtmlAssetPackLoader._mediaElements == null) flambe.platform.html.HtmlAssetPackLoader._mediaElements = new haxe.ds.IntMap();
				flambe.platform.html.HtmlAssetPackLoader._mediaElements.set(ref,audio);
				var events = new flambe.platform.EventGroup();
				events.addDisposingListener(audio,"canplaythrough",function(_) {
					flambe.platform.html.HtmlAssetPackLoader._mediaElements.remove(ref);
					_g.handleLoad(entry,new flambe.platform.html.HtmlSound(audio));
				});
				events.addDisposingListener(audio,"error",function(_) {
					flambe.platform.html.HtmlAssetPackLoader._mediaElements.remove(ref);
					var code = audio.error.code;
					if(code == 3 || code == 4) _g.handleLoad(entry,flambe.platform.DummySound.getInstance()); else _g.handleError(entry,"Failed to load audio: " + audio.error.code);
				});
				events.addListener(audio,"progress",function(_) {
					if(audio.buffered.length > 0 && audio.duration > 0) {
						var progress = audio.buffered.end(0) / audio.duration;
						_g.handleProgress(entry,progress * entry.bytes | 0);
					}
				});
				audio.src = url;
				audio.load();
			}
			break;
		case 13:
			this.download(url,entry,"text",function(text) {
				_g.handleLoad(entry,new flambe.platform.BasicFile(text));
			});
			break;
		}
	}
	,__class__: flambe.platform.html.HtmlAssetPackLoader
});
flambe.platform.html.HtmlMouse = function(pointer,canvas) {
	flambe.platform.BasicMouse.call(this,pointer);
	this._canvas = canvas;
};
$hxClasses["flambe.platform.html.HtmlMouse"] = flambe.platform.html.HtmlMouse;
flambe.platform.html.HtmlMouse.__name__ = ["flambe","platform","html","HtmlMouse"];
flambe.platform.html.HtmlMouse.__super__ = flambe.platform.BasicMouse;
flambe.platform.html.HtmlMouse.prototype = $extend(flambe.platform.BasicMouse.prototype,{
	__class__: flambe.platform.html.HtmlMouse
});
flambe.platform.html.HtmlSound = function(audioElement) {
	flambe.platform.BasicAsset.call(this);
	this.audioElement = audioElement;
};
$hxClasses["flambe.platform.html.HtmlSound"] = flambe.platform.html.HtmlSound;
flambe.platform.html.HtmlSound.__name__ = ["flambe","platform","html","HtmlSound"];
flambe.platform.html.HtmlSound.__interfaces__ = [flambe.sound.Sound];
flambe.platform.html.HtmlSound.__super__ = flambe.platform.BasicAsset;
flambe.platform.html.HtmlSound.prototype = $extend(flambe.platform.BasicAsset.prototype,{
	onDisposed: function() {
		this.audioElement = null;
	}
	,loop: function(volume) {
		if(volume == null) volume = 1.0;
		return new flambe.platform.html._HtmlSound.HtmlPlayback(this,volume,true);
	}
	,play: function(volume) {
		if(volume == null) volume = 1.0;
		return new flambe.platform.html._HtmlSound.HtmlPlayback(this,volume,false);
	}
	,__class__: flambe.platform.html.HtmlSound
});
flambe.platform.html._HtmlSound = {}
flambe.platform.html._HtmlSound.HtmlPlayback = function(sound,volume,loop) {
	this._disposed = false;
	var _g = this;
	this._sound = sound;
	this._tickableAdded = false;
	this._clonedElement = js.Browser.document.createElement("audio");
	this._clonedElement.loop = loop;
	this._clonedElement.src = sound.audioElement.src;
	this.volume = new flambe.animation.AnimatedFloat(volume,function(_,_1) {
		_g.updateVolume();
	});
	this.updateVolume();
	this.playAudio();
	if(flambe.System.hidden._value) this.set_paused(true);
};
$hxClasses["flambe.platform.html._HtmlSound.HtmlPlayback"] = flambe.platform.html._HtmlSound.HtmlPlayback;
flambe.platform.html._HtmlSound.HtmlPlayback.__name__ = ["flambe","platform","html","_HtmlSound","HtmlPlayback"];
flambe.platform.html._HtmlSound.HtmlPlayback.__interfaces__ = [flambe.platform.Tickable,flambe.sound.Playback];
flambe.platform.html._HtmlSound.HtmlPlayback.prototype = {
	updateVolume: function() {
		this._clonedElement.volume = flambe.System.volume._value * this.volume._value;
	}
	,playAudio: function() {
		var _g = this;
		this._clonedElement.play();
		if(!this._tickableAdded) {
			flambe.platform.html.HtmlPlatform.instance.mainLoop.addTickable(this);
			this._tickableAdded = true;
			this._volumeBinding = flambe.System.volume.get_changed().connect(function(_,_1) {
				_g.updateVolume();
			});
			this._hideBinding = flambe.System.hidden.get_changed().connect(function(hidden,_) {
				if(hidden) {
					_g._wasPaused = _g._clonedElement.paused;
					_g.set_paused(true);
				} else _g.set_paused(_g._wasPaused);
			});
		}
	}
	,dispose: function() {
		this.set_paused(true);
		this._disposed = true;
	}
	,update: function(dt) {
		this.volume.update(dt);
		if(this.get_ended() || this._clonedElement.paused) {
			this._tickableAdded = false;
			this._volumeBinding.dispose();
			this._hideBinding.dispose();
			return true;
		}
		return false;
	}
	,get_ended: function() {
		return this._disposed || this._clonedElement.ended;
	}
	,set_paused: function(paused) {
		if(this._clonedElement.paused != paused) {
			if(paused) this._clonedElement.pause(); else this.playAudio();
		}
		return paused;
	}
	,__class__: flambe.platform.html._HtmlSound.HtmlPlayback
}
flambe.subsystem.StageSystem = function() { }
$hxClasses["flambe.subsystem.StageSystem"] = flambe.subsystem.StageSystem;
flambe.subsystem.StageSystem.__name__ = ["flambe","subsystem","StageSystem"];
flambe.subsystem.StageSystem.prototype = {
	__class__: flambe.subsystem.StageSystem
}
flambe.platform.html.HtmlStage = function(canvas) {
	var _g = this;
	this._canvas = canvas;
	this.resize = new flambe.util.Signal0();
	this.scaleFactor = flambe.platform.html.HtmlStage.computeScaleFactor();
	if(this.scaleFactor != 1) {
		flambe.platform.html.HtmlUtil.setVendorStyle(this._canvas,"transform-origin","top left");
		flambe.platform.html.HtmlUtil.setVendorStyle(this._canvas,"transform","scale(" + 1 / this.scaleFactor + ")");
	}
	if(flambe.platform.html.HtmlUtil.SHOULD_HIDE_MOBILE_BROWSER) {
		js.Browser.window.addEventListener("orientationchange",function(_) {
			flambe.platform.html.HtmlUtil.callLater($bind(_g,_g.hideMobileBrowser),200);
		},false);
		this.hideMobileBrowser();
	}
	js.Browser.window.addEventListener("resize",$bind(this,this.onWindowResize),false);
	this.onWindowResize(null);
	this.orientation = new flambe.util.Value(null);
	if(js.Browser.window.orientation != null) {
		js.Browser.window.addEventListener("orientationchange",$bind(this,this.onOrientationChange),false);
		this.onOrientationChange(null);
	}
	this.fullscreen = new flambe.util.Value(false);
	flambe.platform.html.HtmlUtil.addVendorListener(js.Browser.document,"fullscreenchange",function(_) {
		_g.updateFullscreen();
	},false);
	this.updateFullscreen();
};
$hxClasses["flambe.platform.html.HtmlStage"] = flambe.platform.html.HtmlStage;
flambe.platform.html.HtmlStage.__name__ = ["flambe","platform","html","HtmlStage"];
flambe.platform.html.HtmlStage.__interfaces__ = [flambe.subsystem.StageSystem];
flambe.platform.html.HtmlStage.computeScaleFactor = function() {
	var devicePixelRatio = js.Browser.window.devicePixelRatio;
	if(devicePixelRatio == null) devicePixelRatio = 1;
	var canvas = js.Browser.document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	var backingStorePixelRatio = flambe.platform.html.HtmlUtil.loadExtension("backingStorePixelRatio",ctx).value;
	if(backingStorePixelRatio == null) backingStorePixelRatio = 1;
	var scale = devicePixelRatio / backingStorePixelRatio;
	var screenWidth = js.Browser.window.screen.width;
	var screenHeight = js.Browser.window.screen.height;
	if(scale * screenWidth > 1136 || scale * screenHeight > 1136) return 1;
	return scale;
}
flambe.platform.html.HtmlStage.prototype = {
	updateFullscreen: function() {
		var state = flambe.platform.html.HtmlUtil.loadFirstExtension(["fullscreen","fullScreen","isFullScreen"],js.Browser.document).value;
		this.fullscreen.set__(state == true);
	}
	,onOrientationChange: function(_) {
		var value = flambe.platform.html.HtmlUtil.orientation(js.Browser.window.orientation);
		this.orientation.set__(value);
	}
	,hideMobileBrowser: function() {
		var _g = this;
		var mobileAddressBar = 100;
		var htmlStyle = js.Browser.document.documentElement.style;
		htmlStyle.height = js.Browser.window.innerHeight + mobileAddressBar + "px";
		htmlStyle.width = js.Browser.window.innerWidth + "px";
		htmlStyle.overflow = "visible";
		flambe.platform.html.HtmlUtil.callLater(function() {
			flambe.platform.html.HtmlUtil.hideMobileBrowser();
			flambe.platform.html.HtmlUtil.callLater(function() {
				htmlStyle.height = js.Browser.window.innerHeight + "px";
				_g.onWindowResize(null);
			},100);
		});
	}
	,resizeCanvas: function(width,height) {
		var scaledWidth = this.scaleFactor * width;
		var scaledHeight = this.scaleFactor * height;
		if(this._canvas.width == scaledWidth && this._canvas.height == scaledHeight) return false;
		this._canvas.width = scaledWidth | 0;
		this._canvas.height = scaledHeight | 0;
		this.resize.emit();
		return true;
	}
	,onWindowResize: function(_) {
		var container = this._canvas.parentElement;
		var rect = container.getBoundingClientRect();
		this.resizeCanvas(rect.width,rect.height);
	}
	,get_height: function() {
		return this._canvas.height;
	}
	,get_width: function() {
		return this._canvas.width;
	}
	,__class__: flambe.platform.html.HtmlStage
}
flambe.platform.html.HtmlStorage = function(storage) {
	this._storage = storage;
};
$hxClasses["flambe.platform.html.HtmlStorage"] = flambe.platform.html.HtmlStorage;
flambe.platform.html.HtmlStorage.__name__ = ["flambe","platform","html","HtmlStorage"];
flambe.platform.html.HtmlStorage.__interfaces__ = [flambe.subsystem.StorageSystem];
flambe.platform.html.HtmlStorage.prototype = {
	get: function(key,defaultValue) {
		var encoded = null;
		try {
			encoded = this._storage.getItem("flambe:" + key);
		} catch( error ) {
			null;
		}
		if(encoded != null) try {
			return haxe.Unserializer.run(encoded);
		} catch( error ) {
			null;
		}
		return defaultValue;
	}
	,set: function(key,value) {
		var encoded;
		try {
			var serializer = new haxe.Serializer();
			serializer.useCache = true;
			serializer.useEnumIndex = false;
			serializer.serialize(value);
			encoded = serializer.toString();
		} catch( error ) {
			return false;
		}
		try {
			this._storage.setItem("flambe:" + key,encoded);
		} catch( error ) {
			return false;
		}
		return true;
	}
	,__class__: flambe.platform.html.HtmlStorage
}
flambe.platform.html.HtmlUtil = function() { }
$hxClasses["flambe.platform.html.HtmlUtil"] = flambe.platform.html.HtmlUtil;
flambe.platform.html.HtmlUtil.__name__ = ["flambe","platform","html","HtmlUtil"];
flambe.platform.html.HtmlUtil.callLater = function(func,delay) {
	if(delay == null) delay = 0;
	js.Browser.window.setTimeout(func,delay);
}
flambe.platform.html.HtmlUtil.hideMobileBrowser = function() {
	js.Browser.window.scrollTo(1,0);
}
flambe.platform.html.HtmlUtil.loadExtension = function(name,obj) {
	if(obj == null) obj = js.Browser.window;
	var extension = Reflect.field(obj,name);
	if(extension != null) return { prefix : "", field : name, value : extension};
	var capitalized = name.charAt(0).toUpperCase() + HxOverrides.substr(name,1,null);
	var _g = 0, _g1 = flambe.platform.html.HtmlUtil.VENDOR_PREFIXES;
	while(_g < _g1.length) {
		var prefix = _g1[_g];
		++_g;
		var field = prefix + capitalized;
		var extension1 = Reflect.field(obj,field);
		if(extension1 != null) return { prefix : prefix, field : field, value : extension1};
	}
	return { prefix : null, field : null, value : null};
}
flambe.platform.html.HtmlUtil.loadFirstExtension = function(names,obj) {
	var _g = 0;
	while(_g < names.length) {
		var name = names[_g];
		++_g;
		var extension = flambe.platform.html.HtmlUtil.loadExtension(name,obj);
		if(extension.field != null) return extension;
	}
	return { prefix : null, field : null, value : null};
}
flambe.platform.html.HtmlUtil.polyfill = function(name,obj) {
	if(obj == null) obj = js.Browser.window;
	var value = flambe.platform.html.HtmlUtil.loadExtension(name,obj).value;
	if(value == null) return false;
	obj[name] = value;
	return true;
}
flambe.platform.html.HtmlUtil.setVendorStyle = function(element,name,value) {
	var style = element.style;
	var _g = 0, _g1 = flambe.platform.html.HtmlUtil.VENDOR_PREFIXES;
	while(_g < _g1.length) {
		var prefix = _g1[_g];
		++_g;
		style.setProperty("-" + prefix + "-" + name,value);
	}
	style.setProperty(name,value);
}
flambe.platform.html.HtmlUtil.addVendorListener = function(dispatcher,type,listener,useCapture) {
	var _g = 0, _g1 = flambe.platform.html.HtmlUtil.VENDOR_PREFIXES;
	while(_g < _g1.length) {
		var prefix = _g1[_g];
		++_g;
		dispatcher.addEventListener(prefix + type,listener,useCapture);
	}
	dispatcher.addEventListener(type,listener,useCapture);
}
flambe.platform.html.HtmlUtil.orientation = function(angle) {
	switch(angle) {
	case -90:case 90:
		return flambe.display.Orientation.Landscape;
	default:
		return flambe.display.Orientation.Portrait;
	}
}
flambe.platform.html.HtmlUtil.createEmptyCanvas = function(width,height) {
	var canvas = js.Browser.document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	return canvas;
}
flambe.platform.html.HtmlUtil.createCanvas = function(source) {
	var canvas = flambe.platform.html.HtmlUtil.createEmptyCanvas(source.width,source.height);
	var ctx = canvas.getContext("2d");
	ctx.save();
	ctx.globalCompositeOperation = "copy";
	ctx.drawImage(source,0,0);
	ctx.restore();
	return canvas;
}
flambe.platform.html.HtmlUtil.detectSlowDriver = function(gl) {
	var windows = js.Browser.navigator.platform.indexOf("Win") >= 0;
	if(windows) {
		var chrome = js.Browser.window.chrome != null;
		if(chrome) {
			var _g = 0, _g1 = gl.getSupportedExtensions();
			while(_g < _g1.length) {
				var ext = _g1[_g];
				++_g;
				if(ext.indexOf("WEBGL_compressed_texture") >= 0) return false;
			}
			return true;
		}
	}
	return false;
}
flambe.platform.html.HtmlUtil.fixAndroidMath = function() {
	if(js.Browser.navigator.userAgent.indexOf("Linux; U; Android 4") >= 0) {
		var sin = Math.sin, cos = Math.cos;
		Math.sin = function(x) {
			return x == 0?0:sin(x);
		};
		Math.cos = function(x) {
			return x == 0?1:cos(x);
		};
	}
}
flambe.platform.html.WebAudioSound = function(buffer) {
	flambe.platform.BasicAsset.call(this);
	this.buffer = buffer;
};
$hxClasses["flambe.platform.html.WebAudioSound"] = flambe.platform.html.WebAudioSound;
flambe.platform.html.WebAudioSound.__name__ = ["flambe","platform","html","WebAudioSound"];
flambe.platform.html.WebAudioSound.__interfaces__ = [flambe.sound.Sound];
flambe.platform.html.WebAudioSound.get_supported = function() {
	if(flambe.platform.html.WebAudioSound._detectSupport) {
		flambe.platform.html.WebAudioSound._detectSupport = false;
		var AudioContext = flambe.platform.html.HtmlUtil.loadExtension("AudioContext").value;
		if(AudioContext != null) {
			flambe.platform.html.WebAudioSound.ctx = new AudioContext();
			flambe.platform.html.WebAudioSound.gain = flambe.platform.html.WebAudioSound.createGain();
			flambe.platform.html.WebAudioSound.gain.connect(flambe.platform.html.WebAudioSound.ctx.destination);
			flambe.System.volume.watch(function(volume,_) {
				flambe.platform.html.WebAudioSound.gain.gain.value = volume;
			});
		}
	}
	return flambe.platform.html.WebAudioSound.ctx != null;
}
flambe.platform.html.WebAudioSound.createGain = function() {
	return flambe.platform.html.WebAudioSound.ctx.createGain != null?flambe.platform.html.WebAudioSound.ctx.createGain():flambe.platform.html.WebAudioSound.ctx.createGainNode();
}
flambe.platform.html.WebAudioSound.start = function(node,time) {
	if(node.start != null) node.start(time); else node.noteOn(time);
}
flambe.platform.html.WebAudioSound.__super__ = flambe.platform.BasicAsset;
flambe.platform.html.WebAudioSound.prototype = $extend(flambe.platform.BasicAsset.prototype,{
	onDisposed: function() {
		this.buffer = null;
	}
	,get_duration: function() {
		return this.buffer.duration;
	}
	,loop: function(volume) {
		if(volume == null) volume = 1.0;
		return new flambe.platform.html._WebAudioSound.WebAudioPlayback(this,volume,true);
	}
	,play: function(volume) {
		if(volume == null) volume = 1.0;
		return new flambe.platform.html._WebAudioSound.WebAudioPlayback(this,volume,false);
	}
	,__class__: flambe.platform.html.WebAudioSound
});
flambe.platform.html._WebAudioSound = {}
flambe.platform.html._WebAudioSound.WebAudioPlayback = function(sound,volume,loop) {
	this._ended = false;
	var _g = this;
	this._sound = sound;
	this._head = flambe.platform.html.WebAudioSound.gain;
	this._sourceNode = flambe.platform.html.WebAudioSound.ctx.createBufferSource();
	this._sourceNode.buffer = sound.buffer;
	this._sourceNode.loop = loop;
	this._sourceNode.onended = function() {
		_g._ended = true;
	};
	flambe.platform.html.WebAudioSound.start(this._sourceNode,0);
	this.playAudio();
	this.volume = new flambe.animation.AnimatedFloat(volume,function(v,_) {
		_g.setVolume(v);
	});
	if(volume != 1) this.setVolume(volume);
	if(flambe.System.hidden._value) this.set_paused(true);
};
$hxClasses["flambe.platform.html._WebAudioSound.WebAudioPlayback"] = flambe.platform.html._WebAudioSound.WebAudioPlayback;
flambe.platform.html._WebAudioSound.WebAudioPlayback.__name__ = ["flambe","platform","html","_WebAudioSound","WebAudioPlayback"];
flambe.platform.html._WebAudioSound.WebAudioPlayback.__interfaces__ = [flambe.platform.Tickable,flambe.sound.Playback];
flambe.platform.html._WebAudioSound.WebAudioPlayback.prototype = {
	playAudio: function() {
		var _g = this;
		this._sourceNode.connect(this._head);
		this._startedAt = flambe.platform.html.WebAudioSound.ctx.currentTime;
		this._pausedAt = -1;
		if(!this._tickableAdded) {
			flambe.platform.html.HtmlPlatform.instance.mainLoop.addTickable(this);
			this._tickableAdded = true;
			this._hideBinding = flambe.System.hidden.get_changed().connect(function(hidden,_) {
				if(hidden) {
					_g._wasPaused = _g._pausedAt >= 0;
					_g.set_paused(true);
				} else _g.set_paused(_g._wasPaused);
			});
		}
	}
	,insertNode: function(head) {
		if(!(this._pausedAt >= 0)) {
			this._sourceNode.disconnect();
			this._sourceNode.connect(head);
		}
		head.connect(this._head);
		this._head = head;
	}
	,setVolume: function(volume) {
		if(this._gainNode == null) {
			this._gainNode = flambe.platform.html.WebAudioSound.createGain();
			this.insertNode(this._gainNode);
		}
		this._gainNode.gain.value = volume;
	}
	,dispose: function() {
		this.set_paused(true);
		this._ended = true;
	}
	,update: function(dt) {
		this.volume.update(dt);
		if(this.get_ended() || this._pausedAt >= 0) {
			this._tickableAdded = false;
			this._hideBinding.dispose();
			return true;
		}
		return false;
	}
	,get_position: function() {
		if(this.get_ended()) return this._sound.get_duration(); else if(this._pausedAt >= 0) return this._pausedAt; else {
			var elapsed = flambe.platform.html.WebAudioSound.ctx.currentTime - this._startedAt;
			return elapsed % this._sound.get_duration();
		}
	}
	,get_ended: function() {
		return this._ended || this._sourceNode.playbackState == 3;
	}
	,set_paused: function(paused) {
		if(paused != this._pausedAt >= 0) {
			if(paused) {
				this._sourceNode.disconnect();
				this._pausedAt = this.get_position();
			} else this.playAudio();
		}
		return paused;
	}
	,__class__: flambe.platform.html._WebAudioSound.WebAudioPlayback
}
flambe.platform.html.WebGLBatcher = function(gl) {
	this._backbufferHeight = 0;
	this._backbufferWidth = 0;
	this._dataOffset = 0;
	this._maxQuads = 0;
	this._quads = 0;
	this._pendingSetScissor = false;
	this._currentRenderTarget = null;
	this._currentTexture = null;
	this._currentShader = null;
	this._currentBlendMode = null;
	this._lastScissor = null;
	this._lastTexture = null;
	this._lastShader = null;
	this._lastRenderTarget = null;
	this._lastBlendMode = null;
	this._gl = gl;
	gl.clearColor(0,0,0,1);
	gl.enable(3042);
	gl.pixelStorei(37441,1);
	this._vertexBuffer = gl.createBuffer();
	gl.bindBuffer(34962,this._vertexBuffer);
	this._quadIndexBuffer = gl.createBuffer();
	gl.bindBuffer(34963,this._quadIndexBuffer);
	this._drawImageShader = new flambe.platform.shader.DrawImageGL(gl);
	this._drawPatternShader = new flambe.platform.shader.DrawPatternGL(gl);
	this._fillRectShader = new flambe.platform.shader.FillRectGL(gl);
	this.resize(16);
};
$hxClasses["flambe.platform.html.WebGLBatcher"] = flambe.platform.html.WebGLBatcher;
flambe.platform.html.WebGLBatcher.__name__ = ["flambe","platform","html","WebGLBatcher"];
flambe.platform.html.WebGLBatcher.prototype = {
	bindRenderTarget: function(texture) {
		if(texture != null) {
			this._gl.bindFramebuffer(36160,texture.framebuffer);
			this._gl.viewport(0,0,texture._width,texture._height);
		} else {
			this._gl.bindFramebuffer(36160,null);
			this._gl.viewport(0,0,this._backbufferWidth,this._backbufferHeight);
		}
		this._currentRenderTarget = texture;
		this._lastRenderTarget = texture;
	}
	,resize: function(maxQuads) {
		this.flush();
		if(maxQuads > 1024) return;
		this._maxQuads = maxQuads;
		this.data = new Float32Array(maxQuads * 4 * 6);
		this._gl.bufferData(34962,this.data.length * 4,35040);
		var indices = new Uint16Array(6 * maxQuads);
		var _g = 0;
		while(_g < maxQuads) {
			var ii = _g++;
			indices[ii * 6] = ii * 4;
			indices[ii * 6 + 1] = ii * 4 + 1;
			indices[ii * 6 + 2] = ii * 4 + 2;
			indices[ii * 6 + 3] = ii * 4 + 2;
			indices[ii * 6 + 4] = ii * 4 + 3;
			indices[ii * 6 + 5] = ii * 4;
		}
		this._gl.bufferData(34963,indices,35044);
	}
	,flush: function() {
		if(this._quads < 1) return;
		if(this._lastRenderTarget != this._currentRenderTarget) this.bindRenderTarget(this._lastRenderTarget);
		if(this._lastBlendMode != this._currentBlendMode) {
			var _g = this;
			switch( (_g._lastBlendMode)[1] ) {
			case 0:
				this._gl.blendFunc(1,771);
				break;
			case 1:
				this._gl.blendFunc(1,1);
				break;
			case 2:
				this._gl.blendFunc(0,770);
				break;
			case 3:
				this._gl.blendFunc(1,0);
				break;
			}
			this._currentBlendMode = this._lastBlendMode;
		}
		if(this._pendingSetScissor) {
			if(this._lastScissor != null) {
				this._gl.enable(3089);
				this._gl.scissor(this._lastScissor.x | 0,this._lastScissor.y | 0,this._lastScissor.width | 0,this._lastScissor.height | 0);
			} else this._gl.disable(3089);
			this._pendingSetScissor = false;
		}
		if(this._lastTexture != this._currentTexture) {
			this._gl.bindTexture(3553,this._lastTexture.nativeTexture);
			this._currentTexture = this._lastTexture;
		}
		if(this._lastShader != this._currentShader) {
			this._lastShader.useProgram();
			this._lastShader.prepare();
			this._currentShader = this._lastShader;
		}
		if(this._lastShader == this._drawPatternShader) this._drawPatternShader.setMaxUV(this._lastTexture.maxU,this._lastTexture.maxV);
		this._gl.bufferData(34962,this.data.subarray(0,this._dataOffset),35040);
		this._gl.drawElements(4,6 * this._quads,5123,0);
		this._quads = 0;
		this._dataOffset = 0;
	}
	,prepareQuad: function(elementsPerVertex,renderTarget,blendMode,scissor,shader) {
		if(renderTarget != this._lastRenderTarget) {
			this.flush();
			this._lastRenderTarget = renderTarget;
		}
		if(blendMode != this._lastBlendMode) {
			this.flush();
			this._lastBlendMode = blendMode;
		}
		if(shader != this._lastShader) {
			this.flush();
			this._lastShader = shader;
		}
		if(scissor != null || this._lastScissor != null) {
			if(scissor == null || this._lastScissor == null || !this._lastScissor.equals(scissor)) {
				this.flush();
				this._lastScissor = scissor != null?scissor.clone(this._lastScissor):null;
				this._pendingSetScissor = true;
			}
		}
		if(this._quads >= this._maxQuads) this.resize(2 * this._maxQuads);
		++this._quads;
		var offset = this._dataOffset;
		this._dataOffset += 4 * elementsPerVertex;
		return offset;
	}
	,prepareFillRect: function(renderTarget,blendMode,scissor) {
		return this.prepareQuad(6,renderTarget,blendMode,scissor,this._fillRectShader);
	}
	,prepareDrawPattern: function(renderTarget,blendMode,scissor,texture) {
		if(texture != this._lastTexture) {
			this.flush();
			this._lastTexture = texture;
		}
		return this.prepareQuad(5,renderTarget,blendMode,scissor,this._drawPatternShader);
	}
	,prepareDrawImage: function(renderTarget,blendMode,scissor,texture) {
		if(texture != this._lastTexture) {
			this.flush();
			this._lastTexture = texture;
		}
		return this.prepareQuad(5,renderTarget,blendMode,scissor,this._drawImageShader);
	}
	,deleteFramebuffer: function(texture) {
		if(texture == this._lastRenderTarget) {
			this.flush();
			this._lastRenderTarget = null;
			this._currentRenderTarget = null;
		}
		this._gl.deleteFramebuffer(texture.framebuffer);
	}
	,deleteTexture: function(texture) {
		if(texture == this._lastTexture) {
			this.flush();
			this._lastTexture = null;
			this._currentTexture = null;
		}
		this._gl.deleteTexture(texture.nativeTexture);
	}
	,bindTexture: function(texture) {
		this.flush();
		this._lastTexture = null;
		this._currentTexture = null;
		this._gl.bindTexture(3553,texture);
	}
	,didRender: function() {
		this.flush();
	}
	,willRender: function() {
	}
	,resizeBackbuffer: function(width,height) {
		this._gl.viewport(0,0,width,height);
		this._backbufferWidth = width;
		this._backbufferHeight = height;
	}
	,__class__: flambe.platform.html.WebGLBatcher
}
flambe.platform.html.WebGLGraphics = function(batcher,renderTarget) {
	this._stateList = null;
	this._inverseProjection = null;
	if(flambe.platform.html.WebGLGraphics._scratchQuadArray == null) flambe.platform.html.WebGLGraphics._scratchQuadArray = new Float32Array(8);
	this._batcher = batcher;
	this._renderTarget = renderTarget;
};
$hxClasses["flambe.platform.html.WebGLGraphics"] = flambe.platform.html.WebGLGraphics;
flambe.platform.html.WebGLGraphics.__name__ = ["flambe","platform","html","WebGLGraphics"];
flambe.platform.html.WebGLGraphics.__interfaces__ = [flambe.platform.InternalGraphics];
flambe.platform.html.WebGLGraphics.prototype = {
	transformQuad: function(x,y,width,height) {
		var x2 = x + width;
		var y2 = y + height;
		var pos = flambe.platform.html.WebGLGraphics._scratchQuadArray;
		pos[0] = x;
		pos[1] = y;
		pos[2] = x2;
		pos[3] = y;
		pos[4] = x2;
		pos[5] = y2;
		pos[6] = x;
		pos[7] = y2;
		this._stateList.matrix.transformArray(pos,8,pos);
		return pos;
	}
	,onResize: function(width,height) {
		this._stateList = new flambe.platform.html._WebGLGraphics.DrawingState();
		var flip = this._renderTarget != null?-1:1;
		this._stateList.matrix.set(2 / width,0,0,flip * -2 / height,-1,flip);
		this._inverseProjection = new flambe.math.Matrix();
		this._inverseProjection.set(2 / width,0,0,2 / height,-1,-1);
		this._inverseProjection.invert();
	}
	,didRender: function() {
		this._batcher.didRender();
	}
	,willRender: function() {
		this._batcher.willRender();
	}
	,applyScissor: function(x,y,width,height) {
		var state = this._stateList;
		var rect = flambe.platform.html.WebGLGraphics._scratchQuadArray;
		rect[0] = x;
		rect[1] = y;
		rect[2] = x + width;
		rect[3] = y + height;
		state.matrix.transformArray(rect,4,rect);
		this._inverseProjection.transformArray(rect,4,rect);
		x = rect[0];
		y = rect[1];
		width = rect[2] - x;
		height = rect[3] - y;
		if(width < 0) {
			x += width;
			width = -width;
		}
		if(height < 0) {
			y += height;
			height = -height;
		}
		state.applyScissor(x,y,width,height);
	}
	,setBlendMode: function(blendMode) {
		this._stateList.blendMode = blendMode;
	}
	,multiplyAlpha: function(factor) {
		this._stateList.alpha *= factor;
	}
	,fillRect: function(color,x,y,width,height) {
		var state = this._stateList;
		var pos = this.transformQuad(x,y,width,height);
		var r = (color & 16711680) / 16711680;
		var g = (color & 65280) / 65280;
		var b = (color & 255) / 255;
		var a = state.alpha;
		var offset = this._batcher.prepareFillRect(this._renderTarget,state.blendMode,state.scissor);
		var data = this._batcher.data;
		data[offset] = pos[0];
		data[++offset] = pos[1];
		data[++offset] = r;
		data[++offset] = g;
		data[++offset] = b;
		data[++offset] = a;
		data[++offset] = pos[2];
		data[++offset] = pos[3];
		data[++offset] = r;
		data[++offset] = g;
		data[++offset] = b;
		data[++offset] = a;
		data[++offset] = pos[4];
		data[++offset] = pos[5];
		data[++offset] = r;
		data[++offset] = g;
		data[++offset] = b;
		data[++offset] = a;
		data[++offset] = pos[6];
		data[++offset] = pos[7];
		data[++offset] = r;
		data[++offset] = g;
		data[++offset] = b;
		data[++offset] = a;
	}
	,drawPattern: function(texture,x,y,width,height) {
		var state = this._stateList;
		var texture1 = texture;
		var pos = this.transformQuad(x,y,width,height);
		var u2 = texture1.maxU * (width / texture1._width);
		var v2 = texture1.maxV * (height / texture1._height);
		var alpha = state.alpha;
		var offset = this._batcher.prepareDrawPattern(this._renderTarget,state.blendMode,state.scissor,texture1);
		var data = this._batcher.data;
		data[offset] = pos[0];
		data[++offset] = pos[1];
		data[++offset] = 0;
		data[++offset] = 0;
		data[++offset] = alpha;
		data[++offset] = pos[2];
		data[++offset] = pos[3];
		data[++offset] = u2;
		data[++offset] = 0;
		data[++offset] = alpha;
		data[++offset] = pos[4];
		data[++offset] = pos[5];
		data[++offset] = u2;
		data[++offset] = v2;
		data[++offset] = alpha;
		data[++offset] = pos[6];
		data[++offset] = pos[7];
		data[++offset] = 0;
		data[++offset] = v2;
		data[++offset] = alpha;
	}
	,drawSubImage: function(texture,destX,destY,sourceX,sourceY,sourceW,sourceH) {
		var state = this._stateList;
		var texture1 = texture;
		var pos = this.transformQuad(destX,destY,sourceW,sourceH);
		var w = texture1._width;
		var h = texture1._height;
		var u1 = texture1.maxU * sourceX / w;
		var v1 = texture1.maxV * sourceY / h;
		var u2 = texture1.maxU * (sourceX + sourceW) / w;
		var v2 = texture1.maxV * (sourceY + sourceH) / h;
		var alpha = state.alpha;
		var offset = this._batcher.prepareDrawImage(this._renderTarget,state.blendMode,state.scissor,texture1);
		var data = this._batcher.data;
		data[offset] = pos[0];
		data[++offset] = pos[1];
		data[++offset] = u1;
		data[++offset] = v1;
		data[++offset] = alpha;
		data[++offset] = pos[2];
		data[++offset] = pos[3];
		data[++offset] = u2;
		data[++offset] = v1;
		data[++offset] = alpha;
		data[++offset] = pos[4];
		data[++offset] = pos[5];
		data[++offset] = u2;
		data[++offset] = v2;
		data[++offset] = alpha;
		data[++offset] = pos[6];
		data[++offset] = pos[7];
		data[++offset] = u1;
		data[++offset] = v2;
		data[++offset] = alpha;
	}
	,drawImage: function(texture,x,y) {
		this.drawSubImage(texture,x,y,0,0,texture.get_width(),texture.get_height());
	}
	,restore: function() {
		this._stateList = this._stateList.prev;
	}
	,transform: function(m00,m10,m01,m11,m02,m12) {
		var state = this._stateList;
		flambe.platform.html.WebGLGraphics._scratchMatrix.set(m00,m10,m01,m11,m02,m12);
		flambe.math.Matrix.multiply(state.matrix,flambe.platform.html.WebGLGraphics._scratchMatrix,state.matrix);
	}
	,save: function() {
		var current = this._stateList;
		var state = this._stateList.next;
		if(state == null) {
			state = new flambe.platform.html._WebGLGraphics.DrawingState();
			state.prev = current;
			current.next = state;
		}
		current.matrix.clone(state.matrix);
		state.alpha = current.alpha;
		state.blendMode = current.blendMode;
		state.scissor = current.scissor != null?current.scissor.clone(state.scissor):null;
		this._stateList = state;
	}
	,__class__: flambe.platform.html.WebGLGraphics
}
flambe.platform.html._WebGLGraphics = {}
flambe.platform.html._WebGLGraphics.DrawingState = function() {
	this.next = null;
	this.prev = null;
	this.scissor = null;
	this.matrix = new flambe.math.Matrix();
	this.alpha = 1;
	this.blendMode = flambe.display.BlendMode.Normal;
};
$hxClasses["flambe.platform.html._WebGLGraphics.DrawingState"] = flambe.platform.html._WebGLGraphics.DrawingState;
flambe.platform.html._WebGLGraphics.DrawingState.__name__ = ["flambe","platform","html","_WebGLGraphics","DrawingState"];
flambe.platform.html._WebGLGraphics.DrawingState.prototype = {
	applyScissor: function(x,y,width,height) {
		if(this.scissor != null) {
			var x1 = flambe.math.FMath.max(this.scissor.x,x);
			var y1 = flambe.math.FMath.max(this.scissor.y,y);
			var x2 = flambe.math.FMath.min(this.scissor.x + this.scissor.width,x + width);
			var y2 = flambe.math.FMath.min(this.scissor.y + this.scissor.height,y + height);
			x = x1;
			y = y1;
			width = x2 - x1;
			height = y2 - y1;
		} else this.scissor = new flambe.math.Rectangle();
		this.scissor.set(Math.round(x),Math.round(y),Math.round(width),Math.round(height));
	}
	,__class__: flambe.platform.html._WebGLGraphics.DrawingState
}
flambe.platform.html.WebGLRenderer = function(stage,gl) {
	var _g = this;
	this.gl = gl;
	gl.canvas.addEventListener("webglcontextlost",function(event) {
		event.preventDefault();
		flambe.System.hasGPU.set__(false);
	},false);
	gl.canvas.addEventListener("webglcontextrestore",function(event) {
		_g.init();
	},false);
	stage.resize.connect($bind(this,this.onResize));
	this.init();
};
$hxClasses["flambe.platform.html.WebGLRenderer"] = flambe.platform.html.WebGLRenderer;
flambe.platform.html.WebGLRenderer.__name__ = ["flambe","platform","html","WebGLRenderer"];
flambe.platform.html.WebGLRenderer.__interfaces__ = [flambe.platform.Renderer];
flambe.platform.html.WebGLRenderer.prototype = {
	init: function() {
		this.batcher = new flambe.platform.html.WebGLBatcher(this.gl);
		this.graphics = new flambe.platform.html.WebGLGraphics(this.batcher,null);
		this.onResize();
		flambe.System.hasGPU.set__(true);
	}
	,onResize: function() {
		var width = this.gl.canvas.width, height = this.gl.canvas.height;
		this.batcher.resizeBackbuffer(width,height);
		this.graphics.onResize(width,height);
	}
	,didRender: function() {
		this.graphics.didRender();
	}
	,willRender: function() {
		this.graphics.willRender();
	}
	,createCompressedTexture: function(format,data) {
		if(this.gl.isContextLost()) return null;
		return null;
	}
	,getCompressedTextureFormats: function() {
		return [];
	}
	,createTexture: function(image) {
		if(this.gl.isContextLost()) return null;
		var texture = new flambe.platform.html.WebGLTexture(this,image.width,image.height);
		texture.uploadImageData(image);
		return texture;
	}
	,__class__: flambe.platform.html.WebGLRenderer
}
flambe.platform.html.WebGLTexture = function(renderer,width,height) {
	this._graphics = null;
	this.framebuffer = null;
	flambe.platform.BasicAsset.call(this);
	this._renderer = renderer;
	this._width = width;
	this._height = height;
	this._widthPow2 = flambe.platform.html.WebGLTexture.nextPowerOfTwo(width);
	this._heightPow2 = flambe.platform.html.WebGLTexture.nextPowerOfTwo(height);
	this.maxU = width / this._widthPow2;
	this.maxV = height / this._heightPow2;
	var gl = renderer.gl;
	this.nativeTexture = gl.createTexture();
	renderer.batcher.bindTexture(this.nativeTexture);
	gl.texParameteri(3553,10242,33071);
	gl.texParameteri(3553,10243,33071);
	gl.texParameteri(3553,10240,9729);
	gl.texParameteri(3553,10241,9728);
};
$hxClasses["flambe.platform.html.WebGLTexture"] = flambe.platform.html.WebGLTexture;
flambe.platform.html.WebGLTexture.__name__ = ["flambe","platform","html","WebGLTexture"];
flambe.platform.html.WebGLTexture.__interfaces__ = [flambe.display.Texture];
flambe.platform.html.WebGLTexture.nextPowerOfTwo = function(n) {
	var p = 1;
	while(p < n) p <<= 1;
	return p;
}
flambe.platform.html.WebGLTexture.drawBorder = function(canvas,width,height) {
	var ctx = canvas.getContext("2d");
	ctx.drawImage(canvas,width - 1,0,1,height,width,0,1,height);
	ctx.drawImage(canvas,0,height - 1,width,1,0,height,width,1);
}
flambe.platform.html.WebGLTexture.__super__ = flambe.platform.BasicAsset;
flambe.platform.html.WebGLTexture.prototype = $extend(flambe.platform.BasicAsset.prototype,{
	get_height: function() {
		return this._height;
	}
	,get_width: function() {
		return this._width;
	}
	,onDisposed: function() {
		var batcher = this._renderer.batcher;
		batcher.deleteTexture(this);
		if(this.framebuffer != null) batcher.deleteFramebuffer(this);
		this.nativeTexture = null;
		this.framebuffer = null;
		this._graphics = null;
	}
	,uploadImageData: function(image) {
		if(this._widthPow2 != image.width || this._heightPow2 != image.height) {
			var resized = flambe.platform.html.HtmlUtil.createEmptyCanvas(this._widthPow2,this._heightPow2);
			resized.getContext("2d").drawImage(image,0,0);
			flambe.platform.html.WebGLTexture.drawBorder(resized,image.width,image.height);
			image = resized;
		}
		this._renderer.batcher.bindTexture(this.nativeTexture);
		var gl = this._renderer.gl;
		gl.texImage2D(3553,0,6408,6408,5121,image);
	}
	,__class__: flambe.platform.html.WebGLTexture
});
flambe.platform.shader = {}
flambe.platform.shader.ShaderGL = function(gl,vertSource,fragSource) {
	fragSource = ["#ifdef GL_ES","precision mediump float;","#endif"].join("\n") + "\n" + fragSource;
	this._gl = gl;
	this._program = gl.createProgram();
	gl.attachShader(this._program,flambe.platform.shader.ShaderGL.createShader(gl,35633,vertSource));
	gl.attachShader(this._program,flambe.platform.shader.ShaderGL.createShader(gl,35632,fragSource));
	gl.linkProgram(this._program);
	gl.useProgram(this._program);
};
$hxClasses["flambe.platform.shader.ShaderGL"] = flambe.platform.shader.ShaderGL;
flambe.platform.shader.ShaderGL.__name__ = ["flambe","platform","shader","ShaderGL"];
flambe.platform.shader.ShaderGL.createShader = function(gl,type,source) {
	var shader = gl.createShader(type);
	gl.shaderSource(shader,source);
	gl.compileShader(shader);
	return shader;
}
flambe.platform.shader.ShaderGL.prototype = {
	getUniformLocation: function(name) {
		var loc = this._gl.getUniformLocation(this._program,name);
		return loc;
	}
	,getAttribLocation: function(name) {
		var loc = this._gl.getAttribLocation(this._program,name);
		return loc;
	}
	,prepare: function() {
		null;
	}
	,useProgram: function() {
		this._gl.useProgram(this._program);
	}
	,__class__: flambe.platform.shader.ShaderGL
}
flambe.platform.shader.DrawImageGL = function(gl) {
	flambe.platform.shader.ShaderGL.call(this,gl,["attribute highp vec2 a_pos;","attribute mediump vec2 a_uv;","attribute lowp float a_alpha;","varying mediump vec2 v_uv;","varying lowp float v_alpha;","void main (void) {","v_uv = a_uv;","v_alpha = a_alpha;","gl_Position = vec4(a_pos, 0, 1);","}"].join("\n"),["varying mediump vec2 v_uv;","varying lowp float v_alpha;","uniform lowp sampler2D u_texture;","void main (void) {","gl_FragColor = texture2D(u_texture, v_uv) * v_alpha;","}"].join("\n"));
	this.a_pos = this.getAttribLocation("a_pos");
	this.a_uv = this.getAttribLocation("a_uv");
	this.a_alpha = this.getAttribLocation("a_alpha");
	this.u_texture = this.getUniformLocation("u_texture");
	this.setTexture(0);
};
$hxClasses["flambe.platform.shader.DrawImageGL"] = flambe.platform.shader.DrawImageGL;
flambe.platform.shader.DrawImageGL.__name__ = ["flambe","platform","shader","DrawImageGL"];
flambe.platform.shader.DrawImageGL.__super__ = flambe.platform.shader.ShaderGL;
flambe.platform.shader.DrawImageGL.prototype = $extend(flambe.platform.shader.ShaderGL.prototype,{
	prepare: function() {
		this._gl.enableVertexAttribArray(this.a_pos);
		this._gl.enableVertexAttribArray(this.a_uv);
		this._gl.enableVertexAttribArray(this.a_alpha);
		var bytesPerFloat = 4;
		var stride = 5 * bytesPerFloat;
		this._gl.vertexAttribPointer(this.a_pos,2,5126,false,stride,0 * bytesPerFloat);
		this._gl.vertexAttribPointer(this.a_uv,2,5126,false,stride,2 * bytesPerFloat);
		this._gl.vertexAttribPointer(this.a_alpha,1,5126,false,stride,4 * bytesPerFloat);
	}
	,setTexture: function(unit) {
		this._gl.uniform1i(this.u_texture,unit);
	}
	,__class__: flambe.platform.shader.DrawImageGL
});
flambe.platform.shader.DrawPatternGL = function(gl) {
	flambe.platform.shader.ShaderGL.call(this,gl,["attribute highp vec2 a_pos;","attribute mediump vec2 a_uv;","attribute lowp float a_alpha;","varying mediump vec2 v_uv;","varying lowp float v_alpha;","void main (void) {","v_uv = a_uv;","v_alpha = a_alpha;","gl_Position = vec4(a_pos, 0, 1);","}"].join("\n"),["varying mediump vec2 v_uv;","varying lowp float v_alpha;","uniform lowp sampler2D u_texture;","uniform mediump vec2 u_maxUV;","void main (void) {","gl_FragColor = texture2D(u_texture, mod(v_uv, u_maxUV)) * v_alpha;","}"].join("\n"));
	this.a_pos = this.getAttribLocation("a_pos");
	this.a_uv = this.getAttribLocation("a_uv");
	this.a_alpha = this.getAttribLocation("a_alpha");
	this.u_texture = this.getUniformLocation("u_texture");
	this.u_maxUV = this.getUniformLocation("u_maxUV");
	this.setTexture(0);
};
$hxClasses["flambe.platform.shader.DrawPatternGL"] = flambe.platform.shader.DrawPatternGL;
flambe.platform.shader.DrawPatternGL.__name__ = ["flambe","platform","shader","DrawPatternGL"];
flambe.platform.shader.DrawPatternGL.__super__ = flambe.platform.shader.ShaderGL;
flambe.platform.shader.DrawPatternGL.prototype = $extend(flambe.platform.shader.ShaderGL.prototype,{
	prepare: function() {
		this._gl.enableVertexAttribArray(this.a_pos);
		this._gl.enableVertexAttribArray(this.a_uv);
		this._gl.enableVertexAttribArray(this.a_alpha);
		var bytesPerFloat = 4;
		var stride = 5 * bytesPerFloat;
		this._gl.vertexAttribPointer(this.a_pos,2,5126,false,stride,0 * bytesPerFloat);
		this._gl.vertexAttribPointer(this.a_uv,2,5126,false,stride,2 * bytesPerFloat);
		this._gl.vertexAttribPointer(this.a_alpha,1,5126,false,stride,4 * bytesPerFloat);
	}
	,setMaxUV: function(maxU,maxV) {
		this._gl.uniform2f(this.u_maxUV,maxU,maxV);
	}
	,setTexture: function(unit) {
		this._gl.uniform1i(this.u_texture,unit);
	}
	,__class__: flambe.platform.shader.DrawPatternGL
});
flambe.platform.shader.FillRectGL = function(gl) {
	flambe.platform.shader.ShaderGL.call(this,gl,["attribute highp vec2 a_pos;","attribute lowp vec3 a_rgb;","attribute lowp float a_alpha;","varying lowp vec4 v_color;","void main (void) {","v_color = vec4(a_rgb*a_alpha, a_alpha);","gl_Position = vec4(a_pos, 0, 1);","}"].join("\n"),["varying lowp vec4 v_color;","void main (void) {","gl_FragColor = v_color;","}"].join("\n"));
	this.a_pos = this.getAttribLocation("a_pos");
	this.a_rgb = this.getAttribLocation("a_rgb");
	this.a_alpha = this.getAttribLocation("a_alpha");
};
$hxClasses["flambe.platform.shader.FillRectGL"] = flambe.platform.shader.FillRectGL;
flambe.platform.shader.FillRectGL.__name__ = ["flambe","platform","shader","FillRectGL"];
flambe.platform.shader.FillRectGL.__super__ = flambe.platform.shader.ShaderGL;
flambe.platform.shader.FillRectGL.prototype = $extend(flambe.platform.shader.ShaderGL.prototype,{
	prepare: function() {
		this._gl.enableVertexAttribArray(this.a_pos);
		this._gl.enableVertexAttribArray(this.a_rgb);
		this._gl.enableVertexAttribArray(this.a_alpha);
		var bytesPerFloat = 4;
		var stride = 6 * bytesPerFloat;
		this._gl.vertexAttribPointer(this.a_pos,2,5126,false,stride,0 * bytesPerFloat);
		this._gl.vertexAttribPointer(this.a_rgb,3,5126,false,stride,2 * bytesPerFloat);
		this._gl.vertexAttribPointer(this.a_alpha,1,5126,false,stride,5 * bytesPerFloat);
	}
	,__class__: flambe.platform.shader.FillRectGL
});
flambe.scene = {}
flambe.scene.Director = function() {
	this._transitor = null;
	this.scenes = [];
	this.occludedScenes = [];
	this._root = new flambe.Entity();
};
$hxClasses["flambe.scene.Director"] = flambe.scene.Director;
flambe.scene.Director.__name__ = ["flambe","scene","Director"];
flambe.scene.Director.__super__ = flambe.Component;
flambe.scene.Director.prototype = $extend(flambe.Component.prototype,{
	playTransition: function(from,to,transition,onComplete) {
		this.completeTransition();
		this.add(to);
		if(transition != null) {
			this.occludedScenes.push(from);
			this._transitor = new flambe.scene._Director.Transitor(from,to,transition,onComplete);
			this._transitor.init(this);
		} else {
			onComplete();
			this.invalidateVisibility();
		}
	}
	,completeTransition: function() {
		if(this._transitor != null) {
			this._transitor.complete();
			this._transitor = null;
			this.invalidateVisibility();
		}
	}
	,invalidateVisibility: function() {
		var ii = this.scenes.length;
		while(ii > 0) {
			var scene = this.scenes[--ii];
			var comp = scene._compMap.Scene_0;
			if(comp == null || comp.opaque) break;
		}
		this.occludedScenes = this.scenes.length > 0?this.scenes.slice(ii,this.scenes.length - 1):[];
		var scene = this.get_topScene();
		if(scene != null) this.show(scene);
	}
	,show: function(scene) {
		var events = scene._compMap.Scene_0;
		if(events != null) events.shown.emit();
	}
	,hideAndDispose: function(scene) {
		this.hide(scene);
		scene.dispose();
	}
	,hide: function(scene) {
		var events = scene._compMap.Scene_0;
		if(events != null) events.hidden.emit();
	}
	,add: function(scene) {
		var oldTop = this.get_topScene();
		if(oldTop != null) this._root.removeChild(oldTop);
		HxOverrides.remove(this.scenes,scene);
		this.scenes.push(scene);
		this._root.addChild(scene);
	}
	,get_topScene: function() {
		var ll = this.scenes.length;
		return ll > 0?this.scenes[ll - 1]:null;
	}
	,onUpdate: function(dt) {
		if(this._transitor != null && this._transitor.update(dt)) this.completeTransition();
	}
	,onRemoved: function() {
		this.completeTransition();
		var _g = 0, _g1 = this.scenes;
		while(_g < _g1.length) {
			var scene = _g1[_g];
			++_g;
			scene.dispose();
		}
		this.scenes = [];
		this.occludedScenes = [];
		this._root.dispose();
	}
	,onAdded: function() {
		this.owner.addChild(this._root);
	}
	,unwindToScene: function(scene,transition) {
		var _g = this;
		this.completeTransition();
		var oldTop = this.get_topScene();
		if(oldTop != null) {
			if(oldTop == scene) return;
			this.scenes.pop();
			while(this.scenes.length > 0 && this.scenes[this.scenes.length - 1] != scene) this.scenes.pop().dispose();
			this.playTransition(oldTop,scene,transition,function() {
				_g.hideAndDispose(oldTop);
			});
		} else this.pushScene(scene,transition);
	}
	,popScene: function(transition) {
		var _g = this;
		this.completeTransition();
		var oldTop = this.get_topScene();
		if(oldTop != null) {
			this.scenes.pop();
			var newTop = this.get_topScene();
			if(newTop != null) this.playTransition(oldTop,newTop,transition,function() {
				_g.hideAndDispose(oldTop);
			}); else {
				this.hideAndDispose(oldTop);
				this.invalidateVisibility();
			}
		}
	}
	,pushScene: function(scene,transition) {
		var _g = this;
		this.completeTransition();
		var oldTop = this.get_topScene();
		if(oldTop != null) this.playTransition(oldTop,scene,transition,function() {
			_g.hide(oldTop);
		}); else {
			this.add(scene);
			this.invalidateVisibility();
		}
	}
	,get_name: function() {
		return "Director_19";
	}
	,__class__: flambe.scene.Director
});
flambe.scene._Director = {}
flambe.scene._Director.Transitor = function(from,to,transition,onComplete) {
	this._from = from;
	this._to = to;
	this._transition = transition;
	this._onComplete = onComplete;
};
$hxClasses["flambe.scene._Director.Transitor"] = flambe.scene._Director.Transitor;
flambe.scene._Director.Transitor.__name__ = ["flambe","scene","_Director","Transitor"];
flambe.scene._Director.Transitor.prototype = {
	complete: function() {
		this._transition.complete();
		this._onComplete();
	}
	,update: function(dt) {
		return this._transition.update(dt);
	}
	,init: function(director) {
		this._transition.init(director,this._from,this._to);
	}
	,__class__: flambe.scene._Director.Transitor
}
flambe.scene.Transition = function() { }
$hxClasses["flambe.scene.Transition"] = flambe.scene.Transition;
flambe.scene.Transition.__name__ = ["flambe","scene","Transition"];
flambe.scene.Transition.prototype = {
	complete: function() {
	}
	,update: function(dt) {
		return true;
	}
	,init: function(director,from,to) {
		this._director = director;
		this._from = from;
		this._to = to;
	}
	,__class__: flambe.scene.Transition
}
flambe.scene.TweenTransition = function(duration,ease) {
	this._duration = duration;
	this._ease = ease != null?ease:flambe.animation.Ease.linear;
};
$hxClasses["flambe.scene.TweenTransition"] = flambe.scene.TweenTransition;
flambe.scene.TweenTransition.__name__ = ["flambe","scene","TweenTransition"];
flambe.scene.TweenTransition.__super__ = flambe.scene.Transition;
flambe.scene.TweenTransition.prototype = $extend(flambe.scene.Transition.prototype,{
	interp: function(from,to) {
		return from + (to - from) * this._ease(this._elapsed / this._duration);
	}
	,update: function(dt) {
		this._elapsed += dt;
		return this._elapsed >= this._duration;
	}
	,init: function(director,from,to) {
		flambe.scene.Transition.prototype.init.call(this,director,from,to);
		this._elapsed = 0;
	}
	,__class__: flambe.scene.TweenTransition
});
flambe.scene.FadeTransition = function(duration,ease) {
	flambe.scene.TweenTransition.call(this,duration,ease);
};
$hxClasses["flambe.scene.FadeTransition"] = flambe.scene.FadeTransition;
flambe.scene.FadeTransition.__name__ = ["flambe","scene","FadeTransition"];
flambe.scene.FadeTransition.__super__ = flambe.scene.TweenTransition;
flambe.scene.FadeTransition.prototype = $extend(flambe.scene.TweenTransition.prototype,{
	complete: function() {
		this._to._compMap.Sprite_5.alpha.set__(1);
	}
	,update: function(dt) {
		var done = flambe.scene.TweenTransition.prototype.update.call(this,dt);
		this._to._compMap.Sprite_5.alpha.set__(this.interp(0,1));
		return done;
	}
	,init: function(director,from,to) {
		flambe.scene.TweenTransition.prototype.init.call(this,director,from,to);
		var sprite = this._to._compMap.Sprite_5;
		if(sprite == null) this._to.add(sprite = new flambe.display.Sprite());
		sprite.alpha.set__(0);
	}
	,__class__: flambe.scene.FadeTransition
});
flambe.scene.Scene = function(opaque) {
	if(opaque == null) opaque = true;
	this.opaque = opaque;
	this.shown = new flambe.util.Signal0();
	this.hidden = new flambe.util.Signal0();
};
$hxClasses["flambe.scene.Scene"] = flambe.scene.Scene;
flambe.scene.Scene.__name__ = ["flambe","scene","Scene"];
flambe.scene.Scene.__super__ = flambe.Component;
flambe.scene.Scene.prototype = $extend(flambe.Component.prototype,{
	get_name: function() {
		return "Scene_0";
	}
	,__class__: flambe.scene.Scene
});
flambe.script = {}
flambe.script.Action = function() { }
$hxClasses["flambe.script.Action"] = flambe.script.Action;
flambe.script.Action.__name__ = ["flambe","script","Action"];
flambe.script.Action.prototype = {
	__class__: flambe.script.Action
}
flambe.script.AnimateTo = function(value,to,seconds,easing) {
	this._value = value;
	this._to = to;
	this._seconds = seconds;
	this._easing = easing;
};
$hxClasses["flambe.script.AnimateTo"] = flambe.script.AnimateTo;
flambe.script.AnimateTo.__name__ = ["flambe","script","AnimateTo"];
flambe.script.AnimateTo.__interfaces__ = [flambe.script.Action];
flambe.script.AnimateTo.prototype = {
	update: function(dt,actor) {
		if(this._tween == null) {
			this._tween = new flambe.animation.Tween(this._value._value,this._to,this._seconds,this._easing);
			this._value.set_behavior(this._tween);
			this._value.update(dt);
		}
		if(this._value._behavior != this._tween) {
			var overtime = this._tween.elapsed - this._seconds;
			this._tween = null;
			return overtime > 0?dt - overtime:0;
		}
		return -1;
	}
	,__class__: flambe.script.AnimateTo
}
flambe.script.CallFunction = function(fn) {
	this._fn = fn;
};
$hxClasses["flambe.script.CallFunction"] = flambe.script.CallFunction;
flambe.script.CallFunction.__name__ = ["flambe","script","CallFunction"];
flambe.script.CallFunction.__interfaces__ = [flambe.script.Action];
flambe.script.CallFunction.prototype = {
	update: function(dt,actor) {
		this._fn();
		return 0;
	}
	,__class__: flambe.script.CallFunction
}
flambe.script.Delay = function(seconds) {
	this._duration = seconds;
	this._elapsed = 0;
};
$hxClasses["flambe.script.Delay"] = flambe.script.Delay;
flambe.script.Delay.__name__ = ["flambe","script","Delay"];
flambe.script.Delay.__interfaces__ = [flambe.script.Action];
flambe.script.Delay.prototype = {
	update: function(dt,actor) {
		this._elapsed += dt;
		if(this._elapsed >= this._duration) {
			var overtime = this._elapsed - this._duration;
			this._elapsed = 0;
			return dt - overtime;
		}
		return -1;
	}
	,__class__: flambe.script.Delay
}
flambe.script.Repeat = function(action,count) {
	if(count == null) count = -1;
	this._action = action;
	this._count = count;
	this._remaining = count;
};
$hxClasses["flambe.script.Repeat"] = flambe.script.Repeat;
flambe.script.Repeat.__name__ = ["flambe","script","Repeat"];
flambe.script.Repeat.__interfaces__ = [flambe.script.Action];
flambe.script.Repeat.prototype = {
	update: function(dt,actor) {
		if(this._count == 0) return 0;
		var spent = this._action.update(dt,actor);
		if(this._count > 0 && spent >= 0 && --this._remaining == 0) {
			this._remaining = this._count;
			return spent;
		}
		return -1;
	}
	,__class__: flambe.script.Repeat
}
flambe.script.Script = function() {
	this.stopAll();
};
$hxClasses["flambe.script.Script"] = flambe.script.Script;
flambe.script.Script.__name__ = ["flambe","script","Script"];
flambe.script.Script.__super__ = flambe.Component;
flambe.script.Script.prototype = $extend(flambe.Component.prototype,{
	onUpdate: function(dt) {
		var ii = 0;
		while(ii < this._handles.length) {
			var handle = this._handles[ii];
			if(handle.removed || handle.action.update(dt,this.owner) >= 0) this._handles.splice(ii,1); else ++ii;
		}
	}
	,stopAll: function() {
		this._handles = [];
	}
	,run: function(action) {
		var handle = new flambe.script._Script.Handle(action);
		this._handles.push(handle);
		return handle;
	}
	,get_name: function() {
		return "Script_18";
	}
	,__class__: flambe.script.Script
});
flambe.script._Script = {}
flambe.script._Script.Handle = function(action) {
	this.removed = false;
	this.action = action;
};
$hxClasses["flambe.script._Script.Handle"] = flambe.script._Script.Handle;
flambe.script._Script.Handle.__name__ = ["flambe","script","_Script","Handle"];
flambe.script._Script.Handle.__interfaces__ = [flambe.util.Disposable];
flambe.script._Script.Handle.prototype = {
	dispose: function() {
		this.removed = true;
		this.action = null;
	}
	,__class__: flambe.script._Script.Handle
}
flambe.script.Sequence = function(actions) {
	this._idx = 0;
	this._runningActions = actions != null?actions.slice():[];
};
$hxClasses["flambe.script.Sequence"] = flambe.script.Sequence;
flambe.script.Sequence.__name__ = ["flambe","script","Sequence"];
flambe.script.Sequence.__interfaces__ = [flambe.script.Action];
flambe.script.Sequence.prototype = {
	update: function(dt,actor) {
		var total = 0.0;
		while(true) {
			var action = this._runningActions[this._idx];
			if(action != null) {
				var spent = action.update(dt - total,actor);
				if(spent >= 0) total += spent; else return -1;
			}
			++this._idx;
			if(this._idx >= this._runningActions.length) {
				this._idx = 0;
				break;
			} else if(total > dt) return -1;
		}
		return total;
	}
	,__class__: flambe.script.Sequence
}
flambe.swf = {}
flambe.swf.BitmapSprite = function(symbol) {
	flambe.display.Sprite.call(this);
	this.symbol = symbol;
	this.anchorX.set__(symbol.anchorX);
	this.anchorY.set__(symbol.anchorY);
};
$hxClasses["flambe.swf.BitmapSprite"] = flambe.swf.BitmapSprite;
flambe.swf.BitmapSprite.__name__ = ["flambe","swf","BitmapSprite"];
flambe.swf.BitmapSprite.__super__ = flambe.display.Sprite;
flambe.swf.BitmapSprite.prototype = $extend(flambe.display.Sprite.prototype,{
	getNaturalHeight: function() {
		return this.symbol.height;
	}
	,getNaturalWidth: function() {
		return this.symbol.width;
	}
	,draw: function(g) {
		g.drawSubImage(this.symbol.atlas,0,0,this.symbol.x,this.symbol.y,this.symbol.width,this.symbol.height);
	}
	,__class__: flambe.swf.BitmapSprite
});
flambe.swf.Symbol = function() { }
$hxClasses["flambe.swf.Symbol"] = flambe.swf.Symbol;
flambe.swf.Symbol.__name__ = ["flambe","swf","Symbol"];
flambe.swf.Symbol.prototype = {
	__class__: flambe.swf.Symbol
}
flambe.swf.BitmapSymbol = function(json,atlas) {
	this._name = json.symbol;
	this.atlas = atlas;
	var rect = json.rect;
	this.x = rect[0];
	this.y = rect[1];
	this.width = rect[2];
	this.height = rect[3];
	var origin = json.origin;
	if(origin != null) {
		this.anchorX = origin[0];
		this.anchorY = origin[1];
	} else {
		this.anchorX = 0;
		this.anchorY = 0;
	}
};
$hxClasses["flambe.swf.BitmapSymbol"] = flambe.swf.BitmapSymbol;
flambe.swf.BitmapSymbol.__name__ = ["flambe","swf","BitmapSymbol"];
flambe.swf.BitmapSymbol.__interfaces__ = [flambe.swf.Symbol];
flambe.swf.BitmapSymbol.prototype = {
	get_name: function() {
		return this._name;
	}
	,createSprite: function() {
		return new flambe.swf.BitmapSprite(this);
	}
	,__class__: flambe.swf.BitmapSymbol
}
flambe.swf.Library = function(pack,baseDir) {
	this._symbols = new haxe.ds.StringMap();
	var json = haxe.Json.parse(pack.getFile(baseDir + "/library.json").toString());
	this.frameRate = json.frameRate;
	var movies = [];
	var _g = 0, _g1 = json.movies;
	while(_g < _g1.length) {
		var movieObject = _g1[_g];
		++_g;
		var movie = new flambe.swf.MovieSymbol(this,movieObject);
		movies.push(movie);
		this._symbols.set(movie.get_name(),movie);
	}
	var groups = json.textureGroups;
	if(groups[0].scaleFactor != 1 || groups.length > 1) null;
	var atlases = groups[0].atlases;
	var _g = 0;
	while(_g < atlases.length) {
		var atlasObject = atlases[_g];
		++_g;
		var atlas = pack.getTexture(baseDir + "/" + flambe.util.Strings.removeFileExtension(atlasObject.file));
		var _g1 = 0, _g2 = atlasObject.textures;
		while(_g1 < _g2.length) {
			var textureObject = _g2[_g1];
			++_g1;
			var bitmap = new flambe.swf.BitmapSymbol(textureObject,atlas);
			this._symbols.set(bitmap.get_name(),bitmap);
		}
	}
	var _g = 0;
	while(_g < movies.length) {
		var movie = movies[_g];
		++_g;
		var _g1 = 0, _g2 = movie.layers;
		while(_g1 < _g2.length) {
			var layer = _g2[_g1];
			++_g1;
			var keyframes = layer.keyframes;
			var ll = keyframes.length;
			var _g3 = 0;
			while(_g3 < ll) {
				var ii = _g3++;
				var kf = keyframes[ii];
				if(kf.symbolName != null) {
					var symbol = this._symbols.get(kf.symbolName);
					kf.symbol = symbol;
				}
				if(kf.tweened && kf.duration == 1 && ii + 1 < ll) {
					var nextKf = keyframes[ii + 1];
					if(!nextKf.visible || nextKf.symbolName == null) kf.visible = false;
				}
			}
		}
	}
};
$hxClasses["flambe.swf.Library"] = flambe.swf.Library;
flambe.swf.Library.__name__ = ["flambe","swf","Library"];
flambe.swf.Library.prototype = {
	createSprite: function(symbolName,required) {
		if(required == null) required = true;
		var symbol = this._symbols.get(symbolName);
		if(symbol == null) {
			if(required) throw flambe.util.Strings.withFields("Missing symbol",["name",symbolName]);
			return null;
		}
		return symbol.createSprite();
	}
	,__class__: flambe.swf.Library
}
flambe.swf.MoviePlayer = function(lib) {
	this._loopingSprite = null;
	this._oneshotSprite = null;
	this._lib = lib;
	this._root = new flambe.Entity();
	this.movie = new flambe.util.Value(null);
	this.setCache(true);
};
$hxClasses["flambe.swf.MoviePlayer"] = flambe.swf.MoviePlayer;
flambe.swf.MoviePlayer.__name__ = ["flambe","swf","MoviePlayer"];
flambe.swf.MoviePlayer.__super__ = flambe.Component;
flambe.swf.MoviePlayer.prototype = $extend(flambe.Component.prototype,{
	setCurrent: function(current) {
		this._root.add(current);
		return this.movie.set__(current);
	}
	,createMovie: function(name) {
		var sprite = this._lib.createSprite(name,true);
		if(this._decorator != null) this._decorator(sprite);
		return sprite;
	}
	,playFromCache: function(name) {
		var sprite;
		if(this._cache != null) {
			sprite = this._cache.get(name);
			if(sprite != null) sprite.set_position(0); else {
				sprite = this.createMovie(name);
				this._cache.set(name,sprite);
			}
		} else sprite = this.createMovie(name);
		return this.setCurrent(sprite);
	}
	,onUpdate: function(dt) {
		if(this._oneshotSprite != null && this._oneshotSprite._position + dt > this._oneshotSprite.symbol.duration) {
			this._oneshotSprite = null;
			this.setCurrent(this._loopingSprite);
		}
	}
	,onRemoved: function() {
		this._root.dispose();
		this._oneshotSprite = this._loopingSprite = null;
		this.movie.set__(null);
	}
	,onAdded: function() {
		this.owner.addChild(this._root);
	}
	,loop: function(name,restart) {
		if(restart == null) restart = true;
		if(restart || this._loopingSprite == null || this._loopingSprite.symbol.get_name() != name) {
			this._oneshotSprite = null;
			this._loopingSprite = this.playFromCache(name);
		}
		return this;
	}
	,play: function(name,restart) {
		if(restart == null) restart = true;
		if(restart || this._oneshotSprite == null || this._oneshotSprite.symbol.get_name() != name) this._oneshotSprite = this.playFromCache(name);
		return this;
	}
	,setCache: function(cache) {
		this._cache = cache?new haxe.ds.StringMap():null;
		return this;
	}
	,get_name: function() {
		return "MoviePlayer_11";
	}
	,__class__: flambe.swf.MoviePlayer
});
flambe.swf.MovieSprite = function(symbol) {
	this._looped = null;
	flambe.display.Sprite.call(this);
	this.symbol = symbol;
	this.speed = new flambe.animation.AnimatedFloat(1);
	this._animators = new Array(symbol.layers.length);
	var _g1 = 0, _g = this._animators.length;
	while(_g1 < _g) {
		var ii = _g1++;
		var layer = symbol.layers[ii];
		this._animators[ii] = new flambe.swf._MovieSprite.LayerAnimator(layer);
	}
	this._frame = 0;
	this._position = 0;
	this["goto"](1);
};
$hxClasses["flambe.swf.MovieSprite"] = flambe.swf.MovieSprite;
flambe.swf.MovieSprite.__name__ = ["flambe","swf","MovieSprite"];
flambe.swf.MovieSprite.__super__ = flambe.display.Sprite;
flambe.swf.MovieSprite.prototype = $extend(flambe.display.Sprite.prototype,{
	rewind: function() {
		this._position = 0;
		this._flags = this._flags | 32;
	}
	,set_position: function(position) {
		return this._position = flambe.math.FMath.clamp(position,0,this.symbol.duration);
	}
	,'goto': function(newFrame) {
		if(this._frame == newFrame) return;
		var wrapped = newFrame < this._frame;
		if(wrapped) {
			var _g = 0, _g1 = this._animators;
			while(_g < _g1.length) {
				var animator = _g1[_g];
				++_g;
				animator.needsKeyframeUpdate = true;
				animator.keyframeIdx = 0;
			}
		}
		var _g = 0, _g1 = this._animators;
		while(_g < _g1.length) {
			var animator = _g1[_g];
			++_g;
			animator.composeFrame(newFrame);
		}
		this._frame = newFrame;
	}
	,onUpdate: function(dt) {
		flambe.display.Sprite.prototype.onUpdate.call(this,dt);
		this.speed.update(dt);
		var _g = this._flags & 48;
		switch(_g) {
		case 0:
			this._position += this.speed._value * dt;
			if(this._position > this.symbol.duration) {
				this._position = this._position % this.symbol.duration;
				if(this._looped != null) this._looped.emit();
			}
			break;
		case 32:
			this._flags = this._flags & -33;
			break;
		}
		var newFrame = this._position * this.symbol.frameRate;
		this["goto"](newFrame);
	}
	,onRemoved: function() {
		flambe.display.Sprite.prototype.onRemoved.call(this);
		var _g = 0, _g1 = this._animators;
		while(_g < _g1.length) {
			var animator = _g1[_g];
			++_g;
			this.owner.removeChild(animator.content);
		}
	}
	,onAdded: function() {
		flambe.display.Sprite.prototype.onAdded.call(this);
		var _g = 0, _g1 = this._animators;
		while(_g < _g1.length) {
			var animator = _g1[_g];
			++_g;
			this.owner.addChild(animator.content);
		}
	}
	,__class__: flambe.swf.MovieSprite
});
flambe.swf._MovieSprite = {}
flambe.swf._MovieSprite.LayerAnimator = function(layer) {
	this.keyframeIdx = 0;
	this.needsKeyframeUpdate = false;
	this.layer = layer;
	this.content = new flambe.Entity();
	if(layer.empty) this._sprites = null; else {
		this._sprites = new Array(layer.keyframes.length);
		var _g1 = 0, _g = this._sprites.length;
		while(_g1 < _g) {
			var ii = _g1++;
			var kf = layer.keyframes[ii];
			if(ii > 0 && layer.keyframes[ii - 1].symbol == kf.symbol) this._sprites[ii] = this._sprites[ii - 1]; else if(kf.symbol == null) this._sprites[ii] = new flambe.display.Sprite(); else this._sprites[ii] = kf.symbol.createSprite();
		}
		this.content.add(this._sprites[0]);
	}
};
$hxClasses["flambe.swf._MovieSprite.LayerAnimator"] = flambe.swf._MovieSprite.LayerAnimator;
flambe.swf._MovieSprite.LayerAnimator.__name__ = ["flambe","swf","_MovieSprite","LayerAnimator"];
flambe.swf._MovieSprite.LayerAnimator.prototype = {
	composeFrame: function(frame) {
		if(this._sprites == null) return;
		var keyframes = this.layer.keyframes;
		var finalFrame = keyframes.length - 1;
		if(frame > this.layer.frames) {
			this.content._compMap.Sprite_5.set_visible(false);
			this.keyframeIdx = finalFrame;
			this.needsKeyframeUpdate = true;
			return;
		}
		while(this.keyframeIdx < finalFrame && keyframes[this.keyframeIdx + 1].index <= frame) {
			++this.keyframeIdx;
			this.needsKeyframeUpdate = true;
		}
		var sprite;
		if(this.needsKeyframeUpdate) {
			this.needsKeyframeUpdate = false;
			sprite = this._sprites[this.keyframeIdx];
			if(sprite != this.content._compMap.Sprite_5) {
				if(Type.getClass(sprite) == flambe.swf.MovieSprite) {
					var movie = sprite;
					movie.rewind();
				}
				this.content.add(sprite);
			}
		} else sprite = this.content._compMap.Sprite_5;
		var kf = keyframes[this.keyframeIdx];
		var visible = kf.visible && kf.symbol != null;
		sprite.set_visible(visible);
		if(!visible) return;
		var x = kf.x;
		var y = kf.y;
		var scaleX = kf.scaleX;
		var scaleY = kf.scaleY;
		var skewX = kf.skewX;
		var skewY = kf.skewY;
		var alpha = kf.alpha;
		if(kf.tweened && this.keyframeIdx < finalFrame) {
			var interp = (frame - kf.index) / kf.duration;
			var ease = kf.ease;
			if(ease != 0) {
				var t;
				if(ease < 0) {
					var inv = 1 - interp;
					t = 1 - inv * inv;
					ease = -ease;
				} else t = interp * interp;
				interp = ease * t + (1 - ease) * interp;
			}
			var nextKf = keyframes[this.keyframeIdx + 1];
			x += (nextKf.x - x) * interp;
			y += (nextKf.y - y) * interp;
			scaleX += (nextKf.scaleX - scaleX) * interp;
			scaleY += (nextKf.scaleY - scaleY) * interp;
			skewX += (nextKf.skewX - skewX) * interp;
			skewY += (nextKf.skewY - skewY) * interp;
			alpha += (nextKf.alpha - alpha) * interp;
		}
		var matrix = sprite.getLocalMatrix();
		var sinX = Math.sin(skewX), cosX = Math.cos(skewX);
		var sinY = Math.sin(skewY), cosY = Math.cos(skewY);
		matrix.set(cosY * scaleX,sinY * scaleX,-sinX * scaleY,cosX * scaleY,x,y);
		matrix.translate(-kf.pivotX,-kf.pivotY);
		sprite.alpha.set__(alpha);
	}
	,__class__: flambe.swf._MovieSprite.LayerAnimator
}
flambe.swf.MovieSymbol = function(lib,json) {
	this._name = json.id;
	this.frameRate = lib.frameRate;
	this.frames = 0;
	this.layers = new Array(json.layers.length);
	var _g1 = 0, _g = this.layers.length;
	while(_g1 < _g) {
		var ii = _g1++;
		var layer = new flambe.swf.MovieLayer(json.layers[ii]);
		this.frames = Math.max(layer.frames,this.frames);
		this.layers[ii] = layer;
	}
	this.duration = this.frames / this.frameRate;
};
$hxClasses["flambe.swf.MovieSymbol"] = flambe.swf.MovieSymbol;
flambe.swf.MovieSymbol.__name__ = ["flambe","swf","MovieSymbol"];
flambe.swf.MovieSymbol.__interfaces__ = [flambe.swf.Symbol];
flambe.swf.MovieSymbol.prototype = {
	createSprite: function() {
		return new flambe.swf.MovieSprite(this);
	}
	,get_name: function() {
		return this._name;
	}
	,__class__: flambe.swf.MovieSymbol
}
flambe.swf.MovieLayer = function(json) {
	this.empty = true;
	this.name = json.name;
	var prevKf = null;
	this.keyframes = new Array(json.keyframes.length);
	var _g1 = 0, _g = this.keyframes.length;
	while(_g1 < _g) {
		var ii = _g1++;
		prevKf = new flambe.swf.MovieKeyframe(json.keyframes[ii],prevKf);
		this.keyframes[ii] = prevKf;
		this.empty = this.empty && prevKf.symbolName == null;
	}
	this.frames = prevKf != null?prevKf.index + (prevKf.duration | 0):0;
};
$hxClasses["flambe.swf.MovieLayer"] = flambe.swf.MovieLayer;
flambe.swf.MovieLayer.__name__ = ["flambe","swf","MovieLayer"];
flambe.swf.MovieLayer.prototype = {
	__class__: flambe.swf.MovieLayer
}
flambe.swf.MovieKeyframe = function(json,prevKf) {
	this.ease = 0;
	this.tweened = true;
	this.visible = true;
	this.alpha = 1;
	this.pivotY = 0;
	this.pivotX = 0;
	this.skewY = 0;
	this.skewX = 0;
	this.scaleY = 1;
	this.scaleX = 1;
	this.y = 0;
	this.x = 0;
	this.symbol = null;
	this.index = prevKf != null?prevKf.index + prevKf.duration:0;
	this.duration = json.duration;
	this.label = json.label;
	this.symbolName = json.ref;
	var loc = json.loc;
	if(loc != null) {
		this.x = loc[0];
		this.y = loc[1];
	}
	var scale = json.scale;
	if(scale != null) {
		this.scaleX = scale[0];
		this.scaleY = scale[1];
	}
	var skew = json.skew;
	if(skew != null) {
		this.skewX = skew[0];
		this.skewY = skew[1];
	}
	var pivot = json.pivot;
	if(pivot != null) {
		this.pivotX = pivot[0];
		this.pivotY = pivot[1];
	}
	if(json.alpha != null) this.alpha = json.alpha;
	if(json.visible != null) this.visible = json.visible;
	if(json.tweened != null) this.tweened = json.tweened;
	if(json.ease != null) this.ease = json.ease;
};
$hxClasses["flambe.swf.MovieKeyframe"] = flambe.swf.MovieKeyframe;
flambe.swf.MovieKeyframe.__name__ = ["flambe","swf","MovieKeyframe"];
flambe.swf.MovieKeyframe.prototype = {
	__class__: flambe.swf.MovieKeyframe
}
flambe.util.BitSets = function() { }
$hxClasses["flambe.util.BitSets"] = flambe.util.BitSets;
flambe.util.BitSets.__name__ = ["flambe","util","BitSets"];
flambe.util.BitSets.set = function(bits,mask,enabled) {
	return enabled?bits | mask:bits & ~mask;
}
flambe.util.Promise = function() {
	this.success = new flambe.util.Signal1();
	this.error = new flambe.util.Signal1();
	this.progressChanged = new flambe.util.Signal0();
	this.hasResult = false;
	this._progress = 0;
	this._total = 0;
};
$hxClasses["flambe.util.Promise"] = flambe.util.Promise;
flambe.util.Promise.__name__ = ["flambe","util","Promise"];
flambe.util.Promise.prototype = {
	set_total: function(total) {
		if(this._total != total) {
			this._total = total;
			this.progressChanged.emit();
		}
		return total;
	}
	,set_progress: function(progress) {
		if(this._progress != progress) {
			this._progress = progress;
			this.progressChanged.emit();
		}
		return progress;
	}
	,get: function(fn) {
		if(this.hasResult) {
			fn(this._result);
			return null;
		}
		return this.success.connect(fn).once();
	}
	,set_result: function(result) {
		if(this.hasResult) throw "Promise result already assigned";
		this._result = result;
		this.hasResult = true;
		this.success.emit(result);
		return result;
	}
	,__class__: flambe.util.Promise
}
flambe.util.Signal0 = function(listener) {
	flambe.util.SignalBase.call(this,listener);
};
$hxClasses["flambe.util.Signal0"] = flambe.util.Signal0;
flambe.util.Signal0.__name__ = ["flambe","util","Signal0"];
flambe.util.Signal0.__super__ = flambe.util.SignalBase;
flambe.util.Signal0.prototype = $extend(flambe.util.SignalBase.prototype,{
	emitImpl: function() {
		var head = this.willEmit();
		var p = head;
		while(p != null) {
			p._listener();
			if(!p.stayInList) p.dispose();
			p = p._next;
		}
		this.didEmit(head);
	}
	,emit: function() {
		var _g = this;
		if(this._head == flambe.util.SignalBase.DISPATCHING_SENTINEL) this.defer(function() {
			_g.emitImpl();
		}); else this.emitImpl();
	}
	,connect: function(listener,prioritize) {
		if(prioritize == null) prioritize = false;
		return this.connectImpl(listener,prioritize);
	}
	,__class__: flambe.util.Signal0
});
flambe.util._SignalBase = {}
flambe.util._SignalBase.Task = function(fn) {
	this.next = null;
	this.fn = fn;
};
$hxClasses["flambe.util._SignalBase.Task"] = flambe.util._SignalBase.Task;
flambe.util._SignalBase.Task.__name__ = ["flambe","util","_SignalBase","Task"];
flambe.util._SignalBase.Task.prototype = {
	__class__: flambe.util._SignalBase.Task
}
flambe.util.Strings = function() { }
$hxClasses["flambe.util.Strings"] = flambe.util.Strings;
flambe.util.Strings.__name__ = ["flambe","util","Strings"];
flambe.util.Strings.getFileExtension = function(fileName) {
	var dot = fileName.lastIndexOf(".");
	return dot > 0?HxOverrides.substr(fileName,dot + 1,null):null;
}
flambe.util.Strings.removeFileExtension = function(fileName) {
	var dot = fileName.lastIndexOf(".");
	return dot > 0?HxOverrides.substr(fileName,0,dot):fileName;
}
flambe.util.Strings.getUrlExtension = function(url) {
	var question = url.lastIndexOf("?");
	if(question >= 0) url = HxOverrides.substr(url,0,question);
	var slash = url.lastIndexOf("/");
	if(slash >= 0) url = HxOverrides.substr(url,slash + 1,null);
	return flambe.util.Strings.getFileExtension(url);
}
flambe.util.Strings.joinPath = function(base,relative) {
	if(base.charCodeAt(base.length - 1) != 47) base += "/";
	return base + relative;
}
flambe.util.Strings.withFields = function(message,fields) {
	var ll = fields.length;
	if(ll > 0) {
		message += message.length > 0?" [":"[";
		var ii = 0;
		while(ii < ll) {
			if(ii > 0) message += ", ";
			var name = fields[ii];
			var value = fields[ii + 1];
			if(js.Boot.__instanceof(value,Error)) {
				var stack = value.stack;
				if(stack != null) value = stack;
			}
			message += name + "=" + Std.string(value);
			ii += 2;
		}
		message += "]";
	}
	return message;
}
var util = {}
util.NDiLine = function(point0,point1) {
	this.startingPoint = point0;
	this.endingPoint = point1;
	this.nameLine = this.get_name();
	this.transform = new flambe.display.Sprite();
	this.distance = math.NDiVector2D.getDistance(this.startingPoint,this.endingPoint);
};
$hxClasses["util.NDiLine"] = util.NDiLine;
util.NDiLine.__name__ = ["util","NDiLine"];
util.NDiLine.__super__ = flambe.Component;
util.NDiLine.prototype = $extend(flambe.Component.prototype,{
	addToEntity: function() {
		this.entity = new flambe.Entity();
		this.entity.add(this);
		return this.entity;
	}
	,updateLine: function() {
		this.line.x.set__(this.startingPoint.x);
		this.line.y.set__(this.startingPoint.y);
		this.distance = math.NDiVector2D.getDistance(this.startingPoint,this.endingPoint);
		this.line.rotation.set__(math.NDiVector2D.getAngle(this.startingPoint,this.endingPoint));
	}
	,get_name: function() {
		return "NDiLine_9";
	}
	,__class__: util.NDiLine
});
util.NDiPatternLine = function(point0,point1,thickness,texture) {
	util.NDiLine.call(this,point0,point1);
	this.line = new flambe.display.PatternSprite(texture,this.distance,thickness);
	this.line.setAnchor(0,this.getLine().height._value * 0.5);
};
$hxClasses["util.NDiPatternLine"] = util.NDiPatternLine;
util.NDiPatternLine.__name__ = ["util","NDiPatternLine"];
util.NDiPatternLine.__super__ = util.NDiLine;
util.NDiPatternLine.prototype = $extend(util.NDiLine.prototype,{
	onAdded: function() {
		this.entity.addChild(new flambe.Entity().add(this.line));
		this.entity.add(this.transform);
		this.updateLine();
	}
	,updateLine: function() {
		util.NDiLine.prototype.updateLine.call(this);
		this.getLine().width.set__(this.distance);
	}
	,getLine: function() {
		return this.line;
	}
	,__class__: util.NDiPatternLine
});
var game_objects = {}
game_objects.NDiLaser = function(point0,point1) {
	this.thickness = 13;
	this.gridPosition = new Array();
	var laserTexture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/panels/laser/laser");
	var edgeTexture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/panels/laser/laser_edge");
	this.edgeLeft = new flambe.display.ImageSprite(edgeTexture);
	this.edgeRight = new flambe.display.ImageSprite(edgeTexture);
	util.NDiPatternLine.call(this,point0,point1,this.thickness,laserTexture);
};
$hxClasses["game_objects.NDiLaser"] = game_objects.NDiLaser;
game_objects.NDiLaser.__name__ = ["game_objects","NDiLaser"];
game_objects.NDiLaser.__super__ = util.NDiPatternLine;
game_objects.NDiLaser.prototype = $extend(util.NDiPatternLine.prototype,{
	onAdded: function() {
		this.edgeLeft.centerAnchor();
		this.edgeRight.centerAnchor();
		this.edgeLeft.x.set__(this.startingPoint.x);
		this.edgeLeft.y.set__(this.startingPoint.y);
		this.edgeRight.x.set__(this.endingPoint.x);
		this.edgeRight.y.set__(this.endingPoint.y);
		this.edgeRight.scaleX.set__(-1);
		util.NDiPatternLine.prototype.onAdded.call(this);
		this.entity.addChild(new flambe.Entity().add(this.edgeLeft));
		this.entity.addChild(new flambe.Entity().add(this.edgeRight));
	}
	,updateLine: function() {
		util.NDiPatternLine.prototype.updateLine.call(this);
		this.edgeLeft.x.set__(this.startingPoint.x);
		this.edgeLeft.y.set__(this.startingPoint.y);
		this.edgeRight.x.set__(this.endingPoint.x);
		this.edgeRight.y.set__(this.endingPoint.y);
		this.edgeLeft.rotation.set__(this.line.rotation._value);
		this.edgeRight.rotation.set__(this.line.rotation._value);
	}
	,__class__: game_objects.NDiLaser
});
var scenes = {}
scenes.components = {}
scenes.components.NDiAnimationMovie = function(lib,name) {
	flambe.swf.MoviePlayer.call(this,lib);
	this.transform = new flambe.display.Sprite();
	this.animationName = name;
};
$hxClasses["scenes.components.NDiAnimationMovie"] = scenes.components.NDiAnimationMovie;
scenes.components.NDiAnimationMovie.__name__ = ["scenes","components","NDiAnimationMovie"];
scenes.components.NDiAnimationMovie.__super__ = flambe.swf.MoviePlayer;
scenes.components.NDiAnimationMovie.prototype = $extend(flambe.swf.MoviePlayer.prototype,{
	'delete': function() {
		this.owner.dispose();
	}
	,onAdded: function() {
		flambe.swf.MoviePlayer.prototype.onAdded.call(this);
		this.owner.add(this.transform);
		this.owner.add(new flambe.script.Script());
	}
	,animationDisappear: function(posfix) {
		if(posfix == null) posfix = "_disappear";
		var _g = this;
		this.play(this.animationName + "" + posfix);
		var f1 = new flambe.script.CallFunction(function() {
			_g["delete"]();
		});
		var seq1 = new flambe.script.Sequence([new flambe.script.Delay(0.5),f1]);
		this.owner._compMap.Script_18.run(seq1);
	}
	,animationCreate: function(posfix) {
		if(posfix == null) posfix = "_create";
		this.play(this.animationName + "" + posfix);
	}
	,animationIdle: function(isLoop,time,posfix,func,param1) {
		if(posfix == null) posfix = "_idle";
		if(time == null) time = 0;
		if(isLoop == null) isLoop = true;
		var _g = this;
		this.loop(this.animationName + "" + posfix);
		if(!isLoop) {
			var f1 = new flambe.script.CallFunction(function() {
				_g["delete"]();
				if(func != null) func(param1);
			});
			var seq1 = new flambe.script.Sequence([new flambe.script.Delay(time),f1]);
			this.owner._compMap.Script_18.run(seq1);
		}
	}
	,__class__: scenes.components.NDiAnimationMovie
});
game_objects.NDiWeed = function(lib,valueLife,turtle) {
	scenes.components.NDiAnimationMovie.call(this,lib,globals.NDiGameConstants.WEED_ANIMATION_PREFIX);
	this.life = this.totalLife = valueLife;
	this.parentTurtle = turtle;
};
$hxClasses["game_objects.NDiWeed"] = game_objects.NDiWeed;
game_objects.NDiWeed.__name__ = ["game_objects","NDiWeed"];
game_objects.NDiWeed.__super__ = scenes.components.NDiAnimationMovie;
game_objects.NDiWeed.prototype = $extend(scenes.components.NDiAnimationMovie.prototype,{
	receiveDamage: function(valueDamage) {
		this.life -= valueDamage;
		this.life = this.life < 0?0:this.life;
		var alphaValue = this.life / this.totalLife;
		this.transform.alpha.animateTo(alphaValue,0.3);
		if(this.life == 0) {
			this["delete"]();
			this.parentTurtle.isBlocked = false;
		}
	}
	,__class__: game_objects.NDiWeed
});
game_objects.enemies = {}
game_objects.enemies.NDiEnemy = function(index) {
	this.indexEnemy = index;
	this.libraryAnimations = managers.NDiResourcesManager.getInstance().loadSetAnimations(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.ARRAY_PACK_ANIMATIONS_ENEMIES[this.indexEnemy]);
	flambe.swf.MoviePlayer.call(this,this.libraryAnimations);
	this.enemyName = globals.NDiGameConstants.ARRAY_ANIMATION_PREFIX_ENEMIES[this.indexEnemy];
	this.life = 100;
	this.totalLife = 100;
	this.transform = new flambe.display.Sprite();
	this.type = globals.NDiTypeEnemy.NDI_TYPE_ENEMY_NONE;
	this.attackLenghtTime = 1;
	this.turnsToAttack = 0;
	this.totalTurnsToAttack = 0;
};
$hxClasses["game_objects.enemies.NDiEnemy"] = game_objects.enemies.NDiEnemy;
game_objects.enemies.NDiEnemy.__name__ = ["game_objects","enemies","NDiEnemy"];
game_objects.enemies.NDiEnemy.__super__ = flambe.swf.MoviePlayer;
game_objects.enemies.NDiEnemy.prototype = $extend(flambe.swf.MoviePlayer.prototype,{
	'delete': function() {
		this.entity.dispose();
	}
	,addToEntity: function() {
		this.entity = new flambe.Entity();
		this.entity.add(this);
		return this.entity;
	}
	,onAdded: function() {
		var _g = this;
		flambe.swf.MoviePlayer.prototype.onAdded.call(this);
		this.owner.add(new flambe.script.Script());
		this.entity.add(this.transform);
		var f1 = new flambe.script.CallFunction(function() {
			_g.onAddedFunction();
		});
		var seq1 = new flambe.script.Sequence([new flambe.script.Delay(0.2),f1]);
		this.owner._compMap.Script_18.run(seq1);
	}
	,onAddedFunction: function() {
	}
	,setConfigEnemy: function(config) {
	}
	,specialAttack: function() {
	}
	,receiveDamage: function(matchingFrequency) {
		var valueAttack = 0;
		var itTurtle = matchingFrequency.keys();
		while( itTurtle.hasNext() ) {
			var key = itTurtle.next();
			if(key != globals.NDiGameConstants.TOTAL_TURTLES_TYPE) {
				var numTokens = matchingFrequency.get(key);
				var coef = globals.NDiGameConstants.ATTACK_COEF;
				var newValueAttack = globals.NDiGameConstants.ATTACK_DMG * (1 + (numTokens - 1) * coef) * matchingFrequency.get(globals.NDiGameConstants.TOTAL_TURTLES_TYPE);
				newValueAttack = Math.abs(newValueAttack);
				valueAttack += newValueAttack;
			}
		}
		if(valueAttack <= 0) return valueAttack;
		this.life -= valueAttack;
		if(this.life > 0) this.animationHit();
		return valueAttack;
	}
	,turnSpecialAttack: function(matchingFrequency) {
		this.turnsToAttack++;
	}
	,animationAttack: function() {
		this.play(this.enemyName + "_attack");
	}
	,animationDeath: function() {
		this.play(this.enemyName + "_death");
	}
	,animationAppear: function() {
		this.play(this.enemyName + "_appear");
	}
	,animationHit: function() {
		this.play(this.enemyName + "_hitReceive");
	}
	,animationIdle: function() {
		this.loop(this.enemyName + "_idle");
	}
	,__class__: game_objects.enemies.NDiEnemy
});
game_objects.enemies.NDiDogPoundEnemy = function(index) {
	game_objects.enemies.NDiEnemy.call(this,index);
};
$hxClasses["game_objects.enemies.NDiDogPoundEnemy"] = game_objects.enemies.NDiDogPoundEnemy;
game_objects.enemies.NDiDogPoundEnemy.__name__ = ["game_objects","enemies","NDiDogPoundEnemy"];
game_objects.enemies.NDiDogPoundEnemy.__super__ = game_objects.enemies.NDiEnemy;
game_objects.enemies.NDiDogPoundEnemy.prototype = $extend(game_objects.enemies.NDiEnemy.prototype,{
	onAdded: function() {
		game_objects.enemies.NDiEnemy.prototype.onAdded.call(this);
		this.specialAttack();
	}
	,onUpdate: function(dt) {
		game_objects.enemies.NDiEnemy.prototype.onUpdate.call(this,dt);
	}
	,specialAttack: function() {
		this.parentManager.getParentGamePlay().doShufflePuzzle();
		managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.SOUND_ENEMY_SPECIALATTACK_FOLDER + "" + this.enemyName + "" + globals.NDiGameConstants.SOUND_ENEMY_SPECIALATTACK_POSTFIX);
	}
	,receiveDamage: function(matchingFrequency) {
		return game_objects.enemies.NDiEnemy.prototype.receiveDamage.call(this,matchingFrequency);
	}
	,__class__: game_objects.enemies.NDiDogPoundEnemy
});
game_objects.enemies.NDiFootBotEnemy = function(index) {
	game_objects.enemies.NDiEnemy.call(this,index);
	this.currentColor = -1;
	this.currentTypeTurtle = globals.NDiTypeToken.NDI_TYPE_TURTLE_NONE;
	this.enemyNameVariable = this.enemyName;
	this.life = this.totalLife = 100;
};
$hxClasses["game_objects.enemies.NDiFootBotEnemy"] = game_objects.enemies.NDiFootBotEnemy;
game_objects.enemies.NDiFootBotEnemy.__name__ = ["game_objects","enemies","NDiFootBotEnemy"];
game_objects.enemies.NDiFootBotEnemy.__super__ = game_objects.enemies.NDiEnemy;
game_objects.enemies.NDiFootBotEnemy.prototype = $extend(game_objects.enemies.NDiEnemy.prototype,{
	onUpdate: function(dt) {
		if(this.parentManager.getParentGamePlay().isGameOver || this.parentManager.isChanging) return;
		game_objects.enemies.NDiEnemy.prototype.onUpdate.call(this,dt);
	}
	,onAdded: function() {
		game_objects.enemies.NDiEnemy.prototype.onAdded.call(this);
		this.changeColor();
	}
	,setConfigEnemy: function(config) {
		this.totalTurnsToAttack = config.get("param1");
	}
	,turnSpecialAttack: function(matchingFrequency) {
		game_objects.enemies.NDiEnemy.prototype.turnSpecialAttack.call(this,matchingFrequency);
		if(this.turnsToAttack == this.totalTurnsToAttack) {
			this.changeColor();
			this.turnsToAttack = 0;
		}
	}
	,receiveDamage: function(matchingFrequency) {
		var valueAttack = 0;
		var valueAttack1 = 0;
		var itTurtle = matchingFrequency.keys();
		while( itTurtle.hasNext() ) {
			var key = itTurtle.next();
			if(key != globals.NDiGameConstants.TOTAL_TURTLES_TYPE) {
				var numTokens = matchingFrequency.get(key);
				var coef = globals.NDiGameConstants.ATTACK_COEF;
				var newValueAttack = globals.NDiGameConstants.ATTACK_DMG * (1 + (numTokens - 1) * coef) * matchingFrequency.get(globals.NDiGameConstants.TOTAL_TURTLES_TYPE);
				newValueAttack = Math.abs(newValueAttack);
				if(key == this.currentTypeTurtle[0]) valueAttack1 += newValueAttack; else valueAttack1 += newValueAttack * 0.3333333;
			}
		}
		if(valueAttack1 <= 0) return valueAttack1;
		this.life -= valueAttack1;
		if(this.life > 0) this.animationHit();
		return valueAttack1;
	}
	,animationAttack: function() {
		this.play(this.enemyNameVariable + "_attack");
	}
	,animationDeath: function() {
		this.play(this.enemyNameVariable + "_death");
	}
	,animationAppear: function() {
		this.play(this.enemyNameVariable + "_appear");
	}
	,animationHit: function() {
		this.play(this.enemyNameVariable + "_hitReceive");
	}
	,animationIdle: function() {
		this.loop(this.enemyNameVariable + "_idle");
	}
	,changeColor: function() {
		var newIndex = Math.floor(util.NDiRandomUtils.getRandomFloat(0,4));
		while(newIndex == this.currentColor) newIndex = Math.floor(util.NDiRandomUtils.getRandomFloat(0,4));
		this.currentColor = newIndex;
		if(newIndex == 0) {
			this.enemyNameVariable = this.enemyName + "_B";
			this.currentTypeTurtle = globals.NDiTypeToken.NDI_TYPE_TURTLE_LEONARDO;
		} else if(newIndex == 1) {
			this.enemyNameVariable = this.enemyName + "_O";
			this.currentTypeTurtle = globals.NDiTypeToken.NDI_TYPE_TURTLE_MICHELANGELO;
		} else if(newIndex == 2) {
			this.enemyNameVariable = this.enemyName + "_P";
			this.currentTypeTurtle = globals.NDiTypeToken.NDI_TYPE_TURTLE_DONATELLO;
		} else if(newIndex == 3) {
			this.enemyNameVariable = this.enemyName + "_R";
			this.currentTypeTurtle = globals.NDiTypeToken.NDI_TYPE_TURTLE_RAPHAEL;
		}
		this.animationIdle();
	}
	,__class__: game_objects.enemies.NDiFootBotEnemy
});
game_objects.enemies.NDiKrangEnemy = function(index) {
	game_objects.enemies.NDiEnemy.call(this,index);
};
$hxClasses["game_objects.enemies.NDiKrangEnemy"] = game_objects.enemies.NDiKrangEnemy;
game_objects.enemies.NDiKrangEnemy.__name__ = ["game_objects","enemies","NDiKrangEnemy"];
game_objects.enemies.NDiKrangEnemy.__super__ = game_objects.enemies.NDiEnemy;
game_objects.enemies.NDiKrangEnemy.prototype = $extend(game_objects.enemies.NDiEnemy.prototype,{
	onRemoved: function() {
		this.parentManager.getParentGamePlay().sendObstaclesToPuzzle(true);
		game_objects.enemies.NDiEnemy.prototype.onRemoved.call(this);
	}
	,onAdded: function() {
		game_objects.enemies.NDiEnemy.prototype.onAdded.call(this);
		this.specialAttack();
	}
	,specialAttack: function() {
		this.parentManager.getParentGamePlay().sendObstaclesToPuzzle();
		managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.SOUND_ENEMY_SPECIALATTACK_FOLDER + "" + this.enemyName + "" + globals.NDiGameConstants.SOUND_ENEMY_SPECIALATTACK_POSTFIX);
	}
	,receiveDamage: function(matchingFrequency) {
		return game_objects.enemies.NDiEnemy.prototype.receiveDamage.call(this,matchingFrequency);
	}
	,__class__: game_objects.enemies.NDiKrangEnemy
});
game_objects.enemies.NDiMouserEnemy = function(index) {
	game_objects.enemies.NDiEnemy.call(this,index);
	this.subMouser = new Array();
	this.limitNumMousers = 5;
	this.life = 50;
	this.totalLife = 50;
	this.attackLenghtTime = 0.75;
	this.countComboAttack = 0;
};
$hxClasses["game_objects.enemies.NDiMouserEnemy"] = game_objects.enemies.NDiMouserEnemy;
game_objects.enemies.NDiMouserEnemy.__name__ = ["game_objects","enemies","NDiMouserEnemy"];
game_objects.enemies.NDiMouserEnemy.__super__ = game_objects.enemies.NDiEnemy;
game_objects.enemies.NDiMouserEnemy.prototype = $extend(game_objects.enemies.NDiEnemy.prototype,{
	onAdded: function() {
		game_objects.enemies.NDiEnemy.prototype.onAdded.call(this);
		this.transform.x.set__(globals.NDiGameConstants.ARRAY_POSITIONS_MOUSERS[0].x);
		this.transform.y.set__(globals.NDiGameConstants.ARRAY_POSITIONS_MOUSERS[0].y);
		this.subMouser.push(this);
	}
	,specialAttack: function() {
		if(this.subMouser.length < this.limitNumMousers) {
			var newMouser = new game_objects.enemies.NDiEnemy(this.indexEnemy);
			newMouser.type = this.type;
			newMouser.transform.x.set__(globals.NDiGameConstants.ARRAY_POSITIONS_MOUSERS[this.subMouser.length].x);
			newMouser.transform.y.set__(globals.NDiGameConstants.ARRAY_POSITIONS_MOUSERS[this.subMouser.length].y);
			newMouser.life = newMouser.totalLife = 50;
			newMouser.attackLenghtTime = this.attackLenghtTime;
			this.subMouser.push(newMouser);
			newMouser.animationIdle();
			this.owner.addChild(newMouser.addToEntity());
			newMouser.animationAppear();
			this.life += newMouser.life;
			this.totalLife += newMouser.totalLife;
			this.parentManager.getParentGamePlay().updateHUDEnemyLife();
		}
	}
	,receiveDamage: function(matchingFrequency) {
		var valueAttack = game_objects.enemies.NDiEnemy.prototype.receiveDamage.call(this,matchingFrequency);
		if(valueAttack <= 0) return valueAttack;
		if(this.life > 0) {
			var _g1 = 0, _g = this.subMouser.length - 1;
			while(_g1 < _g) {
				var i = _g1++;
				this.subMouser[i + 1].animationHit();
			}
		}
		return valueAttack;
	}
	,animationAttack: function() {
		this.countComboAttack = 0;
		game_objects.enemies.NDiEnemy.prototype.animationAttack.call(this);
		if(this.life > 0) {
			var _g1 = 0, _g = this.subMouser.length - 1;
			while(_g1 < _g) {
				var i = _g1++;
				this.subMouser[i + 1].animationAttack();
			}
		}
	}
	,animationDeath: function() {
		game_objects.enemies.NDiEnemy.prototype.animationDeath.call(this);
		var _g1 = 0, _g = this.subMouser.length - 1;
		while(_g1 < _g) {
			var i = _g1++;
			this.subMouser[i + 1].animationDeath();
		}
	}
	,setConfigEnemy: function(config) {
		this.limitNumMousers = config.get("param1");
	}
	,__class__: game_objects.enemies.NDiMouserEnemy
});
game_objects.enemies.NDiShredderEnemy = function(index) {
	game_objects.enemies.NDiEnemy.call(this,index);
};
$hxClasses["game_objects.enemies.NDiShredderEnemy"] = game_objects.enemies.NDiShredderEnemy;
game_objects.enemies.NDiShredderEnemy.__name__ = ["game_objects","enemies","NDiShredderEnemy"];
game_objects.enemies.NDiShredderEnemy.__super__ = game_objects.enemies.NDiEnemy;
game_objects.enemies.NDiShredderEnemy.prototype = $extend(game_objects.enemies.NDiEnemy.prototype,{
	onRemoved: function() {
		this.parentManager.getParentGamePlay().sendSmokeToPlayer(0,true);
		game_objects.enemies.NDiEnemy.prototype.onRemoved.call(this);
	}
	,onAdded: function() {
		game_objects.enemies.NDiEnemy.prototype.onAdded.call(this);
		this.specialAttack();
	}
	,specialAttack: function() {
		this.parentManager.getParentGamePlay().sendSmokeToPlayer(this.sizeSmoke);
	}
	,receiveDamage: function(matchingFrequency) {
		return game_objects.enemies.NDiEnemy.prototype.receiveDamage.call(this,matchingFrequency);
	}
	,setConfigEnemy: function(config) {
		this.sizeSmoke = config.get("param1");
	}
	,__class__: game_objects.enemies.NDiShredderEnemy
});
game_objects.enemies.NDiSnakeWeedEnemy = function(index) {
	game_objects.enemies.NDiEnemy.call(this,index);
	this.totalTurtlesToBlock = 0;
	this.totalTurnsToDestroy = 0;
};
$hxClasses["game_objects.enemies.NDiSnakeWeedEnemy"] = game_objects.enemies.NDiSnakeWeedEnemy;
game_objects.enemies.NDiSnakeWeedEnemy.__name__ = ["game_objects","enemies","NDiSnakeWeedEnemy"];
game_objects.enemies.NDiSnakeWeedEnemy.__super__ = game_objects.enemies.NDiEnemy;
game_objects.enemies.NDiSnakeWeedEnemy.prototype = $extend(game_objects.enemies.NDiEnemy.prototype,{
	onRemoved: function() {
		this.parentManager.getParentGamePlay().sendBlockToPlayer(0,0,true);
		game_objects.enemies.NDiEnemy.prototype.onRemoved.call(this);
	}
	,onUpdate: function(dt) {
		game_objects.enemies.NDiEnemy.prototype.onUpdate.call(this,dt);
	}
	,onAddedFunction: function() {
		this.specialAttack();
	}
	,turnSpecialAttack: function(matchingFrequency) {
		this.parentManager.getParentGamePlay().sendAttackToWeeds(matchingFrequency);
	}
	,specialAttack: function() {
		this.parentManager.getParentGamePlay().sendBlockToPlayer(this.totalTurtlesToBlock,this.totalTurnsToDestroy);
	}
	,receiveDamage: function(matchingFrequency) {
		var valueDamage = 0;
		var itTurtle = globals.NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN;
		var _g = 0;
		while(_g < itTurtle.length) {
			var key = itTurtle[_g];
			++_g;
			var numTokens = matchingFrequency.get(key[0]);
			if(numTokens > 0) {
				var newValueDamage = (globals.NDiGameConstants.ATTACK_DMG + (numTokens - 2)) * (numTokens * 0.5);
				if(key != globals.NDiTypeToken.NDI_TYPE_TURTLE_PIZZA && key != globals.NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER) valueDamage += newValueDamage;
			}
		}
		this.life -= valueDamage;
		if(this.life > 0) this.animationHit();
		return valueDamage;
	}
	,setConfigEnemy: function(config) {
		this.totalTurtlesToBlock = config.get("param1");
		this.totalTurnsToDestroy = config.get("param2");
		var _g = this.transform.y;
		_g.set__(_g._value - 30);
	}
	,__class__: game_objects.enemies.NDiSnakeWeedEnemy
});
game_objects.enemies.NDiSpiderBytezEnemy = function(index) {
	game_objects.enemies.NDiEnemy.call(this,index);
	this.totalCobwebs = 0;
};
$hxClasses["game_objects.enemies.NDiSpiderBytezEnemy"] = game_objects.enemies.NDiSpiderBytezEnemy;
game_objects.enemies.NDiSpiderBytezEnemy.__name__ = ["game_objects","enemies","NDiSpiderBytezEnemy"];
game_objects.enemies.NDiSpiderBytezEnemy.__super__ = game_objects.enemies.NDiEnemy;
game_objects.enemies.NDiSpiderBytezEnemy.prototype = $extend(game_objects.enemies.NDiEnemy.prototype,{
	onRemoved: function() {
		this.parentManager.getParentGamePlay().sendCobwebsToPuzzle(true);
		game_objects.enemies.NDiEnemy.prototype.onRemoved.call(this);
	}
	,onUpdate: function(dt) {
		game_objects.enemies.NDiEnemy.prototype.onUpdate.call(this,dt);
	}
	,onAdded: function() {
		game_objects.enemies.NDiEnemy.prototype.onAdded.call(this);
		this.specialAttack();
	}
	,specialAttack: function() {
		this.parentManager.getParentGamePlay().sendCobwebsToPuzzle(false,this.totalCobwebs);
	}
	,receiveDamage: function(matchingFrequency) {
		return game_objects.enemies.NDiEnemy.prototype.receiveDamage.call(this,matchingFrequency);
	}
	,setConfigEnemy: function(config) {
		this.totalCobwebs = config.get("param1");
		var _g = this.transform.y;
		_g.set__(_g._value - 30);
	}
	,__class__: game_objects.enemies.NDiSpiderBytezEnemy
});
game_objects.turtles = {}
game_objects.turtles.NDiTurtle = function(lib) {
	flambe.swf.MoviePlayer.call(this,lib);
	this.isAlive = true;
	this.transform = new flambe.display.Sprite();
	this.type = globals.NDiTypeToken.NDI_TYPE_TURTLE_NONE;
	this.turtleName = flambe.swf.MoviePlayer.prototype.get_name.call(this);
	this.isBlocked = false;
};
$hxClasses["game_objects.turtles.NDiTurtle"] = game_objects.turtles.NDiTurtle;
game_objects.turtles.NDiTurtle.__name__ = ["game_objects","turtles","NDiTurtle"];
game_objects.turtles.NDiTurtle.__super__ = flambe.swf.MoviePlayer;
game_objects.turtles.NDiTurtle.prototype = $extend(flambe.swf.MoviePlayer.prototype,{
	onAdded: function() {
		flambe.swf.MoviePlayer.prototype.onAdded.call(this);
		this.owner.add(this.transform);
	}
	,animationIdle: function() {
		this.loop(this.turtleName + "_idle");
	}
	,animationDamage: function() {
		this.play(this.turtleName + "_hitReceive");
	}
	,animationJump: function() {
		this.play(this.turtleName + "_jump");
	}
	,animationFall: function() {
		this.play(this.turtleName + "_land");
		managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.SOUND_TMNT_FALL);
	}
	,__class__: game_objects.turtles.NDiTurtle
});
var globals = {}
globals.NDiTypeScene = $hxClasses["globals.NDiTypeScene"] = { __ename__ : ["globals","NDiTypeScene"], __constructs__ : ["NDI_TYPE_SCENE_NONE","NDI_TYPE_SCENE_LOADING","NDI_TYPE_SCENE_TEST","NDI_TYPE_SCENE_INTRO","NDI_TYPE_SCENE_MAINMENU","NDI_TYPE_SCENE_GAMEPLAY","NDI_TYPE_SCENE_CREDITS","NDI_TYPE_SCENE_SPLASH_NDI","NDI_TYPE_SCENE_SPLASH_NICKELODEON","NDI_TYPE_SCENE_TUTORIAL"] }
globals.NDiTypeScene.NDI_TYPE_SCENE_NONE = ["NDI_TYPE_SCENE_NONE",0];
globals.NDiTypeScene.NDI_TYPE_SCENE_NONE.toString = $estr;
globals.NDiTypeScene.NDI_TYPE_SCENE_NONE.__enum__ = globals.NDiTypeScene;
globals.NDiTypeScene.NDI_TYPE_SCENE_LOADING = ["NDI_TYPE_SCENE_LOADING",1];
globals.NDiTypeScene.NDI_TYPE_SCENE_LOADING.toString = $estr;
globals.NDiTypeScene.NDI_TYPE_SCENE_LOADING.__enum__ = globals.NDiTypeScene;
globals.NDiTypeScene.NDI_TYPE_SCENE_TEST = ["NDI_TYPE_SCENE_TEST",2];
globals.NDiTypeScene.NDI_TYPE_SCENE_TEST.toString = $estr;
globals.NDiTypeScene.NDI_TYPE_SCENE_TEST.__enum__ = globals.NDiTypeScene;
globals.NDiTypeScene.NDI_TYPE_SCENE_INTRO = ["NDI_TYPE_SCENE_INTRO",3];
globals.NDiTypeScene.NDI_TYPE_SCENE_INTRO.toString = $estr;
globals.NDiTypeScene.NDI_TYPE_SCENE_INTRO.__enum__ = globals.NDiTypeScene;
globals.NDiTypeScene.NDI_TYPE_SCENE_MAINMENU = ["NDI_TYPE_SCENE_MAINMENU",4];
globals.NDiTypeScene.NDI_TYPE_SCENE_MAINMENU.toString = $estr;
globals.NDiTypeScene.NDI_TYPE_SCENE_MAINMENU.__enum__ = globals.NDiTypeScene;
globals.NDiTypeScene.NDI_TYPE_SCENE_GAMEPLAY = ["NDI_TYPE_SCENE_GAMEPLAY",5];
globals.NDiTypeScene.NDI_TYPE_SCENE_GAMEPLAY.toString = $estr;
globals.NDiTypeScene.NDI_TYPE_SCENE_GAMEPLAY.__enum__ = globals.NDiTypeScene;
globals.NDiTypeScene.NDI_TYPE_SCENE_CREDITS = ["NDI_TYPE_SCENE_CREDITS",6];
globals.NDiTypeScene.NDI_TYPE_SCENE_CREDITS.toString = $estr;
globals.NDiTypeScene.NDI_TYPE_SCENE_CREDITS.__enum__ = globals.NDiTypeScene;
globals.NDiTypeScene.NDI_TYPE_SCENE_SPLASH_NDI = ["NDI_TYPE_SCENE_SPLASH_NDI",7];
globals.NDiTypeScene.NDI_TYPE_SCENE_SPLASH_NDI.toString = $estr;
globals.NDiTypeScene.NDI_TYPE_SCENE_SPLASH_NDI.__enum__ = globals.NDiTypeScene;
globals.NDiTypeScene.NDI_TYPE_SCENE_SPLASH_NICKELODEON = ["NDI_TYPE_SCENE_SPLASH_NICKELODEON",8];
globals.NDiTypeScene.NDI_TYPE_SCENE_SPLASH_NICKELODEON.toString = $estr;
globals.NDiTypeScene.NDI_TYPE_SCENE_SPLASH_NICKELODEON.__enum__ = globals.NDiTypeScene;
globals.NDiTypeScene.NDI_TYPE_SCENE_TUTORIAL = ["NDI_TYPE_SCENE_TUTORIAL",9];
globals.NDiTypeScene.NDI_TYPE_SCENE_TUTORIAL.toString = $estr;
globals.NDiTypeScene.NDI_TYPE_SCENE_TUTORIAL.__enum__ = globals.NDiTypeScene;
globals.NDiTypeToken = $hxClasses["globals.NDiTypeToken"] = { __ename__ : ["globals","NDiTypeToken"], __constructs__ : ["NDI_TYPE_TURTLE_NONE","NDI_TYPE_TURTLE_DONATELLO","NDI_TYPE_TURTLE_RAPHAEL","NDI_TYPE_TURTLE_MICHELANGELO","NDI_TYPE_TURTLE_LEONARDO","NDI_TYPE_TURTLE_SPLINTER","NDI_TYPE_TURTLE_PIZZA"] }
globals.NDiTypeToken.NDI_TYPE_TURTLE_NONE = ["NDI_TYPE_TURTLE_NONE",0];
globals.NDiTypeToken.NDI_TYPE_TURTLE_NONE.toString = $estr;
globals.NDiTypeToken.NDI_TYPE_TURTLE_NONE.__enum__ = globals.NDiTypeToken;
globals.NDiTypeToken.NDI_TYPE_TURTLE_DONATELLO = ["NDI_TYPE_TURTLE_DONATELLO",1];
globals.NDiTypeToken.NDI_TYPE_TURTLE_DONATELLO.toString = $estr;
globals.NDiTypeToken.NDI_TYPE_TURTLE_DONATELLO.__enum__ = globals.NDiTypeToken;
globals.NDiTypeToken.NDI_TYPE_TURTLE_RAPHAEL = ["NDI_TYPE_TURTLE_RAPHAEL",2];
globals.NDiTypeToken.NDI_TYPE_TURTLE_RAPHAEL.toString = $estr;
globals.NDiTypeToken.NDI_TYPE_TURTLE_RAPHAEL.__enum__ = globals.NDiTypeToken;
globals.NDiTypeToken.NDI_TYPE_TURTLE_MICHELANGELO = ["NDI_TYPE_TURTLE_MICHELANGELO",3];
globals.NDiTypeToken.NDI_TYPE_TURTLE_MICHELANGELO.toString = $estr;
globals.NDiTypeToken.NDI_TYPE_TURTLE_MICHELANGELO.__enum__ = globals.NDiTypeToken;
globals.NDiTypeToken.NDI_TYPE_TURTLE_LEONARDO = ["NDI_TYPE_TURTLE_LEONARDO",4];
globals.NDiTypeToken.NDI_TYPE_TURTLE_LEONARDO.toString = $estr;
globals.NDiTypeToken.NDI_TYPE_TURTLE_LEONARDO.__enum__ = globals.NDiTypeToken;
globals.NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER = ["NDI_TYPE_TURTLE_SPLINTER",5];
globals.NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER.toString = $estr;
globals.NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER.__enum__ = globals.NDiTypeToken;
globals.NDiTypeToken.NDI_TYPE_TURTLE_PIZZA = ["NDI_TYPE_TURTLE_PIZZA",6];
globals.NDiTypeToken.NDI_TYPE_TURTLE_PIZZA.toString = $estr;
globals.NDiTypeToken.NDI_TYPE_TURTLE_PIZZA.__enum__ = globals.NDiTypeToken;
globals.NDiTypeEnemy = $hxClasses["globals.NDiTypeEnemy"] = { __ename__ : ["globals","NDiTypeEnemy"], __constructs__ : ["NDI_TYPE_ENEMY_NONE","NDI_TYPE_ENEMY_MOUSER","NDI_TYPE_ENEMY_FOOTBOT","NDI_TYPE_ENEMY_KRANG","NDI_TYPE_ENEMY_RAHZAR","NDI_TYPE_ENEMY_SNAKEWEED","NDI_TYPE_ENEMY_SPIDERBYTEZ","NDI_TYPE_ENEMY_SHREDDER"] }
globals.NDiTypeEnemy.NDI_TYPE_ENEMY_NONE = ["NDI_TYPE_ENEMY_NONE",0];
globals.NDiTypeEnemy.NDI_TYPE_ENEMY_NONE.toString = $estr;
globals.NDiTypeEnemy.NDI_TYPE_ENEMY_NONE.__enum__ = globals.NDiTypeEnemy;
globals.NDiTypeEnemy.NDI_TYPE_ENEMY_MOUSER = ["NDI_TYPE_ENEMY_MOUSER",1];
globals.NDiTypeEnemy.NDI_TYPE_ENEMY_MOUSER.toString = $estr;
globals.NDiTypeEnemy.NDI_TYPE_ENEMY_MOUSER.__enum__ = globals.NDiTypeEnemy;
globals.NDiTypeEnemy.NDI_TYPE_ENEMY_FOOTBOT = ["NDI_TYPE_ENEMY_FOOTBOT",2];
globals.NDiTypeEnemy.NDI_TYPE_ENEMY_FOOTBOT.toString = $estr;
globals.NDiTypeEnemy.NDI_TYPE_ENEMY_FOOTBOT.__enum__ = globals.NDiTypeEnemy;
globals.NDiTypeEnemy.NDI_TYPE_ENEMY_KRANG = ["NDI_TYPE_ENEMY_KRANG",3];
globals.NDiTypeEnemy.NDI_TYPE_ENEMY_KRANG.toString = $estr;
globals.NDiTypeEnemy.NDI_TYPE_ENEMY_KRANG.__enum__ = globals.NDiTypeEnemy;
globals.NDiTypeEnemy.NDI_TYPE_ENEMY_RAHZAR = ["NDI_TYPE_ENEMY_RAHZAR",4];
globals.NDiTypeEnemy.NDI_TYPE_ENEMY_RAHZAR.toString = $estr;
globals.NDiTypeEnemy.NDI_TYPE_ENEMY_RAHZAR.__enum__ = globals.NDiTypeEnemy;
globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SNAKEWEED = ["NDI_TYPE_ENEMY_SNAKEWEED",5];
globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SNAKEWEED.toString = $estr;
globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SNAKEWEED.__enum__ = globals.NDiTypeEnemy;
globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SPIDERBYTEZ = ["NDI_TYPE_ENEMY_SPIDERBYTEZ",6];
globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SPIDERBYTEZ.toString = $estr;
globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SPIDERBYTEZ.__enum__ = globals.NDiTypeEnemy;
globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SHREDDER = ["NDI_TYPE_ENEMY_SHREDDER",7];
globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SHREDDER.toString = $estr;
globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SHREDDER.__enum__ = globals.NDiTypeEnemy;
globals.NDiTypePopupPuzzle = $hxClasses["globals.NDiTypePopupPuzzle"] = { __ename__ : ["globals","NDiTypePopupPuzzle"], __constructs__ : ["NDI_POPUP_TURTLE_ATTACK","NDI_POPUP_ENEMY_ATTACK","NDI_POPUP_NEW_ENEMY"] }
globals.NDiTypePopupPuzzle.NDI_POPUP_TURTLE_ATTACK = ["NDI_POPUP_TURTLE_ATTACK",0];
globals.NDiTypePopupPuzzle.NDI_POPUP_TURTLE_ATTACK.toString = $estr;
globals.NDiTypePopupPuzzle.NDI_POPUP_TURTLE_ATTACK.__enum__ = globals.NDiTypePopupPuzzle;
globals.NDiTypePopupPuzzle.NDI_POPUP_ENEMY_ATTACK = ["NDI_POPUP_ENEMY_ATTACK",1];
globals.NDiTypePopupPuzzle.NDI_POPUP_ENEMY_ATTACK.toString = $estr;
globals.NDiTypePopupPuzzle.NDI_POPUP_ENEMY_ATTACK.__enum__ = globals.NDiTypePopupPuzzle;
globals.NDiTypePopupPuzzle.NDI_POPUP_NEW_ENEMY = ["NDI_POPUP_NEW_ENEMY",2];
globals.NDiTypePopupPuzzle.NDI_POPUP_NEW_ENEMY.toString = $estr;
globals.NDiTypePopupPuzzle.NDI_POPUP_NEW_ENEMY.__enum__ = globals.NDiTypePopupPuzzle;
globals.NDiVarsToSave = $hxClasses["globals.NDiVarsToSave"] = { __ename__ : ["globals","NDiVarsToSave"], __constructs__ : ["SCORE","SCORE_2","SCORE_3","MUTE_MUSIC","MUTE_SOUNDS"] }
globals.NDiVarsToSave.SCORE = ["SCORE",0];
globals.NDiVarsToSave.SCORE.toString = $estr;
globals.NDiVarsToSave.SCORE.__enum__ = globals.NDiVarsToSave;
globals.NDiVarsToSave.SCORE_2 = ["SCORE_2",1];
globals.NDiVarsToSave.SCORE_2.toString = $estr;
globals.NDiVarsToSave.SCORE_2.__enum__ = globals.NDiVarsToSave;
globals.NDiVarsToSave.SCORE_3 = ["SCORE_3",2];
globals.NDiVarsToSave.SCORE_3.toString = $estr;
globals.NDiVarsToSave.SCORE_3.__enum__ = globals.NDiVarsToSave;
globals.NDiVarsToSave.MUTE_MUSIC = ["MUTE_MUSIC",3];
globals.NDiVarsToSave.MUTE_MUSIC.toString = $estr;
globals.NDiVarsToSave.MUTE_MUSIC.__enum__ = globals.NDiVarsToSave;
globals.NDiVarsToSave.MUTE_SOUNDS = ["MUTE_SOUNDS",4];
globals.NDiVarsToSave.MUTE_SOUNDS.toString = $estr;
globals.NDiVarsToSave.MUTE_SOUNDS.__enum__ = globals.NDiVarsToSave;
var math = {}
math.NDiVector2D = function(_x,_y) {
	this.x = _x;
	this.y = _y;
};
$hxClasses["math.NDiVector2D"] = math.NDiVector2D;
math.NDiVector2D.__name__ = ["math","NDiVector2D"];
math.NDiVector2D.getDistance = function(startingPoint,endingPoint) {
	var d = Math.pow(endingPoint.x - startingPoint.x,2) + Math.pow(endingPoint.y - startingPoint.y,2);
	d = Math.pow(d,0.5);
	return d;
}
math.NDiVector2D.getAngle = function(startingPoint,endingPoint) {
	var x = endingPoint.x - startingPoint.x;
	var y = endingPoint.y - startingPoint.y;
	var angle = Math.atan2(y,x);
	angle = angle * math.NDiMath.TO_DEGREE;
	return angle;
}
math.NDiVector2D.prototype = {
	__class__: math.NDiVector2D
}
globals.NDiGameConstants = function() { }
$hxClasses["globals.NDiGameConstants"] = globals.NDiGameConstants;
globals.NDiGameConstants.__name__ = ["globals","NDiGameConstants"];
globals.NDiGameGlobals = function() {
	this.bCycleEnemies = false;
	this.bHighScores = false;
	this.bNickPoints = false;
	this.bUniversalEndGameScreen = false;
	this.bAchievements = false;
	this.currentScaleGame = 1;
	this.isRightHanded = true;
};
$hxClasses["globals.NDiGameGlobals"] = globals.NDiGameGlobals;
globals.NDiGameGlobals.__name__ = ["globals","NDiGameGlobals"];
globals.NDiGameGlobals.initInstance = function() {
	if(globals.NDiGameGlobals.instance == null) globals.NDiGameGlobals.instance = new globals.NDiGameGlobals();
}
globals.NDiGameGlobals.getInstance = function() {
	return globals.NDiGameGlobals.instance;
}
globals.NDiGameGlobals.prototype = {
	initGlobalConfigData: function() {
		var sXML = managers.NDiResourcesManager.getInstance().loadXML(globals.NDiGameConstants.ASSET_PACKAGE_CONFIG,globals.NDiGameConstants.CONFIG_ASSET_CONFIG_XML);
		var oXML = new haxe.xml.Fast(Xml.parse(sXML).firstElement());
		var $it0 = oXML.nodes.resolve("debug").iterator();
		while( $it0.hasNext() ) {
			var debugNode = $it0.next();
			this.bCycleEnemies = debugNode.node.resolve("cycle_enemies").get_innerData() == "enabled"?true:false;
		}
		var $it1 = oXML.nodes.resolve("activators").iterator();
		while( $it1.hasNext() ) {
			var debugNode = $it1.next();
			this.bHighScores = debugNode.node.resolve("high_scores").get_innerData() == "enabled"?true:false;
			this.bUniversalEndGameScreen = debugNode.node.resolve("universal_end_game_screen").get_innerData() == "enabled"?true:false;
			this.bAchievements = debugNode.node.resolve("achievements").get_innerData() == "enabled"?true:false;
		}
	}
	,__class__: globals.NDiGameGlobals
}
var haxe = {}
haxe.Json = function() {
};
$hxClasses["haxe.Json"] = haxe.Json;
haxe.Json.__name__ = ["haxe","Json"];
haxe.Json.parse = function(text) {
	return new haxe.Json().doParse(text);
}
haxe.Json.prototype = {
	parseNumber: function(c) {
		var start = this.pos - 1;
		var minus = c == 45, digit = !minus, zero = c == 48;
		var point = false, e = false, pm = false, end = false;
		while(true) {
			c = this.str.charCodeAt(this.pos++);
			switch(c) {
			case 48:
				if(zero && !point) this.invalidNumber(start);
				if(minus) {
					minus = false;
					zero = true;
				}
				digit = true;
				break;
			case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
				if(zero && !point) this.invalidNumber(start);
				if(minus) minus = false;
				digit = true;
				zero = false;
				break;
			case 46:
				if(minus || point) this.invalidNumber(start);
				digit = false;
				point = true;
				break;
			case 101:case 69:
				if(minus || zero || e) this.invalidNumber(start);
				digit = false;
				e = true;
				break;
			case 43:case 45:
				if(!e || pm) this.invalidNumber(start);
				digit = false;
				pm = true;
				break;
			default:
				if(!digit) this.invalidNumber(start);
				this.pos--;
				end = true;
			}
			if(end) break;
		}
		var f = Std.parseFloat(HxOverrides.substr(this.str,start,this.pos - start));
		var i = f | 0;
		return i == f?i:f;
	}
	,invalidNumber: function(start) {
		throw "Invalid number at position " + start + ": " + HxOverrides.substr(this.str,start,this.pos - start);
	}
	,parseString: function() {
		var start = this.pos;
		var buf = new StringBuf();
		while(true) {
			var c = this.str.charCodeAt(this.pos++);
			if(c == 34) break;
			if(c == 92) {
				buf.addSub(this.str,start,this.pos - start - 1);
				c = this.str.charCodeAt(this.pos++);
				switch(c) {
				case 114:
					buf.b += "\r";
					break;
				case 110:
					buf.b += "\n";
					break;
				case 116:
					buf.b += "\t";
					break;
				case 98:
					buf.b += "";
					break;
				case 102:
					buf.b += "";
					break;
				case 47:case 92:case 34:
					buf.b += String.fromCharCode(c);
					break;
				case 117:
					var uc = Std.parseInt("0x" + HxOverrides.substr(this.str,this.pos,4));
					this.pos += 4;
					buf.b += String.fromCharCode(uc);
					break;
				default:
					throw "Invalid escape sequence \\" + String.fromCharCode(c) + " at position " + (this.pos - 1);
				}
				start = this.pos;
			} else if(c != c) throw "Unclosed string";
		}
		buf.addSub(this.str,start,this.pos - start - 1);
		return buf.b;
	}
	,parseRec: function() {
		while(true) {
			var c = this.str.charCodeAt(this.pos++);
			switch(c) {
			case 32:case 13:case 10:case 9:
				break;
			case 123:
				var obj = { }, field = null, comma = null;
				while(true) {
					var c1 = this.str.charCodeAt(this.pos++);
					switch(c1) {
					case 32:case 13:case 10:case 9:
						break;
					case 125:
						if(field != null || comma == false) this.invalidChar();
						return obj;
					case 58:
						if(field == null) this.invalidChar();
						obj[field] = this.parseRec();
						field = null;
						comma = true;
						break;
					case 44:
						if(comma) comma = false; else this.invalidChar();
						break;
					case 34:
						if(comma) this.invalidChar();
						field = this.parseString();
						break;
					default:
						this.invalidChar();
					}
				}
				break;
			case 91:
				var arr = [], comma = null;
				while(true) {
					var c1 = this.str.charCodeAt(this.pos++);
					switch(c1) {
					case 32:case 13:case 10:case 9:
						break;
					case 93:
						if(comma == false) this.invalidChar();
						return arr;
					case 44:
						if(comma) comma = false; else this.invalidChar();
						break;
					default:
						if(comma) this.invalidChar();
						this.pos--;
						arr.push(this.parseRec());
						comma = true;
					}
				}
				break;
			case 116:
				var save = this.pos;
				if(this.str.charCodeAt(this.pos++) != 114 || this.str.charCodeAt(this.pos++) != 117 || this.str.charCodeAt(this.pos++) != 101) {
					this.pos = save;
					this.invalidChar();
				}
				return true;
			case 102:
				var save = this.pos;
				if(this.str.charCodeAt(this.pos++) != 97 || this.str.charCodeAt(this.pos++) != 108 || this.str.charCodeAt(this.pos++) != 115 || this.str.charCodeAt(this.pos++) != 101) {
					this.pos = save;
					this.invalidChar();
				}
				return false;
			case 110:
				var save = this.pos;
				if(this.str.charCodeAt(this.pos++) != 117 || this.str.charCodeAt(this.pos++) != 108 || this.str.charCodeAt(this.pos++) != 108) {
					this.pos = save;
					this.invalidChar();
				}
				return null;
			case 34:
				return this.parseString();
			case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:case 45:
				return this.parseNumber(c);
			default:
				this.invalidChar();
			}
		}
	}
	,invalidChar: function() {
		this.pos--;
		throw "Invalid char " + this.str.charCodeAt(this.pos) + " at position " + this.pos;
	}
	,doParse: function(str) {
		this.str = str;
		this.pos = 0;
		return this.parseRec();
	}
	,__class__: haxe.Json
}
haxe.Serializer = function() {
	this.buf = new StringBuf();
	this.cache = new Array();
	this.useCache = haxe.Serializer.USE_CACHE;
	this.useEnumIndex = haxe.Serializer.USE_ENUM_INDEX;
	this.shash = new haxe.ds.StringMap();
	this.scount = 0;
};
$hxClasses["haxe.Serializer"] = haxe.Serializer;
haxe.Serializer.__name__ = ["haxe","Serializer"];
haxe.Serializer.prototype = {
	serialize: function(v) {
		var _g = Type["typeof"](v);
		var $e = (_g);
		switch( $e[1] ) {
		case 0:
			this.buf.b += "n";
			break;
		case 1:
			if(v == 0) {
				this.buf.b += "z";
				return;
			}
			this.buf.b += "i";
			this.buf.b += Std.string(v);
			break;
		case 2:
			if(Math.isNaN(v)) this.buf.b += "k"; else if(!Math.isFinite(v)) this.buf.b += Std.string(v < 0?"m":"p"); else {
				this.buf.b += "d";
				this.buf.b += Std.string(v);
			}
			break;
		case 3:
			this.buf.b += Std.string(v?"t":"f");
			break;
		case 6:
			var c = $e[2];
			if(c == String) {
				this.serializeString(v);
				return;
			}
			if(this.useCache && this.serializeRef(v)) return;
			switch(c) {
			case Array:
				var ucount = 0;
				this.buf.b += "a";
				var l = v.length;
				var _g1 = 0;
				while(_g1 < l) {
					var i = _g1++;
					if(v[i] == null) ucount++; else {
						if(ucount > 0) {
							if(ucount == 1) this.buf.b += "n"; else {
								this.buf.b += "u";
								this.buf.b += Std.string(ucount);
							}
							ucount = 0;
						}
						this.serialize(v[i]);
					}
				}
				if(ucount > 0) {
					if(ucount == 1) this.buf.b += "n"; else {
						this.buf.b += "u";
						this.buf.b += Std.string(ucount);
					}
				}
				this.buf.b += "h";
				break;
			case List:
				this.buf.b += "l";
				var v1 = v;
				var $it0 = v1.iterator();
				while( $it0.hasNext() ) {
					var i = $it0.next();
					this.serialize(i);
				}
				this.buf.b += "h";
				break;
			case Date:
				var d = v;
				this.buf.b += "v";
				this.buf.b += Std.string(HxOverrides.dateStr(d));
				break;
			case haxe.ds.StringMap:
				this.buf.b += "b";
				var v1 = v;
				var $it1 = v1.keys();
				while( $it1.hasNext() ) {
					var k = $it1.next();
					this.serializeString(k);
					this.serialize(v1.get(k));
				}
				this.buf.b += "h";
				break;
			case haxe.ds.IntMap:
				this.buf.b += "q";
				var v1 = v;
				var $it2 = v1.keys();
				while( $it2.hasNext() ) {
					var k = $it2.next();
					this.buf.b += ":";
					this.buf.b += Std.string(k);
					this.serialize(v1.get(k));
				}
				this.buf.b += "h";
				break;
			case haxe.ds.ObjectMap:
				this.buf.b += "M";
				var v1 = v;
				var $it3 = v1.keys();
				while( $it3.hasNext() ) {
					var k = $it3.next();
					var id = Reflect.field(k,"__id__");
					Reflect.deleteField(k,"__id__");
					this.serialize(k);
					k.__id__ = id;
					this.serialize(v1.h[k.__id__]);
				}
				this.buf.b += "h";
				break;
			case haxe.io.Bytes:
				var v1 = v;
				var i = 0;
				var max = v1.length - 2;
				var charsBuf = new StringBuf();
				var b64 = haxe.Serializer.BASE64;
				while(i < max) {
					var b1 = v1.b[i++];
					var b2 = v1.b[i++];
					var b3 = v1.b[i++];
					charsBuf.b += Std.string(b64.charAt(b1 >> 2));
					charsBuf.b += Std.string(b64.charAt((b1 << 4 | b2 >> 4) & 63));
					charsBuf.b += Std.string(b64.charAt((b2 << 2 | b3 >> 6) & 63));
					charsBuf.b += Std.string(b64.charAt(b3 & 63));
				}
				if(i == max) {
					var b1 = v1.b[i++];
					var b2 = v1.b[i++];
					charsBuf.b += Std.string(b64.charAt(b1 >> 2));
					charsBuf.b += Std.string(b64.charAt((b1 << 4 | b2 >> 4) & 63));
					charsBuf.b += Std.string(b64.charAt(b2 << 2 & 63));
				} else if(i == max + 1) {
					var b1 = v1.b[i++];
					charsBuf.b += Std.string(b64.charAt(b1 >> 2));
					charsBuf.b += Std.string(b64.charAt(b1 << 4 & 63));
				}
				var chars = charsBuf.b;
				this.buf.b += "s";
				this.buf.b += Std.string(chars.length);
				this.buf.b += ":";
				this.buf.b += Std.string(chars);
				break;
			default:
				this.cache.pop();
				if(v.hxSerialize != null) {
					this.buf.b += "C";
					this.serializeString(Type.getClassName(c));
					this.cache.push(v);
					v.hxSerialize(this);
					this.buf.b += "g";
				} else {
					this.buf.b += "c";
					this.serializeString(Type.getClassName(c));
					this.cache.push(v);
					this.serializeFields(v);
				}
			}
			break;
		case 4:
			if(this.useCache && this.serializeRef(v)) return;
			this.buf.b += "o";
			this.serializeFields(v);
			break;
		case 7:
			var e = $e[2];
			if(this.useCache && this.serializeRef(v)) return;
			this.cache.pop();
			this.buf.b += Std.string(this.useEnumIndex?"j":"w");
			this.serializeString(Type.getEnumName(e));
			if(this.useEnumIndex) {
				this.buf.b += ":";
				this.buf.b += Std.string(v[1]);
			} else this.serializeString(v[0]);
			this.buf.b += ":";
			var l = v.length;
			this.buf.b += Std.string(l - 2);
			var _g1 = 2;
			while(_g1 < l) {
				var i = _g1++;
				this.serialize(v[i]);
			}
			this.cache.push(v);
			break;
		case 5:
			throw "Cannot serialize function";
			break;
		default:
			throw "Cannot serialize " + Std.string(v);
		}
	}
	,serializeFields: function(v) {
		var _g = 0, _g1 = Reflect.fields(v);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			this.serializeString(f);
			this.serialize(Reflect.field(v,f));
		}
		this.buf.b += "g";
	}
	,serializeRef: function(v) {
		var vt = typeof(v);
		var _g1 = 0, _g = this.cache.length;
		while(_g1 < _g) {
			var i = _g1++;
			var ci = this.cache[i];
			if(typeof(ci) == vt && ci == v) {
				this.buf.b += "r";
				this.buf.b += Std.string(i);
				return true;
			}
		}
		this.cache.push(v);
		return false;
	}
	,serializeString: function(s) {
		var x = this.shash.get(s);
		if(x != null) {
			this.buf.b += "R";
			this.buf.b += Std.string(x);
			return;
		}
		this.shash.set(s,this.scount++);
		this.buf.b += "y";
		s = StringTools.urlEncode(s);
		this.buf.b += Std.string(s.length);
		this.buf.b += ":";
		this.buf.b += Std.string(s);
	}
	,toString: function() {
		return this.buf.b;
	}
	,__class__: haxe.Serializer
}
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe.Timer;
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
}
haxe.Timer.prototype = {
	run: function() {
		null;
	}
	,stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,__class__: haxe.Timer
}
haxe.Unserializer = function(buf) {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = new Array();
	this.cache = new Array();
	var r = haxe.Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe.Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
};
$hxClasses["haxe.Unserializer"] = haxe.Unserializer;
haxe.Unserializer.__name__ = ["haxe","Unserializer"];
haxe.Unserializer.initCodes = function() {
	var codes = new Array();
	var _g1 = 0, _g = haxe.Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe.Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
}
haxe.Unserializer.run = function(v) {
	return new haxe.Unserializer(v).unserialize();
}
haxe.Unserializer.prototype = {
	unserialize: function() {
		var _g = this.buf.charCodeAt(this.pos++);
		switch(_g) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			var p1 = this.pos;
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
			}
			return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
		case 121:
			var len = this.readDigits();
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid string length";
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = StringTools.urlDecode(s);
			this.scache.push(s);
			return s;
		case 107:
			return Math.NaN;
		case 109:
			return Math.NEGATIVE_INFINITY;
		case 112:
			return Math.POSITIVE_INFINITY;
		case 97:
			var buf = this.buf;
			var a = new Array();
			this.cache.push(a);
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c == 104) {
					this.pos++;
					break;
				}
				if(c == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n = this.readDigits();
			if(n < 0 || n >= this.cache.length) throw "Invalid reference";
			return this.cache[n];
		case 82:
			var n = this.readDigits();
			if(n < 0 || n >= this.scache.length) throw "Invalid string reference";
			return this.scache[n];
		case 120:
			throw this.unserialize();
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o = Type.createEmptyInstance(cl);
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 119:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) throw "Enum not found " + name;
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) throw "Enum not found " + name;
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl)[index];
			if(tag == null) throw "Unknown enum index " + name + "@" + index;
			var e = this.unserializeEnum(edecl,tag);
			this.cache.push(e);
			return e;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new haxe.ds.StringMap();
			this.cache.push(h);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s = this.unserialize();
				h.set(s,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h = new haxe.ds.IntMap();
			this.cache.push(h);
			var buf = this.buf;
			var c = this.buf.charCodeAt(this.pos++);
			while(c == 58) {
				var i = this.readDigits();
				h.set(i,this.unserialize());
				c = this.buf.charCodeAt(this.pos++);
			}
			if(c != 104) throw "Invalid IntMap format";
			return h;
		case 77:
			var h = new haxe.ds.ObjectMap();
			this.cache.push(h);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s = this.unserialize();
				h.set(s,this.unserialize());
			}
			this.pos++;
			return h;
		case 118:
			var d = HxOverrides.strDate(HxOverrides.substr(this.buf,this.pos,19));
			this.cache.push(d);
			this.pos += 19;
			return d;
		case 115:
			var len = this.readDigits();
			var buf = this.buf;
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid bytes length";
			var codes = haxe.Unserializer.CODES;
			if(codes == null) {
				codes = haxe.Unserializer.initCodes();
				haxe.Unserializer.CODES = codes;
			}
			var i = this.pos;
			var rest = len & 3;
			var size = (len >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i + (len - rest);
			var bytes = haxe.io.Bytes.alloc(size);
			var bpos = 0;
			while(i < max) {
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
				var c3 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
				var c4 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c3 << 6 | c4) & 255;
			}
			if(rest >= 2) {
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
				if(rest == 3) {
					var c3 = codes[buf.charCodeAt(i++)];
					bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
				}
			}
			this.pos += len;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o = Type.createEmptyInstance(cl);
			this.cache.push(o);
			o.hxUnserialize(this);
			if(this.buf.charCodeAt(this.pos++) != 103) throw "Invalid custom data";
			return o;
		default:
		}
		this.pos--;
		throw "Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.buf.charCodeAt(this.pos++) != 58) throw "Invalid enum format";
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = new Array();
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw "Invalid object";
			if(this.buf.charCodeAt(this.pos) == 103) break;
			var k = this.unserialize();
			if(!js.Boot.__instanceof(k,String)) throw "Invalid object key";
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) break;
			if(c == 45) {
				if(this.pos != fpos) break;
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) break;
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) k *= -1;
		return k;
	}
	,setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_) {
			return null;
		}}; else this.resolver = r;
	}
	,__class__: haxe.Unserializer
}
haxe.ds = {}
haxe.ds.BalancedTree = function() {
};
$hxClasses["haxe.ds.BalancedTree"] = haxe.ds.BalancedTree;
haxe.ds.BalancedTree.__name__ = ["haxe","ds","BalancedTree"];
haxe.ds.BalancedTree.prototype = {
	compare: function(k1,k2) {
		return Reflect.compare(k1,k2);
	}
	,balance: function(l,k,v,r) {
		var hl = l == null?0:l._height;
		var hr = r == null?0:r._height;
		return hl > hr + 2?(function($this) {
			var $r;
			var _this = l.left;
			$r = _this == null?0:_this._height;
			return $r;
		}(this)) >= (function($this) {
			var $r;
			var _this = l.right;
			$r = _this == null?0:_this._height;
			return $r;
		}(this))?new haxe.ds.TreeNode(l.left,l.key,l.value,new haxe.ds.TreeNode(l.right,k,v,r)):new haxe.ds.TreeNode(new haxe.ds.TreeNode(l.left,l.key,l.value,l.right.left),l.right.key,l.right.value,new haxe.ds.TreeNode(l.right.right,k,v,r)):hr > hl + 2?(function($this) {
			var $r;
			var _this = r.right;
			$r = _this == null?0:_this._height;
			return $r;
		}(this)) > (function($this) {
			var $r;
			var _this = r.left;
			$r = _this == null?0:_this._height;
			return $r;
		}(this))?new haxe.ds.TreeNode(new haxe.ds.TreeNode(l,k,v,r.left),r.key,r.value,r.right):new haxe.ds.TreeNode(new haxe.ds.TreeNode(l,k,v,r.left.left),r.left.key,r.left.value,new haxe.ds.TreeNode(r.left.right,r.key,r.value,r.right)):new haxe.ds.TreeNode(l,k,v,r,(hl > hr?hl:hr) + 1);
	}
	,keysLoop: function(node,acc) {
		if(node != null) {
			acc.push(node.key);
			this.keysLoop(node.left,acc);
			this.keysLoop(node.right,acc);
		}
	}
	,setLoop: function(k,v,node) {
		if(node == null) return new haxe.ds.TreeNode(null,k,v,null);
		var c = this.compare(k,node.key);
		return c == 0?new haxe.ds.TreeNode(node.left,k,v,node.right,node == null?0:node._height):c < 0?(function($this) {
			var $r;
			var nl = $this.setLoop(k,v,node.left);
			$r = $this.balance(nl,node.key,node.value,node.right);
			return $r;
		}(this)):(function($this) {
			var $r;
			var nr = $this.setLoop(k,v,node.right);
			$r = $this.balance(node.left,node.key,node.value,nr);
			return $r;
		}(this));
	}
	,keys: function() {
		var ret = [];
		this.keysLoop(this.root,ret);
		return HxOverrides.iter(ret);
	}
	,get: function(k) {
		var node = this.root;
		while(node != null) {
			var c = this.compare(k,node.key);
			if(c == 0) return node.value;
			if(c < 0) node = node.left; else node = node.right;
		}
		return null;
	}
	,set: function(k,v) {
		this.root = this.setLoop(k,v,this.root);
	}
	,__class__: haxe.ds.BalancedTree
}
haxe.ds.TreeNode = function(l,k,v,r,h) {
	if(h == null) h = -1;
	this.left = l;
	this.key = k;
	this.value = v;
	this.right = r;
	if(h == -1) this._height = ((function($this) {
		var $r;
		var _this = $this.left;
		$r = _this == null?0:_this._height;
		return $r;
	}(this)) > (function($this) {
		var $r;
		var _this = $this.right;
		$r = _this == null?0:_this._height;
		return $r;
	}(this))?(function($this) {
		var $r;
		var _this = $this.left;
		$r = _this == null?0:_this._height;
		return $r;
	}(this)):(function($this) {
		var $r;
		var _this = $this.right;
		$r = _this == null?0:_this._height;
		return $r;
	}(this))) + 1; else this._height = h;
};
$hxClasses["haxe.ds.TreeNode"] = haxe.ds.TreeNode;
haxe.ds.TreeNode.__name__ = ["haxe","ds","TreeNode"];
haxe.ds.TreeNode.prototype = {
	__class__: haxe.ds.TreeNode
}
haxe.ds.EnumValueMap = function() {
	haxe.ds.BalancedTree.call(this);
};
$hxClasses["haxe.ds.EnumValueMap"] = haxe.ds.EnumValueMap;
haxe.ds.EnumValueMap.__name__ = ["haxe","ds","EnumValueMap"];
haxe.ds.EnumValueMap.__interfaces__ = [IMap];
haxe.ds.EnumValueMap.__super__ = haxe.ds.BalancedTree;
haxe.ds.EnumValueMap.prototype = $extend(haxe.ds.BalancedTree.prototype,{
	compareArgs: function(a1,a2) {
		var ld = a1.length - a2.length;
		if(ld != 0) return ld;
		var _g1 = 0, _g = a1.length;
		while(_g1 < _g) {
			var i = _g1++;
			var v1 = a1[i], v2 = a2[i];
			var d = Reflect.isEnumValue(v1) && Reflect.isEnumValue(v2)?this.compare(v1,v2):Reflect.compare(v1,v2);
			if(d != 0) return d;
		}
		return 0;
	}
	,compare: function(k1,k2) {
		var d = k1[1] - k2[1];
		if(d != 0) return d;
		var p1 = k1.slice(2);
		var p2 = k2.slice(2);
		if(p1.length == 0 && p2.length == 0) return 0;
		return this.compareArgs(p1,p2);
	}
	,__class__: haxe.ds.EnumValueMap
});
haxe.ds.IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe.ds.IntMap;
haxe.ds.IntMap.__name__ = ["haxe","ds","IntMap"];
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,get: function(key) {
		return this.h[key];
	}
	,set: function(key,value) {
		this.h[key] = value;
	}
	,__class__: haxe.ds.IntMap
}
haxe.ds.ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe.ds.ObjectMap;
haxe.ds.ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe.ds.ObjectMap.__interfaces__ = [IMap];
haxe.ds.ObjectMap.prototype = {
	keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,set: function(key,value) {
		var id = key.__id__ != null?key.__id__:key.__id__ = ++haxe.ds.ObjectMap.count;
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,__class__: haxe.ds.ObjectMap
}
haxe.ds.StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe.ds.StringMap;
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,__class__: haxe.ds.StringMap
}
haxe.io = {}
haxe.io.Bytes = function(length,b) {
	this.length = length;
	this.b = b;
};
$hxClasses["haxe.io.Bytes"] = haxe.io.Bytes;
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
}
haxe.io.Bytes.prototype = {
	__class__: haxe.io.Bytes
}
haxe.rtti = {}
haxe.rtti.Meta = function() { }
$hxClasses["haxe.rtti.Meta"] = haxe.rtti.Meta;
haxe.rtti.Meta.__name__ = ["haxe","rtti","Meta"];
haxe.rtti.Meta.getType = function(t) {
	var meta = t.__meta__;
	return meta == null || meta.obj == null?{ }:meta.obj;
}
haxe.xml = {}
haxe.xml._Fast = {}
haxe.xml._Fast.NodeAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.NodeAccess"] = haxe.xml._Fast.NodeAccess;
haxe.xml._Fast.NodeAccess.__name__ = ["haxe","xml","_Fast","NodeAccess"];
haxe.xml._Fast.NodeAccess.prototype = {
	resolve: function(name) {
		var x = this.__x.elementsNamed(name).next();
		if(x == null) {
			var xname = this.__x.nodeType == Xml.Document?"Document":this.__x.get_nodeName();
			throw xname + " is missing element " + name;
		}
		return new haxe.xml.Fast(x);
	}
	,__class__: haxe.xml._Fast.NodeAccess
}
haxe.xml._Fast.AttribAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.AttribAccess"] = haxe.xml._Fast.AttribAccess;
haxe.xml._Fast.AttribAccess.__name__ = ["haxe","xml","_Fast","AttribAccess"];
haxe.xml._Fast.AttribAccess.prototype = {
	resolve: function(name) {
		if(this.__x.nodeType == Xml.Document) throw "Cannot access document attribute " + name;
		var v = this.__x.get(name);
		if(v == null) throw this.__x.get_nodeName() + " is missing attribute " + name;
		return v;
	}
	,__class__: haxe.xml._Fast.AttribAccess
}
haxe.xml._Fast.HasAttribAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.HasAttribAccess"] = haxe.xml._Fast.HasAttribAccess;
haxe.xml._Fast.HasAttribAccess.__name__ = ["haxe","xml","_Fast","HasAttribAccess"];
haxe.xml._Fast.HasAttribAccess.prototype = {
	__class__: haxe.xml._Fast.HasAttribAccess
}
haxe.xml._Fast.HasNodeAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.HasNodeAccess"] = haxe.xml._Fast.HasNodeAccess;
haxe.xml._Fast.HasNodeAccess.__name__ = ["haxe","xml","_Fast","HasNodeAccess"];
haxe.xml._Fast.HasNodeAccess.prototype = {
	__class__: haxe.xml._Fast.HasNodeAccess
}
haxe.xml._Fast.NodeListAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.NodeListAccess"] = haxe.xml._Fast.NodeListAccess;
haxe.xml._Fast.NodeListAccess.__name__ = ["haxe","xml","_Fast","NodeListAccess"];
haxe.xml._Fast.NodeListAccess.prototype = {
	resolve: function(name) {
		var l = new List();
		var $it0 = this.__x.elementsNamed(name);
		while( $it0.hasNext() ) {
			var x = $it0.next();
			l.add(new haxe.xml.Fast(x));
		}
		return l;
	}
	,__class__: haxe.xml._Fast.NodeListAccess
}
haxe.xml.Fast = function(x) {
	if(x.nodeType != Xml.Document && x.nodeType != Xml.Element) throw "Invalid nodeType " + Std.string(x.nodeType);
	this.x = x;
	this.node = new haxe.xml._Fast.NodeAccess(x);
	this.nodes = new haxe.xml._Fast.NodeListAccess(x);
	this.att = new haxe.xml._Fast.AttribAccess(x);
	this.has = new haxe.xml._Fast.HasAttribAccess(x);
	this.hasNode = new haxe.xml._Fast.HasNodeAccess(x);
};
$hxClasses["haxe.xml.Fast"] = haxe.xml.Fast;
haxe.xml.Fast.__name__ = ["haxe","xml","Fast"];
haxe.xml.Fast.prototype = {
	get_innerData: function() {
		var it = this.x.iterator();
		if(!it.hasNext()) throw this.get_name() + " does not have data";
		var v = it.next();
		var n = it.next();
		if(n != null) {
			if(v.nodeType == Xml.PCData && n.nodeType == Xml.CData && StringTools.trim(v.get_nodeValue()) == "") {
				var n2 = it.next();
				if(n2 == null || n2.nodeType == Xml.PCData && StringTools.trim(n2.get_nodeValue()) == "" && it.next() == null) return n.get_nodeValue();
			}
			throw this.get_name() + " does not only have data";
		}
		if(v.nodeType != Xml.PCData && v.nodeType != Xml.CData) throw this.get_name() + " does not have data";
		return v.get_nodeValue();
	}
	,get_name: function() {
		return this.x.nodeType == Xml.Document?"Document":this.x.get_nodeName();
	}
	,__class__: haxe.xml.Fast
}
haxe.xml.Parser = function() { }
$hxClasses["haxe.xml.Parser"] = haxe.xml.Parser;
haxe.xml.Parser.__name__ = ["haxe","xml","Parser"];
haxe.xml.Parser.parse = function(str) {
	var doc = Xml.createDocument();
	haxe.xml.Parser.doParse(str,0,doc);
	return doc;
}
haxe.xml.Parser.doParse = function(str,p,parent) {
	if(p == null) p = 0;
	var xml = null;
	var state = 1;
	var next = 1;
	var aname = null;
	var start = 0;
	var nsubs = 0;
	var nbrackets = 0;
	var c = str.charCodeAt(p);
	var buf = new StringBuf();
	while(!(c != c)) {
		switch(state) {
		case 0:
			switch(c) {
			case 10:case 13:case 9:case 32:
				break;
			default:
				state = next;
				continue;
			}
			break;
		case 1:
			switch(c) {
			case 60:
				state = 0;
				next = 2;
				break;
			default:
				start = p;
				state = 13;
				continue;
			}
			break;
		case 13:
			if(c == 60) {
				var child = Xml.createPCData(buf.b + HxOverrides.substr(str,start,p - start));
				buf = new StringBuf();
				parent.addChild(child);
				nsubs++;
				state = 0;
				next = 2;
			} else if(c == 38) {
				buf.addSub(str,start,p - start);
				state = 18;
				next = 13;
				start = p + 1;
			}
			break;
		case 17:
			if(c == 93 && str.charCodeAt(p + 1) == 93 && str.charCodeAt(p + 2) == 62) {
				var child = Xml.createCData(HxOverrides.substr(str,start,p - start));
				parent.addChild(child);
				nsubs++;
				p += 2;
				state = 1;
			}
			break;
		case 2:
			switch(c) {
			case 33:
				if(str.charCodeAt(p + 1) == 91) {
					p += 2;
					if(HxOverrides.substr(str,p,6).toUpperCase() != "CDATA[") throw "Expected <![CDATA[";
					p += 5;
					state = 17;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) == 68 || str.charCodeAt(p + 1) == 100) {
					if(HxOverrides.substr(str,p + 2,6).toUpperCase() != "OCTYPE") throw "Expected <!DOCTYPE";
					p += 8;
					state = 16;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) != 45 || str.charCodeAt(p + 2) != 45) throw "Expected <!--"; else {
					p += 2;
					state = 15;
					start = p + 1;
				}
				break;
			case 63:
				state = 14;
				start = p;
				break;
			case 47:
				if(parent == null) throw "Expected node name";
				start = p + 1;
				state = 0;
				next = 10;
				break;
			default:
				state = 3;
				start = p;
				continue;
			}
			break;
		case 3:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(p == start) throw "Expected node name";
				xml = Xml.createElement(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml);
				state = 0;
				next = 4;
				continue;
			}
			break;
		case 4:
			switch(c) {
			case 47:
				state = 11;
				nsubs++;
				break;
			case 62:
				state = 9;
				nsubs++;
				break;
			default:
				state = 5;
				start = p;
				continue;
			}
			break;
		case 5:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				var tmp;
				if(start == p) throw "Expected attribute name";
				tmp = HxOverrides.substr(str,start,p - start);
				aname = tmp;
				if(xml.exists(aname)) throw "Duplicate attribute";
				state = 0;
				next = 6;
				continue;
			}
			break;
		case 6:
			switch(c) {
			case 61:
				state = 0;
				next = 7;
				break;
			default:
				throw "Expected =";
			}
			break;
		case 7:
			switch(c) {
			case 34:case 39:
				state = 8;
				start = p;
				break;
			default:
				throw "Expected \"";
			}
			break;
		case 8:
			if(c == str.charCodeAt(start)) {
				var val = HxOverrides.substr(str,start + 1,p - start - 1);
				xml.set(aname,val);
				state = 0;
				next = 4;
			}
			break;
		case 9:
			p = haxe.xml.Parser.doParse(str,p,xml);
			start = p;
			state = 1;
			break;
		case 11:
			switch(c) {
			case 62:
				state = 1;
				break;
			default:
				throw "Expected >";
			}
			break;
		case 12:
			switch(c) {
			case 62:
				if(nsubs == 0) parent.addChild(Xml.createPCData(""));
				return p;
			default:
				throw "Expected >";
			}
			break;
		case 10:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(start == p) throw "Expected node name";
				var v = HxOverrides.substr(str,start,p - start);
				if(v != parent.get_nodeName()) throw "Expected </" + parent.get_nodeName() + ">";
				state = 0;
				next = 12;
				continue;
			}
			break;
		case 15:
			if(c == 45 && str.charCodeAt(p + 1) == 45 && str.charCodeAt(p + 2) == 62) {
				parent.addChild(Xml.createComment(HxOverrides.substr(str,start,p - start)));
				p += 2;
				state = 1;
			}
			break;
		case 16:
			if(c == 91) nbrackets++; else if(c == 93) nbrackets--; else if(c == 62 && nbrackets == 0) {
				parent.addChild(Xml.createDocType(HxOverrides.substr(str,start,p - start)));
				state = 1;
			}
			break;
		case 14:
			if(c == 63 && str.charCodeAt(p + 1) == 62) {
				p++;
				var str1 = HxOverrides.substr(str,start + 1,p - start - 2);
				parent.addChild(Xml.createProcessingInstruction(str1));
				state = 1;
			}
			break;
		case 18:
			if(c == 59) {
				var s = HxOverrides.substr(str,start,p - start);
				if(s.charCodeAt(0) == 35) {
					var i = s.charCodeAt(1) == 120?Std.parseInt("0" + HxOverrides.substr(s,1,s.length - 1)):Std.parseInt(HxOverrides.substr(s,1,s.length - 1));
					buf.b += Std.string(String.fromCharCode(i));
				} else if(!haxe.xml.Parser.escapes.exists(s)) buf.b += Std.string("&" + s + ";"); else buf.b += Std.string(haxe.xml.Parser.escapes.get(s));
				start = p + 1;
				state = next;
			}
			break;
		}
		c = str.charCodeAt(++p);
	}
	if(state == 1) {
		start = p;
		state = 13;
	}
	if(state == 13) {
		if(p != start || nsubs == 0) parent.addChild(Xml.createPCData(buf.b + HxOverrides.substr(str,start,p - start)));
		return p;
	}
	throw "Unexpected end";
}
js.Boot = function() { }
$hxClasses["js.Boot"] = js.Boot;
js.Boot.__name__ = ["js","Boot"];
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) {
					if(cl == Array) return o.__enum__ == null;
					return true;
				}
				if(js.Boot.__interfLoop(o.__class__,cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
}
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
}
js.html = {}
js.html._CanvasElement = {}
js.html._CanvasElement.CanvasUtil = function() { }
$hxClasses["js.html._CanvasElement.CanvasUtil"] = js.html._CanvasElement.CanvasUtil;
js.html._CanvasElement.CanvasUtil.__name__ = ["js","html","_CanvasElement","CanvasUtil"];
js.html._CanvasElement.CanvasUtil.getContextWebGL = function(canvas,attribs) {
	var _g = 0, _g1 = ["webgl","experimental-webgl"];
	while(_g < _g1.length) {
		var name = _g1[_g];
		++_g;
		var ctx = canvas.getContext(name,attribs);
		if(ctx != null) return ctx;
	}
	return null;
}
var managers = {}
managers.NDiAudioManager = function() {
	this.enabledSoundEffects = true;
	this.enabledSoundBackground = true;
	this.backgroundSoundVolume = 1;
	this.soundFXVolume = 1;
};
$hxClasses["managers.NDiAudioManager"] = managers.NDiAudioManager;
managers.NDiAudioManager.__name__ = ["managers","NDiAudioManager"];
managers.NDiAudioManager.initInstance = function() {
	if(managers.NDiAudioManager.instance == null) managers.NDiAudioManager.instance = new managers.NDiAudioManager();
}
managers.NDiAudioManager.getInstance = function() {
	return managers.NDiAudioManager.instance;
}
managers.NDiAudioManager.prototype = {
	playSoundBackground: function(path) {
		if(this.backgroundSound != null) {
			this.backgroundSound.dispose();
			this.backgroundSound = null;
		}
		var bgSound = managers.NDiResourcesManager.getInstance().loadSound(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,path);
		this.backgroundSound = bgSound.loop(this.backgroundSoundVolume);
		this.setEnabledSoundBackground();
	}
	,playSoundEffect: function(path,vol) {
		if(vol == null) vol = 1;
		if(!this.enabledSoundEffects) return;
		var newSoundFX = managers.NDiResourcesManager.getInstance().loadSound(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,path);
		vol = vol * this.soundFXVolume;
		this.soundFX = newSoundFX.play(vol);
	}
	,setEnabledSoundBackground: function() {
		if(!this.enabledSoundBackground) {
			this.backgroundSound.set_paused(true);
			this.enabledSoundBackground = true;
		} else {
			this.backgroundSound.set_paused(false);
			this.enabledSoundBackground = false;
		}
		util.NDiSaveData.getInstance().setData(globals.NDiVarsToSave.MUTE_MUSIC[0],!this.enabledSoundBackground);
	}
	,setEnabledSoundEffects: function() {
		if(this.enabledSoundEffects) this.enabledSoundEffects = false; else this.enabledSoundEffects = true;
		util.NDiSaveData.getInstance().setData(globals.NDiVarsToSave.MUTE_SOUNDS[0],this.enabledSoundEffects);
	}
	,__class__: managers.NDiAudioManager
}
managers.NDiEnemyManager = function(parent) {
	this.parentGamePlayScene = parent;
	this.indexEnemy = -1;
	this.transform = new flambe.display.Sprite();
	this.isChanging = false;
	this.isAttacking = false;
	this.elapsedTimeToAttack = 0;
	this.totalTimeToAttack = 10;
	this.isTimerToAttackPaused = false;
	this.countDefeatedEnemies = 0;
	this.rangeEnemies = new Array();
	this.valueAttack = 0;
};
$hxClasses["managers.NDiEnemyManager"] = managers.NDiEnemyManager;
managers.NDiEnemyManager.__name__ = ["managers","NDiEnemyManager"];
managers.NDiEnemyManager.__super__ = flambe.Component;
managers.NDiEnemyManager.prototype = $extend(flambe.Component.prototype,{
	addToEntity: function() {
		this.entity = new flambe.Entity();
		this.entity.add(this);
		return this.entity;
	}
	,onUpdate: function(dt) {
		this.updateTimerToAttack(dt);
	}
	,onRemoved: function() {
	}
	,onAdded: function() {
		this.owner.add(new flambe.script.Script());
		this.owner.add(this.transform);
		this.selectEnemy(false);
		this.loadEnemy();
	}
	,addDebug: function() {
		var _g = this;
		var scale = 6.5;
		var posx = 344;
		var btnLeft = new flambe.display.FillSprite(13421772,1,1);
		btnLeft.centerAnchor();
		btnLeft.x.set__(-15 + posx);
		btnLeft.y.set__(btnLeft.getNaturalHeight() * 0.5 + 55);
		btnLeft.alpha.set__(0.2);
		btnLeft.setScale(scale);
		btnLeft.get_pointerDown().connect(function(event) {
			if(_g.isChanging) return;
			_g.changeEnemy(false);
		});
		this.owner.addChild(new flambe.Entity().add(btnLeft));
		var btnRight = new flambe.display.FillSprite(13421772,1,1);
		btnRight.centerAnchor();
		btnRight.x.set__(30 + posx);
		btnRight.y.set__(btnRight.getNaturalHeight() * 0.5 + 55);
		btnRight.alpha.set__(0.2);
		btnRight.setScale(scale);
		btnRight.get_pointerDown().connect(function(event) {
			if(_g.isChanging) return;
			_g.changeEnemy(true);
		});
		this.owner.addChild(new flambe.Entity().add(btnRight));
	}
	,getCurrentEnemy: function() {
		return this.currentEnemy;
	}
	,getParentGamePlay: function() {
		return this.parentGamePlayScene;
	}
	,playSoundsAttack: function() {
		managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.SOUND_ENEMY_COMBOATTACK_FOLDER + "" + this.currentEnemy.enemyName + "" + globals.NDiGameConstants.SOUND_ENEMY_COMBOATTACK_POSTFIX);
	}
	,endingComboAttack: function(param) {
		this.parentGamePlayScene.sendBlockToPuzzle();
	}
	,createComboAttack: function(enemy) {
		var _g = this;
		this.parentGamePlayScene.puzzleInvalidMatch();
		this.parentGamePlayScene.sendBlockToPuzzle(true,globals.NDiTypePopupPuzzle.NDI_POPUP_ENEMY_ATTACK);
		var attackLenghtTime = enemy.attackLenghtTime;
		var lib = enemy.libraryAnimations;
		var enemyName = enemy.enemyName;
		var f1 = new flambe.script.CallFunction(function() {
			var comboAttack = new scenes.components.NDiAnimationMovie(_g.currentEnemy.libraryAnimations,_g.currentEnemy.enemyName);
			comboAttack.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.25 + globals.NDiGameConstants.COMBOATTACK_POSITIONS_OFFSET.get(_g.currentEnemy.type).x);
			comboAttack.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5 + globals.NDiGameConstants.COMBOATTACK_POSITIONS_OFFSET.get(_g.currentEnemy.type).y);
			new flambe.Entity().add(comboAttack);
			_g.parentGamePlayScene.sendComboAttackToPlayer(comboAttack);
			comboAttack.animationIdle(false,_g.currentEnemy.attackLenghtTime,"_comboAttack",$bind(_g,_g.endingComboAttack));
			_g.playSoundsAttack();
			_g.currentEnemy.specialAttack();
			_g.parentGamePlayScene.attackToPlayer(-_g.valueAttack);
		});
		var seq1 = new flambe.script.Sequence([new flambe.script.Delay(0.7),f1]);
		enemy.owner._compMap.Script_18.run(seq1);
	}
	,updateTimerToAttack: function(dt) {
		if(this.isTimerToAttackPaused) return;
		this.elapsedTimeToAttack += dt;
		if(this.elapsedTimeToAttack > this.totalTimeToAttack) {
			this.currentEnemy.animationAttack();
			this.createComboAttack(this.currentEnemy);
			this.elapsedTimeToAttack = 0;
		}
		this.parentGamePlayScene.updateHUDTimeToAttack();
	}
	,changeEnemy: function(next) {
		if(next == null) next = true;
		var _g = this;
		this.parentGamePlayScene.sendBlockToPuzzle(true,globals.NDiTypePopupPuzzle.NDI_POPUP_NEW_ENEMY);
		managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.SOUND_PATH_ENEMY_EXPLOSION + this.currentEnemy.enemyName + "_explosion");
		this.currentEnemy.animationDeath();
		this.isChanging = true;
		var f1 = new flambe.script.CallFunction(function() {
			_g.currentEnemy["delete"]();
			_g.currentEnemy = null;
			_g.countDefeatedEnemies++;
			var f2 = new flambe.script.CallFunction(function() {
				_g.selectEnemy(next);
				_g.loadEnemy();
				_g.elapsedTimeToAttack = 0;
				_g.parentGamePlayScene.updateHUDEnemyLife();
				_g.parentGamePlayScene.initHUDEnemy(globals.NDiGameConstants.ARRAY_ENUM_TYPE_ENEMIES[_g.indexEnemy + 1]);
				_g.isChanging = false;
			});
			var seq2 = new flambe.script.Sequence([new flambe.script.Delay(0.5),f2]);
			_g.owner._compMap.Script_18.run(seq2);
		});
		var seq1 = new flambe.script.Sequence([new flambe.script.Delay(0.99),f1]);
		this.currentEnemy.owner._compMap.Script_18.run(seq1);
	}
	,selectRandomEnemy: function() {
		var percentRandom = Math.random();
		var currentRange = this.parentGamePlayScene.getRange();
		var percents = globals.NDiGameConstants.PERCENT_WEIGHT_ENEMY_ARRAY[currentRange];
		var indexSelected = 0;
		var it = percents.keys();
		var keySelected = null;
		while( it.hasNext() ) {
			var key = it.next();
			var p = percents.get(key);
			if(percentRandom < p) {
				keySelected = key;
				break;
			}
		}
		var _g1 = 1, _g = globals.NDiGameConstants.ARRAY_ENUM_TYPE_ENEMIES.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(globals.NDiGameConstants.ARRAY_ENUM_TYPE_ENEMIES[i] == keySelected) {
				indexSelected = i - 1;
				break;
			}
		}
		return indexSelected;
	}
	,selectUniqueRandomEnemy: function() {
		var indexSelected = 0;
		do indexSelected = this.selectRandomEnemy(); while(this.indexEnemy == indexSelected);
		this.indexEnemy = indexSelected;
	}
	,selectEnemy: function(next) {
		var round = this.parentGamePlayScene.getRound();
		if(next) this.parentGamePlayScene.nextRound(); else this.parentGamePlayScene.previousRound();
		if(this.parentGamePlayScene.getRound() < 0) this.parentGamePlayScene.nextRound();
		this.selectUniqueRandomEnemy();
	}
	,getNumOfDefeatedEnemies: function() {
		return this.countDefeatedEnemies;
	}
	,getPercentTimeToAttack: function() {
		return this.elapsedTimeToAttack / this.totalTimeToAttack;
	}
	,getTotalLife: function() {
		return this.currentEnemy.totalLife;
	}
	,getLife: function() {
		return this.currentEnemy.life;
	}
	,receiveDamage: function(matchingFrequency) {
		this.currentEnemy.receiveDamage(matchingFrequency);
		if(Math.floor(this.currentEnemy.life) < 1) {
			this.currentEnemy.life = 0;
			this.changeEnemy();
		}
	}
	,configEnemyVars: function() {
		this.currentEnemy.type = globals.NDiGameConstants.ARRAY_ENUM_TYPE_ENEMIES[this.indexEnemy + 1];
		this.currentEnemy.parentManager = this;
		var currentRound = this.getParentGamePlay().getRound();
		var currentRange = this.getParentGamePlay().getRange();
		this.configVars = globals.NDiGameConstants.CONFIG_VARS_ENEMY_ARRAY[currentRange].get(this.currentEnemy.type);
		this.valueAttack = this.configVars.get("damage");
		this.elapsedTimeToAttack = 0;
		this.totalTimeToAttack = this.configVars.get("time");
		this.currentEnemy.life = this.currentEnemy.totalLife = this.configVars.get("hitPoints");
		this.currentEnemy.setConfigEnemy(this.configVars);
	}
	,loadEnemy: function() {
		var _g = this;
		this.currentEnemy = factories.NDiEnemyFactory.createEnemy(this.indexEnemy);
		if(this.currentEnemy == null) return;
		this.currentEnemy.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.25);
		this.currentEnemy.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
		this.configEnemyVars();
		this.entity.addChild(this.currentEnemy.addToEntity());
		this.currentEnemy.animationIdle();
		managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.SOUND_ENEMY_APPEAR);
		this.currentEnemy.animationAppear();
		var f1 = new flambe.script.CallFunction(function() {
			_g.parentGamePlayScene.sendBlockToPuzzle();
		});
		var seq1 = new flambe.script.Sequence([new flambe.script.Delay(0.99),f1]);
		this.currentEnemy.owner._compMap.Script_18.run(seq1);
	}
	,get_name: function() {
		return "NDiEnemyManager_6";
	}
	,__class__: managers.NDiEnemyManager
});
managers.NDiHud = function(parent) {
	this.parentGamePlayScene = parent;
	this.leftEntity = new flambe.Entity();
	this.rightEntity = new flambe.Entity();
	this.transform = new flambe.display.Sprite();
	this.enemyLife = new scenes.components.NDiBar1();
	this.playerLife = new scenes.components.NDiBar2();
	this.timerToAttack = new scenes.components.NDiBarTimer1();
	var redShadeScreenTexture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/panels/enemy/tmnt_hitReceiveFrame");
	this.redShadeScreen = new scenes.components.NDiImage(redShadeScreenTexture);
	this.redShadeScreen.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
	this.redShadeScreen.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
	this.redShadeScreen.transform.disablePointer();
};
$hxClasses["managers.NDiHud"] = managers.NDiHud;
managers.NDiHud.__name__ = ["managers","NDiHud"];
managers.NDiHud.__super__ = flambe.Component;
managers.NDiHud.prototype = $extend(flambe.Component.prototype,{
	addToEntity: function() {
		this.entity = new flambe.Entity();
		this.entity.add(this);
		return this.entity;
	}
	,onUpdate: function(dt) {
	}
	,onRemoved: function() {
	}
	,onAdded: function() {
		this.owner.add(this.transform);
		this.addSystemDominantHanded();
		this.addHudEnemy();
		this.addHudPlayer();
		this.addScoreText();
		this.addPauseControls();
		this.leftEntity.addChild(new flambe.Entity().add(this.redShadeScreen));
		this.redShadeScreen.owner.add(new flambe.script.Script());
		this.redShadeScreen.transform.alpha.set__(0);
	}
	,addSystemDominantHanded: function() {
		var transformRight = new flambe.display.Sprite();
		this.rightEntity.add(transformRight);
		this.owner.addChild(this.rightEntity);
		var transformLeft = new flambe.display.Sprite();
		this.leftEntity.add(transformLeft);
		this.owner.addChild(this.leftEntity);
		if(globals.NDiGameGlobals.getInstance().isRightHanded) {
			transformRight.x.set__(globals.NDiGameConstants.GAME_WIDTH / 2);
			transformRight.y.set__(0);
			transformLeft.x.set__(0);
			transformLeft.y.set__(0);
		} else {
			transformLeft.x.set__(globals.NDiGameConstants.GAME_WIDTH / 2);
			transformLeft.y.set__(0);
			transformRight.x.set__(0);
			transformRight.y.set__(0);
		}
	}
	,addPauseControls: function() {
		var _g = this;
		var btnPauseTexture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.GAMEPLAY_BUTTON_PAUSE);
		var btnPause = new scenes.components.NDiButton(btnPauseTexture);
		btnPause.centerAnchor();
		btnPause.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.75);
		btnPause.y.set__(btnPause.getNaturalHeight() / 2);
		btnPause.get_pointerDown().connect(function(event) {
			_g.parentGamePlayScene.gamePause();
		});
		this.owner.addChild(new flambe.Entity().add(btnPause));
	}
	,addHudPlayer: function() {
		this.playerLife.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH / 4);
		var difHeight = Math.abs(flambe.System._platform.getStage().get_height() - globals.NDiGameConstants.GAME_HEIGHT * globals.NDiGameGlobals.getInstance().currentScaleGame) * 0.5;
		this.playerLife.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT - 82 + difHeight);
		this.leftEntity.addChild(this.playerLife.addToEntity());
	}
	,addHudEnemy: function() {
		this.enemyLife.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.25 + 64);
		this.enemyLife.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.25 - 145);
		this.enemyLife.transform.disablePointer();
		this.leftEntity.addChild(this.enemyLife.addToEntity());
		this.timerToAttack.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5 - 50);
		this.timerToAttack.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5 - 30);
		this.leftEntity.addChild(new flambe.Entity().add(this.timerToAttack));
	}
	,setEnemy: function(enemy) {
		this.enemyLife.setEnemy(enemy);
	}
	,addScoreText: function() {
		var texture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.HUD_SCORE_BACKGROUND);
		var bckg = new flambe.display.ImageSprite(texture);
		bckg.centerAnchor();
		bckg.y.set__(bckg.getNaturalHeight() * 0.5);
		bckg.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5 - bckg.getNaturalWidth() * 0.5);
		bckg.disablePointer();
		this.rightEntity.addChild(new flambe.Entity().add(bckg));
		var data = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|hud|label|score_label");
		var font = managers.NDiResourcesManager.getInstance().loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,data.fontName);
		var scoreTextLabel = new flambe.display.TextSprite(font,"SCORE");
		scoreTextLabel.set_align(flambe.display.TextAlign.Center);
		scoreTextLabel.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5 - 145 + data.offsetX);
		scoreTextLabel.y.set__(8 + data.offsetY);
		scoreTextLabel.setScale(data.fontScale);
		this.rightEntity.addChild(new flambe.Entity().add(scoreTextLabel));
		var data1 = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|hud|label|score");
		var font1 = managers.NDiResourcesManager.getInstance().loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,data1.fontName);
		this.scoreText = new flambe.display.TextSprite(font1,"");
		this.updateScore(0);
		this.scoreText.setScale(data1.fontScale);
		this.scoreText.set_align(flambe.display.TextAlign.Right);
		this.scoreText.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5 - 9 + data1.offsetX);
		this.scoreText.y.set__(10 + data1.offsetY);
		this.rightEntity.addChild(new flambe.Entity().add(this.scoreText));
	}
	,effectDamageRedShade: function(timeToEffect) {
		var _g = this;
		this.redShadeScreen.transform.alpha.animateTo(1,timeToEffect);
		var fn1 = new flambe.script.CallFunction(function() {
			_g.redShadeScreen.transform.alpha.animateTo(0,timeToEffect);
		});
		var seq1 = new flambe.script.Sequence([new flambe.script.Delay(timeToEffect),fn1]);
		this.redShadeScreen.owner._compMap.Script_18.run(seq1);
	}
	,showPlayerEffectDamage: function() {
		var _g = this;
		var timeToEffect = 0.15;
		this.effectDamageRedShade(timeToEffect);
		var fn1 = new flambe.script.CallFunction(function() {
			_g.effectDamageRedShade(timeToEffect);
		});
		var seq1 = new flambe.script.Sequence([new flambe.script.Delay(timeToEffect * 2 + 0.1),fn1]);
		this.redShadeScreen.owner._compMap.Script_18.run(seq1);
		var fn2 = new flambe.script.CallFunction(function() {
			_g.effectDamageRedShade(timeToEffect);
		});
		var seq2 = new flambe.script.Sequence([new flambe.script.Delay(timeToEffect * 4 + 0.2),fn2]);
		this.redShadeScreen.owner._compMap.Script_18.run(seq2);
	}
	,updatePlayerLife: function(life) {
		var percenLife = life / 100;
		if(percenLife > 1) percenLife = 1;
		this.playerLife.updateBar(percenLife,"HP: " + Math.floor(life));
	}
	,updateTimerToAttack: function(time) {
		this.timerToAttack.updateBar(time);
	}
	,updateEnemyLife: function(life,totalLife) {
		var textLife = "HP: " + Math.floor(life);
		var percenLife = life / totalLife;
		if(percenLife > 1) percenLife = 1;
		this.enemyLife.updateBar(percenLife,textLife);
	}
	,updateScore: function(newScore) {
		this.scoreText.set_text("" + Math.floor(newScore));
	}
	,get_name: function() {
		return "NDiHud_13";
	}
	,__class__: managers.NDiHud
});
managers.NDiLocalizationManager = function() {
	this.localizationData = new haxe.ds.StringMap();
};
$hxClasses["managers.NDiLocalizationManager"] = managers.NDiLocalizationManager;
managers.NDiLocalizationManager.__name__ = ["managers","NDiLocalizationManager"];
managers.NDiLocalizationManager.initInstance = function() {
	if(managers.NDiLocalizationManager.instance == null) managers.NDiLocalizationManager.instance = new managers.NDiLocalizationManager();
}
managers.NDiLocalizationManager.getInstance = function() {
	return managers.NDiLocalizationManager.instance;
}
managers.NDiLocalizationManager.prototype = {
	getLocalizationData: function(id) {
		return this.localizationData.get(id);
	}
	,initLocalizationData: function() {
		var sXML = managers.NDiResourcesManager.getInstance().loadXML(globals.NDiGameConstants.ASSET_PACKAGE_CONFIG,globals.NDiGameConstants.CONFIG_ASSET_LOCALIZATION_XML);
		var r1 = new EReg(">\\s+<!","g");
		var r2 = new EReg("]>\\s+<","g");
		sXML = r1.replace(sXML,"><!");
		sXML = r2.replace(sXML,"]><");
		var oXML = new haxe.xml.Fast(Xml.parse(sXML).firstElement());
		var $it0 = oXML.nodes.resolve("string").iterator();
		while( $it0.hasNext() ) {
			var stringNode = $it0.next();
			var id = stringNode.att.resolve("id");
			var fontScale = stringNode.att.resolve("fontScale");
			var offsetX = stringNode.att.resolve("offsetX");
			var offsetY = stringNode.att.resolve("offsetY");
			var fontName = stringNode.att.resolve("fontName");
			var content = stringNode.get_innerData();
			var description = stringNode.att.resolve("description");
			var data1 = new data.NDiLocalizationData();
			data1.id = id;
			data1.fontScale = Std.parseFloat(fontScale);
			data1.offsetX = Std.parseFloat(offsetX);
			data1.offsetY = Std.parseFloat(offsetY);
			data1.fontName = fontName;
			data1.content = content;
			data1.description = description;
			this.localizationData.set(id,data1);
		}
	}
	,__class__: managers.NDiLocalizationManager
}
managers.NDiPlayerManager = function(parent) {
	this.score = 0;
	this.distanceTurtles = 109;
	this.life = 100;
	this.transform = new flambe.display.Sprite();
	this.player = new Array();
	this.parentGamePlayScene = parent;
	this.currentWeed = new Array();
	this.currentBlockedTurtle = new Array();
	this.currentIndexWeed = new Array();
	this.firstTurtleAttack = false;
};
$hxClasses["managers.NDiPlayerManager"] = managers.NDiPlayerManager;
managers.NDiPlayerManager.__name__ = ["managers","NDiPlayerManager"];
managers.NDiPlayerManager.__super__ = flambe.Component;
managers.NDiPlayerManager.prototype = $extend(flambe.Component.prototype,{
	addToEntity: function() {
		this.entity = new flambe.Entity();
		this.entity.add(this);
		return this.entity;
	}
	,onAdded: function() {
		this.weedLib = managers.NDiResourcesManager.getInstance().loadSetAnimations(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.WEED_ANIMATION_PACK);
		this.owner.add(this.transform);
		this.owner.add(new flambe.script.Script());
		this.addTurtles();
		null;
	}
	,getPercentLife: function() {
		return this.life / 100;
	}
	,getParentManager: function() {
		return this.parentGamePlayScene;
	}
	,setLife: function(value) {
		this.life = value;
	}
	,getLife: function() {
		return this.life;
	}
	,getScore: function() {
		return this.score;
	}
	,endingHealthParticles: function(matchingFrequency) {
	}
	,addHealthParticles: function(matchingFrequency) {
		var lib = managers.NDiResourcesManager.getInstance().loadSetAnimations(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.HEALTH_PARTICLES_PACK);
		var particles = new scenes.components.NDiAnimationMovie(lib,globals.NDiGameConstants.HEALTH_PARTICLES_ANIMATION);
		particles.transform.x.set__(0);
		particles.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT);
		this.owner.addChild(new flambe.Entity().add(particles));
		particles.animationIdle(false,0.9166,"",$bind(this,this.endingHealthParticles),matchingFrequency);
		managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.SOUND_TMNT_HEALTH);
	}
	,selectTurtleToAttack: function(matchingFrequency) {
		var _g2 = this;
		var libraryAnimations = managers.NDiResourcesManager.getInstance().loadSetAnimations(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.PACK_ANIMATIONS_ATTACK_TURTLES);
		var arrayTurtlesToAttack = new Array();
		var arrayFrequencyMatch = new haxe.ds.StringMap();
		var countedTurtles = 0;
		var _g1 = 0, _g = globals.NDiGameConstants.ARRAY_APPEAR_ORDER_ANIMATIONS.length;
		while(_g1 < _g) {
			var p = _g1++;
			var itMacth = matchingFrequency.keys();
			while( itMacth.hasNext() ) {
				var key = itMacth.next();
				var value = matchingFrequency.get(key);
				if(value > 0) {
					if(globals.NDiGameConstants.ARRAY_APPEAR_ORDER_ANIMATIONS[p][0] == key) {
						var _g3 = 0, _g21 = this.player.length;
						while(_g3 < _g21) {
							var q = _g3++;
							if(this.player[q].type[0] == key && !this.player[q].isBlocked) {
								arrayTurtlesToAttack.push(this.player[q]);
								arrayFrequencyMatch.set(this.player[q].type[0],matchingFrequency.get(this.player[q].type[0]));
								break;
							} else if(this.player[q].isBlocked) null;
						}
						break;
					}
				}
			}
		}
		countedTurtles = arrayTurtlesToAttack.length - 1;
		this.firstTurtleAttack = false;
		var countAnimationsAttacks = 0;
		var _g1 = 0, _g = arrayTurtlesToAttack.length;
		while(_g1 < _g) {
			var p1 = [_g1++];
			var f0 = new flambe.script.CallFunction((function(p1) {
				return function() {
					arrayTurtlesToAttack[p1[0]].animationJump();
					if(p1[0] == 0) managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.SOUND_TMNT_JUMP);
					var f1 = new flambe.script.CallFunction((function() {
						return function() {
							var tmp = arrayTurtlesToAttack[countAnimationsAttacks];
							tmp.transform.set_visible(false);
							tmp.loop("empty_animation");
							var newAttack = new scenes.components.NDiAttackAnimationPlayer(libraryAnimations,tmp,_g2);
							newAttack.attackName = tmp.turtleName;
							var freq = arrayFrequencyMatch.get(tmp.type[0]);
							newAttack.frequencyMatch = freq;
							newAttack.totalTurtles = arrayTurtlesToAttack.length;
							newAttack.transform.x.set__(globals.NDiGameConstants.ARRAY_POSITIONS_ANIMATIONS_ATTACK[tmp.indexTurtle].x);
							newAttack.transform.y.set__(globals.NDiGameConstants.ARRAY_POSITIONS_ANIMATIONS_ATTACK[tmp.indexTurtle].y);
							new flambe.Entity().add(newAttack);
							_g2.parentGamePlayScene.sendAttackAnimationToHUD(newAttack.owner);
							if(countAnimationsAttacks == 0) {
								if(arrayTurtlesToAttack.length == 4) managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.SOUND_TMNT_ATTACK2); else managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.SOUND_TMNT_ATTACK);
							}
							newAttack.animationIdle(countAnimationsAttacks,countedTurtles--);
							countAnimationsAttacks++;
						};
					})());
					var seq1 = new flambe.script.Sequence([new flambe.script.Delay(0.245),f1]);
					arrayTurtlesToAttack[p1[0]].owner._compMap.Script_18.run(seq1);
				};
			})(p1));
			var seq0 = new flambe.script.Sequence([new flambe.script.Delay(0),f0]);
			this.owner._compMap.Script_18.run(seq0);
		}
		return countedTurtles + 1;
	}
	,checkTurtleBlocked: function(matchingFrequency) {
		var blockedAlone = false;
		var _g1 = 0, _g = this.player.length;
		while(_g1 < _g) {
			var index = _g1++;
			var tmpTurtle = this.player[index];
			var freq = matchingFrequency.get(tmpTurtle.type[0]);
			if(freq > 0) {
				if(tmpTurtle.isBlocked) blockedAlone = true; else blockedAlone = false;
			}
		}
		return blockedAlone;
	}
	,setScore: function(matchingFrequency) {
		var valueScore = globals.NDiGameConstants.SCORE_VALUE_COLOR * 2 + (matchingFrequency.get(globals.NDiGameConstants.TOTAL_TOKENS_TYPE) - 2) * 15 + matchingFrequency.get(globals.NDiTypeToken.NDI_TYPE_TURTLE_PIZZA[0]) * globals.NDiGameConstants.SCORE_VALUE_PIZZA + matchingFrequency.get(globals.NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER[0]) * globals.NDiGameConstants.SCORE_VALUE_SPLINTER;
		this.score += valueScore;
	}
	,attackToWeeds: function(matchingFrequency) {
		var it = matchingFrequency.keys();
		while( it.hasNext() ) {
			var i = it.next();
			if(matchingFrequency.get(i) > 0) {
				var _g1 = 0, _g = this.currentIndexWeed.length;
				while(_g1 < _g) {
					var p = _g1++;
					if(i == globals.NDiGameConstants.ARRAY_TYPE_TURTLES[this.currentIndexWeed[p]][0]) {
						if(this.currentWeed[p].life > 0) this.currentWeed[p].receiveDamage(matchingFrequency.get(i));
					}
				}
			}
		}
	}
	,blockPlayer: function(playerToBlock,lifeWeed) {
		var _g1 = 0, _g = this.player.length;
		while(_g1 < _g) {
			var index = _g1++;
			if(this.player[index].type == playerToBlock) {
				this.currentBlockedTurtle.push(this.player[index]);
				this.player[index].isBlocked = true;
				var tmpVine = new game_objects.NDiWeed(this.weedLib,lifeWeed,this.player[index]);
				tmpVine.transform.x.set__(0);
				tmpVine.transform.y.set__(30);
				this.currentWeed.push(tmpVine);
				this.player[index].owner.addChild(new flambe.Entity().add(tmpVine));
				tmpVine.animationIdle();
				tmpVine.animationCreate();
				break;
			}
		}
	}
	,changeBlockPlayers: function(playersToBlock,lifeWeed) {
		var _g1 = 0, _g = playersToBlock.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.blockPlayer(globals.NDiGameConstants.ARRAY_TYPE_TURTLES[playersToBlock[i]],lifeWeed);
		}
	}
	,createBlocks: function(totalBlocks,lifeWeed) {
		this.destroyBlock();
		var _g = 0;
		while(_g < totalBlocks) {
			var i = _g++;
			this.currentIndexWeed[i] = this.getUniqueTurtle();
		}
		this.changeBlockPlayers(this.currentIndexWeed,lifeWeed);
	}
	,getUniqueTurtle: function() {
		var tmpIndex = Math.floor(util.NDiRandomUtils.getRandomFloat(0,4));
		var finalIndex = tmpIndex;
		var _g1 = 0, _g = this.currentIndexWeed.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.currentIndexWeed[i] == tmpIndex) {
				finalIndex = this.getUniqueTurtle();
				break;
			}
		}
		return finalIndex;
	}
	,destroyBlock: function() {
		var _g1 = 0, _g = this.currentWeed.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.currentWeed[i].owner != null) this.currentWeed[i].animationDisappear();
			this.currentWeed[i] = null;
		}
		var _g1 = 0, _g = this.currentBlockedTurtle.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.currentBlockedTurtle[i].isBlocked = false;
		}
		this.currentBlockedTurtle.splice(0,this.currentBlockedTurtle.length);
		this.currentWeed.splice(0,this.currentWeed.length);
	}
	,setDamage: function(value) {
		if(value < 0) {
			var index = Math.floor(util.NDiRandomUtils.getRandomFloat(0,this.player.length));
			this.player[index].animationDamage();
		}
		this.life += value;
		if(this.life < 0) this.life = 0; else if(this.life > 100) this.life = 100;
	}
	,addTurtles: function() {
		var spriteTurtles = globals.NDiGameConstants.ARRAY_ANIMATION_PREFIX_TURTLES;
		var libraryAnimations = managers.NDiResourcesManager.getInstance().loadSetAnimations(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.PACK_ANIMATIONS_TURTLES);
		var _g1 = 0, _g = spriteTurtles.length;
		while(_g1 < _g) {
			var index = _g1++;
			var newTurtle = new game_objects.turtles.NDiTurtle(libraryAnimations);
			newTurtle.type = globals.NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[index + 1];
			this.player[index] = newTurtle;
			this.owner.addChild(new flambe.Entity().add(this.player[index]));
			this.player[index].owner.add(new flambe.script.Script());
			this.player[index].indexTurtle = index;
			this.player[index].turtleName = spriteTurtles[index];
			this.player[index].animationIdle();
			newTurtle.transform.x.set__(globals.NDiGameConstants.ARRAY_X_POSITION_TURTLES[index]);
			var difHeight = Math.abs(flambe.System._platform.getStage().get_height() - globals.NDiGameConstants.GAME_HEIGHT * globals.NDiGameGlobals.getInstance().currentScaleGame) * 0.5;
			newTurtle.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT - 80 + difHeight);
		}
	}
	,get_name: function() {
		return "NDiPlayerManager_12";
	}
	,__class__: managers.NDiPlayerManager
});
managers.NDiResourcesManager = function() {
	this.loadedAssetPacks = new haxe.ds.StringMap();
	this.loadedCache = new haxe.ds.StringMap();
};
$hxClasses["managers.NDiResourcesManager"] = managers.NDiResourcesManager;
managers.NDiResourcesManager.__name__ = ["managers","NDiResourcesManager"];
managers.NDiResourcesManager.addGenericText = function(msg,posX,posY,scale,fontName,align) {
	var font = managers.NDiResourcesManager.getInstance().loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,fontName);
	var titleLabel = new flambe.display.TextSprite(font,"");
	titleLabel.set_align(align);
	titleLabel.x.set__(posX);
	titleLabel.y.set__(posY);
	titleLabel.set_text(msg);
	titleLabel.disablePointer();
	titleLabel.setScale(scale);
	return titleLabel;
}
managers.NDiResourcesManager.initInstance = function() {
	if(managers.NDiResourcesManager.instance == null) managers.NDiResourcesManager.instance = new managers.NDiResourcesManager();
}
managers.NDiResourcesManager.getInstance = function() {
	return managers.NDiResourcesManager.instance;
}
managers.NDiResourcesManager.prototype = {
	getRangeOfRound: function(round) {
		var _g1 = 0, _g = globals.NDiGameConstants.RANGE_ARRAY.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(round <= globals.NDiGameConstants.RANGE_ARRAY[i]) return i;
		}
		return globals.NDiGameConstants.RANGE_ARRAY.length - 1;
	}
	,loadSound: function(packName,path) {
		var mapCache = managers.NDiResourcesManager.getInstance().loadedCache;
		var key = packName + "_" + path;
		if(mapCache.exists(key)) return js.Boot.__cast(mapCache.get(key) , flambe.sound.Sound); else {
			var pack = managers.NDiResourcesManager.getInstance().loadedAssetPacks.get(packName);
			var sound = pack.getSound(path);
			mapCache.set(key,sound);
			return sound;
		}
	}
	,loadSetAnimations: function(packName,path) {
		var mapCache = managers.NDiResourcesManager.getInstance().loadedCache;
		var key = packName + "_" + path;
		if(mapCache.exists(key)) return js.Boot.__cast(mapCache.get(key) , flambe.swf.Library); else {
			var pack = managers.NDiResourcesManager.getInstance().loadedAssetPacks.get(packName);
			var library = new flambe.swf.Library(pack,path);
			mapCache.set(key,library);
			return library;
		}
	}
	,loadXML: function(packName,path) {
		var pack = managers.NDiResourcesManager.getInstance().loadedAssetPacks.get(packName);
		var textFile = pack.getFile(path);
		var xmlString = textFile.toString();
		return xmlString;
	}
	,loadImage: function(packName,path) {
		var mapCache = managers.NDiResourcesManager.getInstance().loadedCache;
		var key = packName + "_" + path;
		if(mapCache.exists(key)) return js.Boot.__cast(mapCache.get(key) , flambe.display.Texture); else {
			var pack = managers.NDiResourcesManager.getInstance().loadedAssetPacks.get(packName);
			var texture = pack.getTexture(path);
			mapCache.set(key,texture);
			return texture;
		}
	}
	,loadFont: function(packName,path) {
		var mapCache = managers.NDiResourcesManager.getInstance().loadedCache;
		var key = packName + "_" + path;
		if(mapCache.exists(key)) return js.Boot.__cast(mapCache.get(key) , flambe.display.Font); else {
			var pack = managers.NDiResourcesManager.getInstance().loadedAssetPacks.get(packName);
			var font = new flambe.display.Font(pack,path);
			mapCache.set(key,font);
			return font;
		}
	}
	,loadAssetPack: function(assetName,progressFunction,completeFunction) {
		var _g = this;
		if(!this.loadedAssetPacks.exists(assetName)) {
			var keyStr = ".com";
			var manifest = flambe.asset.Manifest.build(assetName);
			var base = "";
			base = util.JSEmbedProxy.get_base();
			if(base != "") {
				manifest.set_externalBasePath(base + "assets/");
				manifest.set_relativeBasePath(manifest.get_externalBasePath().substring(manifest.get_externalBasePath().indexOf(keyStr) + keyStr.length));
			}
			var loader = flambe.System._platform.loadAssetPack(manifest);
			loader.progressChanged.connect(function() {
				var ratio = loader._progress / loader._total;
				if(progressFunction != null) progressFunction(ratio);
			});
			loader.get(function(pack) {
				_g.loadedAssetPacks.set(assetName,pack);
				if(completeFunction != null) completeFunction(pack);
			});
		} else if(completeFunction != null) completeFunction(this.loadedAssetPacks.get(assetName));
	}
	,__class__: managers.NDiResourcesManager
}
managers.NDiSceneManager = function() {
	this.director = new flambe.scene.Director();
	this.transform = new flambe.display.Sprite();
	flambe.System.root.add(this.director);
};
$hxClasses["managers.NDiSceneManager"] = managers.NDiSceneManager;
managers.NDiSceneManager.__name__ = ["managers","NDiSceneManager"];
managers.NDiSceneManager.initInstance = function() {
	if(managers.NDiSceneManager.instance == null) managers.NDiSceneManager.instance = new managers.NDiSceneManager();
}
managers.NDiSceneManager.getInstance = function() {
	return managers.NDiSceneManager.instance;
}
managers.NDiSceneManager.prototype = {
	executeChangeScene: function(sceneType) {
		var _g = this;
		var nextScene = null;
		var listPackageDependences = new Array();
		if(this.currentScene != null && this.currentScene.type == globals.NDiTypeScene.NDI_TYPE_SCENE_LOADING) {
			var loadingScene = js.Boot.__cast(this.currentScene , scenes.NDiLoadingScene);
			nextScene = loadingScene.nextScene;
		} else {
			listPackageDependences.push(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL);
			nextScene = factories.NDiSceneFactory.createScene(sceneType);
		}
		var bAllLoaded = true;
		var _g1 = 0;
		while(_g1 < listPackageDependences.length) {
			var pack = listPackageDependences[_g1];
			++_g1;
			if(!managers.NDiResourcesManager.getInstance().loadedAssetPacks.exists(pack)) {
				bAllLoaded = false;
				break;
			}
		}
		if(!bAllLoaded) {
			var loadingScene = new scenes.NDiLoadingScene();
			loadingScene.nextScene = nextScene;
			loadingScene.listPackageDependences = listPackageDependences;
			sceneType = globals.NDiTypeScene.NDI_TYPE_SCENE_LOADING;
			nextScene = loadingScene;
		}
		var sceneEntity = new flambe.Entity();
		sceneEntity.add(new flambe.script.Script());
		var spriteCanvas = new flambe.display.FillSprite(5592405,960,560);
		sceneEntity.addChild(new flambe.Entity().add(spriteCanvas));
		sceneEntity.add(this.transform);
		sceneEntity.add(nextScene);
		if(!bAllLoaded) {
			var transition = new flambe.scene.FadeTransition(0.3,flambe.animation.Ease.quintInOut);
			this.director.unwindToScene(sceneEntity,transition);
		} else {
			var seq = new flambe.script.Sequence([new flambe.script.Delay(0.1),new flambe.script.CallFunction(function() {
				var transition = new flambe.scene.FadeTransition(0.3,flambe.animation.Ease.quintInOut);
				_g.director.unwindToScene(sceneEntity,transition);
			})]);
			this.currentScene.owner._compMap.Script_18.run(seq);
		}
		if(this.currentScene != null) this.currentScene.owner.disposeChildren();
		this.currentScene = nextScene;
		this.currentScene.type = sceneType;
	}
	,changeScene: function(sceneType) {
		this.executeChangeScene(sceneType);
	}
	,__class__: managers.NDiSceneManager
}
managers.NDiTokenManager = function(parent) {
	this.parentScene = parent;
	this.isJoker = false;
	this.isSelecting = false;
	this.gridWidth = 6;
	this.gridHeight = 6;
	this.gridSize = this.gridWidth * this.gridHeight;
	this.gridDistance = globals.NDiGameConstants.TOKENS_DISTANCE;
	this.gridTokens = new Array();
	this.currentPattern = new Array();
	this.linePattern = new Array();
	this.patternCobwebs = new Array();
	this.patternObstacles = new Array();
	this.numObstacles = 4;
	this.indexObstaclesConfig = -1;
	this.isDetectingObstacles = false;
	this.timerTimeoutAnimation = 0;
	this.totalTimerTimeoutAnimation = 6;
	this.totalTokensTimeout = 10;
	this.elapsedTimeToHint = 0;
	this.totalTimeToHint = 6;
	this.firstTimeHint = true;
	this.arrayTokensHint = new Array();
	this.selectedTokensTimeout = new Array();
	this.hidenTokens = new Array();
	this.transform = new flambe.display.Sprite();
	this.entityTokens = new flambe.Entity();
	this.entityObstacles = new flambe.Entity();
	this.isShuffleBocked = false;
	this.isShuffling = false;
	this.popupPuzzle = new scenes.popups.NDiPopupPuzzle();
	this.frequencyMapPuzzle = new haxe.ds.EnumValueMap();
	this.iteratorTypeToken = 0;
	this.countPushPizzas = 0;
};
$hxClasses["managers.NDiTokenManager"] = managers.NDiTokenManager;
managers.NDiTokenManager.__name__ = ["managers","NDiTokenManager"];
managers.NDiTokenManager.__super__ = flambe.Component;
managers.NDiTokenManager.prototype = $extend(flambe.Component.prototype,{
	addToEntity: function() {
		this.entity = new flambe.Entity();
		this.entity.add(this);
		return this.entity;
	}
	,onUpdate: function(dt) {
		this.updateTimeToHint(dt);
	}
	,onRemoved: function() {
		flambe.Component.prototype.onRemoved.call(this);
	}
	,onAdded: function() {
		var texture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.PUZZLE_BACKGROUND);
		var bckg = new flambe.display.ImageSprite(texture);
		bckg.centerAnchor();
		this.owner.addChild(new flambe.Entity().add(bckg));
		this.owner.add(new flambe.script.Script());
		this.owner.addChild(this.entityTokens);
		this.owner.addChild(this.entityObstacles);
		this.owner.add(this.transform);
		this.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5 + 30);
		this.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH / 4);
		this.loadTokens();
		this.owner.addChild(new flambe.Entity().add(this.popupPuzzle));
	}
	,handlePointerUp: function(event) {
		if(this.isSelecting == true) {
			this.isSelecting = false;
			this.validatePattern();
		}
	}
	,handlePointerMove: function(event) {
		var selectedBitmap = js.Boot.__cast(event.hit , flambe.swf.BitmapSprite);
		var selectedToken = selectedBitmap.owner.parent.parent.firstComponent;
		this.selectToken(selectedToken);
	}
	,handlePointerDown: function(event) {
		var selectedBitmap = js.Boot.__cast(event.hit , flambe.swf.BitmapSprite);
		var selectedToken = selectedBitmap.owner.parent.parent.firstComponent;
		this.isSelecting = true;
		this.selectToken(selectedToken);
	}
	,playSoundDisappear: function() {
		managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.SOUND_TOKEN_DISAPPEAR);
	}
	,updateTimeToHint: function(dt) {
		if(this.elapsedTimeToHint >= this.totalTimeToHint) {
			if(this.firstTimeHint) {
				this.findMatch_v1();
				this.firstTimeHint = false;
			}
			this.showHint();
			this.elapsedTimeToHint = 0;
		}
		this.elapsedTimeToHint += dt;
	}
	,showHint: function() {
		var _g = 0, _g1 = this.arrayTokensHint;
		while(_g < _g1.length) {
			var tk = _g1[_g];
			++_g;
			tk.animationTimeOut();
		}
	}
	,findMatch_v1: function() {
		this.arrayTokensHint.splice(0,this.arrayTokensHint.length);
		var jBreak = false;
		var _g1 = 0, _g = this.gridHeight;
		while(_g1 < _g) {
			var j = _g1++;
			jBreak = false;
			var _g3 = 0, _g2 = this.gridWidth;
			while(_g3 < _g2) {
				var i = _g3++;
				var index = j * this.gridWidth + i;
				if(!this.gridTokens[index].isBlocked) {
					this.arrayTokensHint.push(this.gridTokens[index]);
					this.checkMatch(i,j,this.arrayTokensHint);
					if(this.arrayTokensHint.length > 1) {
						jBreak = true;
						break;
					}
				}
				this.arrayTokensHint.splice(0,this.arrayTokensHint.length);
			}
			if(jBreak) break;
		}
	}
	,checkMatch: function(posX,posY,collection) {
		var currentIndex = posY * this.gridWidth + posX;
		var newIndex = 0;
		var px = posX + 1;
		if(px < this.gridWidth) {
			newIndex = posY * this.gridWidth + px;
			if(this.gridTokens[newIndex].type == this.gridTokens[currentIndex].type || this.gridTokens[newIndex].type == globals.NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER || this.gridTokens[currentIndex].type == globals.NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER) {
				if(!this.gridTokens[newIndex].isBlocked) {
					collection.push(this.gridTokens[newIndex]);
					this.checkMatch(px,posY,collection);
					return;
				}
			}
		}
		var py = posY + 1;
		if(py < this.gridHeight) {
			newIndex = py * this.gridWidth + posX;
			if(this.gridTokens[newIndex].type == this.gridTokens[currentIndex].type || this.gridTokens[newIndex].type == globals.NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER || this.gridTokens[currentIndex].type == globals.NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER) {
				if(!this.gridTokens[newIndex].isBlocked) {
					collection.push(this.gridTokens[newIndex]);
					this.checkMatch(posX,py,collection);
					return;
				}
			}
		}
	}
	,hideTokens: function(sizeSmoke) {
		this.goBackStateTokenHiden();
		var index = 0;
		var gridZoneX = 0;
		var gridZoneY = 0;
		var posX = 0;
		var posY = 0;
		var isPair = true;
		if(sizeSmoke % 2 == 0) isPair = true; else isPair = false;
		if(!isPair) {
			posX = Math.floor(util.NDiRandomUtils.getRandomFloat(0,4));
			posY = Math.floor(util.NDiRandomUtils.getRandomFloat(0,4));
			this.addSmokeAnimation(posX + 1,posY + 1,isPair);
			var _g = 0;
			while(_g < sizeSmoke) {
				var row = _g++;
				var _g1 = 0;
				while(_g1 < sizeSmoke) {
					var col = _g1++;
					gridZoneX = posX - (col - 1) + 1;
					gridZoneY = posY - (row - 1) + 1;
					index = gridZoneY * this.gridWidth + gridZoneX;
					this.gridTokens[index].hide();
					this.hidenTokens.push(this.gridTokens[index]);
				}
			}
		} else {
			posX = Math.floor(util.NDiRandomUtils.getRandomFloat(0,3));
			posY = Math.floor(util.NDiRandomUtils.getRandomFloat(0,3));
			this.addSmokeAnimation(posX + 1,posY + 1,isPair);
			var _g = 0;
			while(_g < sizeSmoke) {
				var row = _g++;
				var _g1 = 0;
				while(_g1 < sizeSmoke) {
					var col = _g1++;
					gridZoneX = posX + col;
					gridZoneY = posY + row;
					index = gridZoneY * this.gridWidth + gridZoneX;
					this.gridTokens[index].hide();
					this.hidenTokens.push(this.gridTokens[index]);
				}
			}
		}
	}
	,addSmokeAnimation: function(posX,posY,isPair) {
		var _g = this;
		var sizeWidth = globals.NDiGameConstants.TOKENS_WIDTH * this.gridWidth + this.gridDistance * (this.gridWidth - 1);
		var sizeHeight = globals.NDiGameConstants.TOKENS_HEIGHT * this.gridHeight + this.gridDistance * (this.gridHeight - 1);
		var dx = (globals.NDiGameConstants.TOKENS_WIDTH + this.gridDistance) * posX + globals.NDiGameConstants.TOKENS_WIDTH * 0.5;
		dx = dx - sizeWidth * 0.5;
		var dy = (globals.NDiGameConstants.TOKENS_HEIGHT + this.gridDistance) * posY + globals.NDiGameConstants.TOKENS_HEIGHT * 0.5;
		dy = dy - sizeHeight * 0.5;
		if(isPair) {
			dx += globals.NDiGameConstants.TOKENS_WIDTH * 0.5;
			dy += globals.NDiGameConstants.TOKENS_HEIGHT * 0.5;
		}
		var tmp = managers.NDiResourcesManager.getInstance().loadSetAnimations(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.PACK_SMOKE_ANIMATION);
		this.smokeObject = new flambe.swf.MoviePlayer(tmp);
		this.smokeObject.loop(globals.NDiGameConstants.NAME_SMOKE_ANIMATION);
		var tmpEntity = new flambe.Entity().add(this.smokeObject);
		var tmpTransform = new flambe.display.Sprite();
		tmpTransform.x.set__(dx);
		tmpTransform.y.set__(dy);
		tmpEntity.add(tmpTransform);
		this.owner.addChild(tmpEntity);
		var seq = new flambe.script.Sequence([new flambe.script.Delay(0.5833333333333333),new flambe.script.CallFunction(function() {
			_g.smokeObject.owner.dispose();
		})]);
		this.owner._compMap.Script_18.run(seq);
	}
	,goBackStateTokenHiden: function() {
		if(this.hidenTokens.length > 0) {
			var _g1 = 0, _g = this.hidenTokens.length;
			while(_g1 < _g) {
				var p = _g1++;
				if(!this.hidenTokens[p].isDead) this.hidenTokens[p].hide(false);
			}
		}
		this.hidenTokens.splice(0,this.hidenTokens.length);
	}
	,checkCollisionObstacles: function(entity1,entity2) {
		var rect2 = flambe.display.Sprite.getBounds(entity2);
		var rect2P1 = new math.NDiVector2D(rect2.x,rect2.y);
		var rect2P2 = new math.NDiVector2D(rect2.x + rect2.width,rect2.y + rect2.height);
		var rect2p1middle = new math.NDiVector2D(rect2.x + rect2.width * 0.5,rect2.y + rect2.height * 0.5);
		if(flambe.display.Sprite.hitTest(entity1,rect2P1.x,rect2P1.y) != null) return true;
		if(flambe.display.Sprite.hitTest(entity1,rect2P1.x,rect2P2.y) != null) return true;
		if(flambe.display.Sprite.hitTest(entity1,rect2P2.x,rect2P1.y) != null) return true;
		if(flambe.display.Sprite.hitTest(entity1,rect2P2.x,rect2P2.y) != null) return true;
		if(flambe.display.Sprite.hitTest(entity1,rect2p1middle.x,rect2p1middle.y) != null) return true;
		return false;
	}
	,detectObstacles: function(px,py) {
		if(!this.isDetectingObstacles) return true;
		if(this.currentPattern.length == 0) return true; else {
			var posx = js.Boot.__cast(this.currentPattern[this.currentPattern.length - 1].gridPosition.x , Int);
			var posy = js.Boot.__cast(this.currentPattern[this.currentPattern.length - 1].gridPosition.y , Int);
			if(this.patternObstacles.length > 0) {
				var index1 = posy * this.gridWidth + posx;
				var index2 = py * this.gridWidth + px;
				var point0 = new math.NDiVector2D(this.gridTokens[index1].transform.x._value,this.gridTokens[index1].transform.y._value);
				var point1 = new math.NDiVector2D(this.gridTokens[index2].transform.x._value,this.gridTokens[index2].transform.y._value);
				var tmp = new util.NDiFillLine(point0,point1,18);
				var _g1 = 0, _g = this.patternObstacles.length;
				while(_g1 < _g) {
					var index = _g1++;
					tmp.addToEntity();
					var isColider = this.checkCollisionObstacles(this.patternObstacles[index].owner,tmp.owner);
					tmp.owner.dispose();
					if(isColider) return false;
				}
				tmp = null;
			}
		}
		return true;
	}
	,destroyObstacles: function() {
		if(this.patternObstacles.length > 0) {
			var _g1 = 0, _g = this.patternObstacles.length;
			while(_g1 < _g) {
				var p = _g1++;
				this.patternObstacles[p].owner.dispose();
			}
		}
		this.patternObstacles.splice(0,this.patternObstacles.length);
		this.isDetectingObstacles = false;
	}
	,createRandomObstacles: function() {
		this.destroyObstacles();
		this.isDetectingObstacles = true;
		var indexConfig = Math.floor(util.NDiRandomUtils.getRandomFloat(0,globals.NDiGameConstants.ARRAY_OBSTACLES_CONFIG.length));
		if(this.indexObstaclesConfig < 0) this.indexObstaclesConfig = indexConfig; else {
			while(indexConfig == this.indexObstaclesConfig) indexConfig = Math.floor(util.NDiRandomUtils.getRandomFloat(0,globals.NDiGameConstants.ARRAY_OBSTACLES_CONFIG.length));
			this.indexObstaclesConfig = indexConfig;
		}
		var _g = 0, _g1 = globals.NDiGameConstants.ARRAY_OBSTACLES_CONFIG[this.indexObstaclesConfig];
		while(_g < _g1.length) {
			var obj = _g1[_g];
			++_g;
			var map = obj;
			var direction = map.get("direction");
			var lengthLaser = map.get("length");
			var position = map.get("position");
			var index1 = position.y * this.gridWidth + position.x;
			var laserP1 = new math.NDiVector2D(0,0);
			var laserP2 = new math.NDiVector2D(0,0);
			if(direction == "x") {
				laserP1.x = this.gridTokens[index1].transform.x._value - globals.NDiGameConstants.TOKENS_WIDTH * 0.5 - this.gridDistance * 0.5;
				laserP1.y = this.gridTokens[index1].transform.y._value - globals.NDiGameConstants.TOKENS_HEIGHT * 0.5 - this.gridDistance * 0.5;
				laserP2.x = laserP1.x + globals.NDiGameConstants.TOKENS_WIDTH * lengthLaser + this.gridDistance * (lengthLaser - 1) + this.gridDistance;
				laserP2.y = laserP1.y;
			} else if(direction == "y") {
				laserP1.x = this.gridTokens[index1].transform.x._value - globals.NDiGameConstants.TOKENS_WIDTH * 0.5 - this.gridDistance * 0.5;
				laserP1.y = this.gridTokens[index1].transform.y._value - globals.NDiGameConstants.TOKENS_HEIGHT * 0.5 - this.gridDistance * 0.5;
				laserP2.x = laserP1.x;
				laserP2.y = laserP1.y + globals.NDiGameConstants.TOKENS_HEIGHT * lengthLaser + this.gridDistance * (lengthLaser - 1) + this.gridDistance;
			}
			var newLaser = new game_objects.NDiLaser(laserP1,laserP2);
			newLaser.direction = direction;
			this.entityObstacles.addChild(newLaser.addToEntity());
			this.patternObstacles.push(newLaser);
		}
	}
	,destroyCobwebs: function() {
		this.firstTimeHint = true;
		this.elapsedTimeToHint = 0;
		if(this.patternCobwebs.length > 0) {
			var _g1 = 0, _g = this.patternCobwebs.length;
			while(_g1 < _g) {
				var p = _g1++;
				this.gridTokens[this.patternCobwebs[p].indexToken].isBlocked = false;
				this.patternCobwebs[p].owner.dispose();
			}
		}
		this.patternCobwebs.splice(0,this.patternCobwebs.length);
	}
	,createRandomCobwebs: function(numCobwebs) {
		this.destroyCobwebs();
		var _g = 0;
		while(_g < numCobwebs) {
			var index = _g++;
			var tmpPositions = this.getPositionToCobweb();
			var gridIndex = tmpPositions.y * this.gridWidth + tmpPositions.x;
			var tmpTexture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.SPRITE_COBWEB);
			var newWeb = new scenes.components.NDiTokenStatic(tmpTexture);
			newWeb.centerAnchor();
			newWeb.tokenName = "cobweb";
			newWeb.gridPosition.x = tmpPositions.x;
			newWeb.gridPosition.y = tmpPositions.y;
			newWeb.type = globals.NDiTypeToken.NDI_TYPE_TURTLE_NONE;
			newWeb.indexToken = gridIndex;
			newWeb.x.set__(this.gridTokens[gridIndex].transform.x._value);
			newWeb.y.set__(this.gridTokens[gridIndex].transform.y._value);
			this.gridTokens[gridIndex].isBlocked = true;
			this.entityObstacles.addChild(newWeb.addToEntity());
			this.patternCobwebs.push(newWeb);
		}
	}
	,getPositionToCobweb: function() {
		var posX = Math.floor(util.NDiRandomUtils.getRandomFloat(0,this.gridWidth));
		var posY = Math.floor(util.NDiRandomUtils.getRandomFloat(0,this.gridHeight));
		var position = new math.NDiVector2D(posX,posY);
		if(this.patternCobwebs.length > 0) {
			var _g1 = 0, _g = this.patternCobwebs.length;
			while(_g1 < _g) {
				var p = _g1++;
				if(this.patternCobwebs[p].gridPosition.x == posX && this.patternCobwebs[p].gridPosition.y == posY) {
					position = this.getPositionToCobweb();
					break;
				}
			}
		}
		return position;
	}
	,createLine: function(currentToken) {
		if(this.currentPattern.length > 0) {
			var lineX1 = this.currentPattern[this.currentPattern.length - 1].transform.x._value;
			var lineY1 = this.currentPattern[this.currentPattern.length - 1].transform.y._value;
			var p0 = new math.NDiVector2D(lineX1,lineY1);
			var lineX2 = currentToken.transform.x._value;
			var lineY2 = currentToken.transform.y._value;
			var p1 = new math.NDiVector2D(lineX2,lineY2);
			var newLine = new util.NDiMatchLine(p0,p1,globals.NDiGameConstants.LINE_THICKNESS);
			if(currentToken.type == globals.NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER) newLine.getLine().color = this.currentPattern[this.currentPattern.length - 1].tokenColor; else newLine.getLine().color = currentToken.tokenColor;
			newLine.getLine().disablePointer();
			this.owner.addChild(newLine.addToEntity());
			this.linePattern.push(newLine);
		}
	}
	,unSelectLines: function() {
		var selectedLines = this.linePattern;
		var _g1 = 0, _g = selectedLines.length;
		while(_g1 < _g) {
			var index = _g1++;
			var tmp = selectedLines[index];
			tmp.owner.dispose();
		}
		selectedLines.splice(0,selectedLines.length);
	}
	,shuffle: function() {
		this.unSelectTokens();
		this.unSelectLines();
		this.isShuffling = true;
		if(this.isShuffleBocked) return;
		var m = this.gridTokens.length;
		var t;
		var t1Data;
		var t2Data;
		var i;
		while(m > 0) {
			i = Math.floor(Math.random() * m--);
			t1Data = new scenes.components.NDiToken(null);
			t1Data.gridPosition = this.gridTokens[m].gridPosition;
			t1Data.transform.x.set__(this.gridTokens[m].transform.x._value);
			t1Data.transform.y.set__(this.gridTokens[m].transform.y._value);
			t2Data = new scenes.components.NDiToken(null);
			t2Data.gridPosition = this.gridTokens[i].gridPosition;
			t2Data.transform.x.set__(this.gridTokens[i].transform.x._value);
			t2Data.transform.y.set__(this.gridTokens[i].transform.y._value);
			t = this.gridTokens[m];
			this.gridTokens[m] = this.gridTokens[i];
			this.gridTokens[m].gridPosition = t1Data.gridPosition;
			this.gridTokens[m].transform.x.set__(t1Data.transform.x._value);
			this.gridTokens[m].transform.y.set__(t1Data.transform.y._value);
			this.gridTokens[i] = t;
			this.gridTokens[i].gridPosition = t2Data.gridPosition;
			this.gridTokens[i].transform.x.set__(t2Data.transform.x._value);
			this.gridTokens[i].transform.y.set__(t2Data.transform.y._value);
			t1Data = null;
			t2Data = null;
			t = null;
		}
		this.isShuffling = false;
	}
	,playSoundTokens: function(typeToken) {
		if(typeToken == globals.NDiTypeToken.NDI_TYPE_TURTLE_PIZZA) managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.SOUND_TOKEN_PIZZA); else if(typeToken == globals.NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER) managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.SOUND_TOKEN_SPLINTER); else {
			var index = this.currentPattern.length;
			if(index > globals.NDiGameConstants.ARRAY_SOUND_TOKENS.length - 1) index = globals.NDiGameConstants.ARRAY_SOUND_TOKENS.length - 1;
			managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUND_TOKENS[index]);
		}
	}
	,blockPuzzle: function(popupType) {
		this.popupPuzzle.changeText(popupType);
		this.popupPuzzle.show();
	}
	,unBlockPuzzle: function() {
		this.popupPuzzle.hide();
	}
	,renewToken: function() {
		var _g = this;
		var probabilities = this.calculateProbabilities();
		var countSpace;
		var thereSpaces = false;
		var _g1 = 0, _g2 = this.gridWidth;
		while(_g1 < _g2) {
			var i = _g1++;
			countSpace = 0;
			var _g3 = 0, _g21 = this.gridHeight;
			while(_g3 < _g21) {
				var j = _g3++;
				var jj = this.gridHeight - 1 - j;
				var index = jj * this.gridWidth + i;
				if(this.gridTokens[index] != null && this.gridTokens[index].isDead) countSpace++; else if(countSpace > 0) {
					if(this.gridTokens[index] != null) {
						var dy = this.gridTokens[index].transform.y._value + (globals.NDiGameConstants.TOKENS_HEIGHT + this.gridDistance) * countSpace;
						this.gridTokens[index].transform.y.animateTo(dy,0.4,flambe.animation.Ease.bounceOut);
						this.gridTokens[index].gridPosition.y = jj + countSpace;
						var index2 = (jj + countSpace) * this.gridWidth + i;
						this.gridTokens[index2] = this.gridTokens[index];
						this.gridTokens[index] = null;
					}
				}
			}
			var _g21 = 0;
			while(_g21 < countSpace) {
				var s = _g21++;
				thereSpaces = true;
				var posY = countSpace - 1 - s;
				var posX = js.Boot.__cast(i , Int);
				var index = posY * this.gridWidth + posX;
				this.gridTokens[index] = null;
				this.gridTokens[index] = this.newToken(posX,posY,probabilities);
				var sizeWidth = globals.NDiGameConstants.TOKENS_WIDTH * this.gridWidth + this.gridDistance * (this.gridWidth - 1);
				var sizeHeight = globals.NDiGameConstants.TOKENS_HEIGHT * this.gridHeight + this.gridDistance * (this.gridHeight - 1);
				var dx = (globals.NDiGameConstants.TOKENS_WIDTH + this.gridDistance) * posX + globals.NDiGameConstants.TOKENS_WIDTH * 0.5;
				var dy = (globals.NDiGameConstants.TOKENS_HEIGHT + this.gridDistance) * posY + globals.NDiGameConstants.TOKENS_HEIGHT * 0.5;
				dx = dx - sizeWidth * 0.5;
				dy = dy - sizeHeight * 0.5;
				this.gridTokens[index].transform.x.set__(dx);
				this.gridTokens[index].transform.y.set__(-sizeHeight * 0.5 - 50);
				this.gridTokens[index].transform.y.animateTo(dy,0.4,flambe.animation.Ease.bounceOut);
				this.gridTokens[index].addToEntity();
				this.entityTokens.addChild(this.gridTokens[index].entity);
				this.gridTokens[index].transform.get_pointerDown().connect($bind(this,this.handlePointerDown));
				this.gridTokens[index].transform.get_pointerMove().connect($bind(this,this.handlePointerMove));
			}
		}
		if(thereSpaces) {
			var f1 = new flambe.script.CallFunction(function() {
				_g.isShuffleBocked = false;
				if(_g.isShuffling) _g.shuffle();
			});
			var seq1 = new flambe.script.Sequence([new flambe.script.Delay(0.41),f1]);
			this.owner._compMap.Script_18.run(seq1);
		}
	}
	,validatePattern: function() {
		var _g = this;
		if(this.currentPattern.length > 1) {
			this.firstTimeHint = true;
			this.isShuffleBocked = true;
			this.elapsedTimeToHint = 0;
			var matchingFrequencyMap = new haxe.ds.StringMap();
			var arrayNDiTypeTurtle = Type.allEnums(globals.NDiTypeToken);
			var _g1 = 0;
			while(_g1 < arrayNDiTypeTurtle.length) {
				var p = arrayNDiTypeTurtle[_g1];
				++_g1;
				var str = p[0];
				matchingFrequencyMap.set(str,0);
			}
			matchingFrequencyMap.set(globals.NDiGameConstants.TOTAL_TOKENS_TYPE,0);
			var thereTurtles = false;
			var _g1 = 0, _g11 = this.currentPattern;
			while(_g1 < _g11.length) {
				var p = _g11[_g1];
				++_g1;
				var tmp = js.Boot.__cast(p , scenes.components.NDiToken);
				if(tmp.type != globals.NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER && tmp.type != globals.NDiTypeToken.NDI_TYPE_TURTLE_PIZZA) thereTurtles = true;
				var currentFreq = this.frequencyMapPuzzle.get(tmp.type);
				this.frequencyMapPuzzle.set(tmp.type,currentFreq - 1);
				var typeString = tmp.type[0];
				var frequency = matchingFrequencyMap.get(typeString) + 1;
				matchingFrequencyMap.set(typeString,frequency);
				tmp.entity.add(new flambe.script.Script());
				var fn1 = new flambe.script.CallFunction($bind(tmp,tmp.animationOff));
				var fn2 = new flambe.script.CallFunction($bind(tmp,tmp["delete"]));
				var seq = new flambe.script.Sequence([fn1,new flambe.script.Delay(0.6666666666),fn2]);
				tmp.entity._compMap.Script_18.run(seq);
			}
			var totalMatch = 0;
			var it = matchingFrequencyMap.keys();
			while( it.hasNext() ) {
				var p = it.next();
				var typeString = p;
				var value = matchingFrequencyMap.get(typeString);
				totalMatch += value;
			}
			matchingFrequencyMap.set(globals.NDiGameConstants.TOTAL_TOKENS_TYPE,totalMatch);
			this.parentScene.checkPopupTurtleAttack(thereTurtles,matchingFrequencyMap);
			var seq = new flambe.script.Sequence([new flambe.script.Delay(0.6),new flambe.script.CallFunction(function() {
				_g.parentScene.attackSystem(matchingFrequencyMap);
				_g.renewToken();
				var itMatchingMap = matchingFrequencyMap.keys();
				while( itMatchingMap.hasNext() ) {
					var p = itMatchingMap.next();
					matchingFrequencyMap.remove(p);
				}
				matchingFrequencyMap = null;
			})]);
			this.owner._compMap.Script_18.run(seq);
			this.playSoundDisappear();
		} else {
			var _g1 = 0, _g11 = this.currentPattern;
			while(_g1 < _g11.length) {
				var p = _g11[_g1];
				++_g1;
				var tmp = js.Boot.__cast(p , scenes.components.NDiToken);
				tmp.animationSelectedOff();
				tmp.isSelected = false;
			}
		}
		var _g1 = 0, _g11 = this.linePattern;
		while(_g1 < _g11.length) {
			var p = _g11[_g1];
			++_g1;
			var tmp = js.Boot.__cast(p , util.NDiLine);
			p.owner.dispose();
		}
		this.linePattern.splice(0,this.linePattern.length);
		this.currentPattern.splice(0,this.currentPattern.length);
		this.isJoker = false;
	}
	,checkValidType: function(typeSelected) {
		var lastToken = this.currentPattern[this.currentPattern.length - 1].type;
		if(lastToken == globals.NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER) this.isJoker = true;
		if(typeSelected == lastToken) return true;
		if(typeSelected == globals.NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER) {
			this.isJoker = true;
			return true;
		}
		if(this.isJoker) {
			this.isJoker = false;
			return true;
		}
		return false;
	}
	,checkTokenPosition: function(px,py,typeSelected) {
		if(this.currentPattern.length == 0) return true; else {
			var posx = js.Boot.__cast(this.currentPattern[this.currentPattern.length - 1].gridPosition.x , Int);
			var posy = js.Boot.__cast(this.currentPattern[this.currentPattern.length - 1].gridPosition.y , Int);
			if(posx == px || posy == py) {
				if(Math.abs(posx - px) == 1 || Math.abs(posy - py) == 1) {
					if(this.checkValidType(typeSelected)) return true;
				}
			}
		}
		return false;
	}
	,selectToken: function(selectedToken) {
		if(!this.isSelecting) return;
		if(!this.checkReversePattern(selectedToken)) return;
		if(selectedToken.isSelected) return;
		var posx = js.Boot.__cast(selectedToken.gridPosition.x , Int);
		var posy = js.Boot.__cast(selectedToken.gridPosition.y , Int);
		if(!this.checkTokenPosition(posx,posy,selectedToken.type)) return;
		if(!this.detectObstacles(posx,posy)) return;
		this.playSoundTokens(selectedToken.type);
		this.createLine(selectedToken);
		selectedToken.animationSelectedOn();
		selectedToken.isSelected = true;
		this.currentPattern.push(selectedToken);
	}
	,unSelectTokens: function() {
		var selectedTokens = this.currentPattern;
		var _g1 = 0, _g = selectedTokens.length;
		while(_g1 < _g) {
			var index = _g1++;
			var tmp = selectedTokens[index];
			tmp.animationSelectedOff();
			tmp.isSelected = false;
		}
		selectedTokens.splice(0,selectedTokens.length);
		this.isSelecting = false;
	}
	,checkReversePattern: function(selectedToken) {
		if(selectedToken.isSelected) {
			if(this.currentPattern.length > 1) {
				var secondLast = this.currentPattern[this.currentPattern.length - 2];
				if(secondLast == selectedToken) {
					this.isJoker = false;
					this.currentPattern[this.currentPattern.length - 1].animationSelectedOff();
					this.currentPattern[this.currentPattern.length - 1].isSelected = false;
					this.linePattern[this.linePattern.length - 1].owner.dispose();
					this.linePattern.pop();
					this.currentPattern.pop();
					this.playSoundTokens(secondLast.type);
					return false;
				}
			}
		}
		return true;
	}
	,newToken: function(posX,posY,probabilities) {
		var index = posY * this.gridWidth + posX;
		var selectedTokenIndex = this.calculateToken(probabilities);
		var tmp = managers.NDiResourcesManager.getInstance().loadSetAnimations(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.PACK_ANIMATIONS_TOKENS);
		var newTokenObject = new scenes.components.NDiToken(tmp);
		newTokenObject.indexTypeToken = selectedTokenIndex;
		newTokenObject.tokenName = globals.NDiGameConstants.ARRAY_PREFIX_ANIMATION_TOKEN[selectedTokenIndex];
		newTokenObject.animationIdle();
		newTokenObject.gridPosition.x = posX;
		newTokenObject.gridPosition.y = posY;
		newTokenObject.type = globals.NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[selectedTokenIndex + 1];
		newTokenObject.tokenColor = globals.NDiGameConstants.ARRAY_COLOR_TOKEN[selectedTokenIndex];
		var currentFrequency = this.frequencyMapPuzzle.get(newTokenObject.type);
		this.frequencyMapPuzzle.set(newTokenObject.type,currentFrequency + 1);
		return newTokenObject;
	}
	,calculateToken: function(probabilities) {
		var indexSelected = 0;
		if(this.frequencyMapPuzzle.get(globals.NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER) == 0) indexSelected = this.getIndexToken(globals.NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER) - 1; else if(this.parentScene.checkPushPizzas) {
			indexSelected = this.getIndexToken(globals.NDiTypeToken.NDI_TYPE_TURTLE_PIZZA) - 1;
			this.countPushPizzas++;
			if(this.countPushPizzas >= 2) {
				this.countPushPizzas = 0;
				this.parentScene.checkPushPizzas = false;
			}
		} else {
			probabilities = this.checkPuzzleFrequency(probabilities);
			var percentRandom = util.NDiRandomUtils.getRandomFloat(0,1);
			var _g1 = 1, _g = globals.NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN.length;
			while(_g1 < _g) {
				var i = _g1++;
				var p = probabilities.get(globals.NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[i]);
				if(percentRandom < p) {
					indexSelected = i - 1;
					break;
				}
			}
		}
		return indexSelected;
	}
	,getIndexToken: function(type) {
		var value = 0;
		var _g1 = 1, _g = globals.NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(globals.NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[i] == type) {
				value = i;
				break;
			}
		}
		return value;
	}
	,checkPuzzleFrequency: function(_probabilities) {
		var probabilities = _probabilities;
		var probPizza = probabilities.get(globals.NDiTypeToken.NDI_TYPE_TURTLE_PIZZA);
		var probSplinter = probabilities.get(globals.NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER);
		if(probPizza > 0) {
			if(this.frequencyMapPuzzle.get(globals.NDiTypeToken.NDI_TYPE_TURTLE_PIZZA) > 5) {
				var percents = util.NDiProbabilityUtils.convertRangeToPercent(probabilities);
				var filter = [globals.NDiTypeToken.NDI_TYPE_TURTLE_PIZZA];
				if(probSplinter == 0) filter.push(globals.NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER);
				probabilities = util.NDiProbabilityUtils.createFilteredProbability(percents,filter);
			}
		}
		if(probSplinter > 0) {
			if(this.frequencyMapPuzzle.get(globals.NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER) > 4) {
				var percents = util.NDiProbabilityUtils.convertRangeToPercent(probabilities);
				var filter = [globals.NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER];
				if(probPizza == 0) filter.push(globals.NDiTypeToken.NDI_TYPE_TURTLE_PIZZA);
				probabilities = util.NDiProbabilityUtils.createFilteredProbability(percents,filter);
			}
		}
		return probabilities;
	}
	,calculateProbabilities: function() {
		var playerLife = this.parentScene.getPlayerPercentLife();
		var probabilities = null;
		if(playerLife == 1) probabilities = util.NDiProbabilityUtils.createFilteredProbability(globals.NDiGameConstants.TOKENS_PROBABILITY,[globals.NDiTypeToken.NDI_TYPE_TURTLE_PIZZA]); else if(playerLife < 0.5) probabilities = util.NDiProbabilityUtils.createModifiedProbability(globals.NDiGameConstants.TOKENS_PROBABILITY,globals.NDiTypeToken.NDI_TYPE_TURTLE_PIZZA,0.19); else probabilities = util.NDiProbabilityUtils.createNormalProbabilities(globals.NDiGameConstants.TOKENS_PROBABILITY);
		return probabilities;
	}
	,loadTokens: function() {
		var _g1 = 1, _g = globals.NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.frequencyMapPuzzle.set(globals.NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[i],0);
		}
		var probabilities = this.calculateProbabilities();
		var _g1 = 0, _g = this.gridHeight;
		while(_g1 < _g) {
			var j = _g1++;
			var _g3 = 0, _g2 = this.gridWidth;
			while(_g3 < _g2) {
				var i = _g3++;
				var index = j * this.gridWidth + i;
				this.gridTokens[index] = this.newToken(i,j,probabilities);
				var sizeWidth = globals.NDiGameConstants.TOKENS_WIDTH * this.gridWidth + this.gridDistance * (this.gridWidth - 1);
				var sizeHeight = globals.NDiGameConstants.TOKENS_HEIGHT * this.gridHeight + this.gridDistance * (this.gridHeight - 1);
				var dx = (globals.NDiGameConstants.TOKENS_WIDTH + this.gridDistance) * i + globals.NDiGameConstants.TOKENS_WIDTH * 0.5;
				var dy = (globals.NDiGameConstants.TOKENS_HEIGHT + this.gridDistance) * j + globals.NDiGameConstants.TOKENS_HEIGHT * 0.5;
				dx = dx - sizeWidth * 0.5;
				dy = dy - sizeHeight * 0.5;
				this.gridTokens[index].transform.x.set__(dx);
				this.gridTokens[index].transform.y.set__(dy);
				this.gridTokens[index].addToEntity();
				this.entityTokens.addChild(this.gridTokens[index].entity);
				this.gridTokens[index].transform.get_pointerDown().connect($bind(this,this.handlePointerDown));
				this.gridTokens[index].transform.get_pointerMove().connect($bind(this,this.handlePointerMove));
				flambe.System._platform.getPointer().up.connect($bind(this,this.handlePointerUp));
			}
		}
	}
	,get_name: function() {
		return "NDiTokenManager_4";
	}
	,__class__: managers.NDiTokenManager
});
managers.NDiTutorialEnemyManager = function(parent) {
	managers.NDiEnemyManager.call(this,parent);
	this.activeTimer = false;
};
$hxClasses["managers.NDiTutorialEnemyManager"] = managers.NDiTutorialEnemyManager;
managers.NDiTutorialEnemyManager.__name__ = ["managers","NDiTutorialEnemyManager"];
managers.NDiTutorialEnemyManager.__super__ = managers.NDiEnemyManager;
managers.NDiTutorialEnemyManager.prototype = $extend(managers.NDiEnemyManager.prototype,{
	updateTimerToAttack: function(dt) {
		if(this.activeTimer) managers.NDiEnemyManager.prototype.updateTimerToAttack.call(this,dt);
	}
	,__class__: managers.NDiTutorialEnemyManager
});
managers.NDiTutorialTokenManager = function(parent) {
	managers.NDiTokenManager.call(this,parent);
	this.h1Texture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/panels/tutorial/tutorial_highlight_twotokens");
	this.h2Texture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/panels/tutorial/tutorial_highlight_threetokens");
	this.h3Texture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/panels/tutorial/tutorial_highlight_timer");
	this.highLight = new scenes.components.NDiTutorialHighlight(this.h1Texture);
	this.highLightTimer = new scenes.components.NDiTutorialHighlight(this.h3Texture);
};
$hxClasses["managers.NDiTutorialTokenManager"] = managers.NDiTutorialTokenManager;
managers.NDiTutorialTokenManager.__name__ = ["managers","NDiTutorialTokenManager"];
managers.NDiTutorialTokenManager.__super__ = managers.NDiTokenManager;
managers.NDiTutorialTokenManager.prototype = $extend(managers.NDiTokenManager.prototype,{
	onAdded: function() {
		managers.NDiTokenManager.prototype.onAdded.call(this);
		this.addHighLight();
	}
	,shuffle: function() {
	}
	,changeHighLight: function() {
		var step = (js.Boot.__cast(this.parentScene , scenes.NDiTutorialScene)).currentStep;
		if(step == 0) {
			this.highLight.texture = this.h1Texture;
			this.highLight.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.75 - 3);
			this.highLight.y.set__(110);
		} else {
			this.highLight.texture = this.h2Texture;
			this.highLight.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.75 - 6);
			this.highLight.y.set__(103);
		}
		if(step >= 2) {
			this.highLight.set_visible(false);
			(js.Boot.__cast(this.parentScene , scenes.NDiTutorialScene)).entityHighLights.addChild(new flambe.Entity().add(this.highLightTimer));
			this.highLightTimer.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5 - 96);
			this.highLightTimer.y.set__(7);
			(js.Boot.__cast(this.parentScene , scenes.NDiTutorialScene)).activeTimerEnemy();
		}
	}
	,addHighLight: function() {
		this.highLight.centerAnchor();
		this.highLight.disablePointer();
		(js.Boot.__cast(this.parentScene , scenes.NDiTutorialScene)).entityHighLights.addChild(new flambe.Entity().add(this.highLight));
		this.changeHighLight();
	}
	,unvalidateTokens: function() {
		var _g = 0, _g1 = this.currentPattern;
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			var tmp = js.Boot.__cast(p , scenes.components.NDiToken);
			tmp.animationSelectedOff();
			tmp.isSelected = false;
		}
		var _g = 0, _g1 = this.linePattern;
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			var tmp = js.Boot.__cast(p , util.NDiLine);
			p.owner.dispose();
		}
		this.linePattern.splice(0,this.linePattern.length);
		this.currentPattern.splice(0,this.currentPattern.length);
		this.isJoker = false;
	}
	,validateTokens: function() {
		var parentSceneTut = js.Boot.__cast(this.parentScene , scenes.NDiTutorialScene);
		managers.NDiTokenManager.prototype.validatePattern.call(this);
		parentSceneTut.hideDialog(2.8);
		if(parentSceneTut.currentStep == 2) {
			var f1 = new flambe.script.CallFunction(function() {
				parentSceneTut.endingTutorial();
			});
			var seq1 = new flambe.script.Sequence([new flambe.script.Delay(3.3),f1]);
			this.owner._compMap.Script_18.run(seq1);
		}
	}
	,validatePattern: function() {
		var parentSceneTut = js.Boot.__cast(this.parentScene , scenes.NDiTutorialScene);
		if(parentSceneTut.currentStep == 0) {
			if(this.currentPattern.length > 1) this.validateTokens(); else this.unvalidateTokens();
		} else if(parentSceneTut.currentStep > 0) {
			if(this.currentPattern.length > 2) this.validateTokens(); else this.unvalidateTokens();
		}
	}
	,renewToken: function() {
		(js.Boot.__cast(this.parentScene , scenes.NDiTutorialScene)).currentStep++;
		this.changeHighLight();
		managers.NDiTokenManager.prototype.renewToken.call(this);
	}
	,newToken: function(posX,posY,probabilities) {
		var index = posY * this.gridWidth + posX;
		var selectedTokenIndex = this.predefinedToken(index);
		var tmp = managers.NDiResourcesManager.getInstance().loadSetAnimations(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.PACK_ANIMATIONS_TOKENS);
		var newTokenObject = new scenes.components.NDiToken(tmp);
		newTokenObject.indexTypeToken = selectedTokenIndex;
		newTokenObject.tokenName = globals.NDiGameConstants.ARRAY_PREFIX_ANIMATION_TOKEN[selectedTokenIndex];
		newTokenObject.animationIdle();
		newTokenObject.gridPosition.x = posX;
		newTokenObject.gridPosition.y = posY;
		newTokenObject.type = globals.NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[selectedTokenIndex + 1];
		newTokenObject.tokenColor = globals.NDiGameConstants.ARRAY_COLOR_TOKEN[selectedTokenIndex];
		return newTokenObject;
	}
	,predefinedToken: function(index) {
		if((js.Boot.__cast(this.parentScene , scenes.NDiTutorialScene)).currentStep == 0) {
			var _g1 = 0, _g = globals.NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(globals.NDiGameConstants.ARRAY_TUTORIAL_TOKENS_STEP1[index] == globals.NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[i]) return i - 1;
			}
		} else {
			var _g1 = 0, _g = globals.NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(globals.NDiGameConstants.ARRAY_TUTORIAL_TOKENS_STEP2[index] == globals.NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[i]) return i - 1;
			}
		}
		return 0;
	}
	,__class__: managers.NDiTutorialTokenManager
});
math.NDiMath = function() { }
$hxClasses["math.NDiMath"] = math.NDiMath;
math.NDiMath.__name__ = ["math","NDiMath"];
scenes.NDiAbstractScene = function(opaque) {
	if(opaque == null) opaque = true;
	flambe.scene.Scene.call(this,opaque);
	this.lastWidth = 0;
	this.lastHeight = 0;
	this.lastPosX = 0;
	this.lastPosY = 0;
	this.transform = new flambe.display.Sprite();
	this.thereAudio = false;
};
$hxClasses["scenes.NDiAbstractScene"] = scenes.NDiAbstractScene;
scenes.NDiAbstractScene.__name__ = ["scenes","NDiAbstractScene"];
scenes.NDiAbstractScene.__super__ = flambe.scene.Scene;
scenes.NDiAbstractScene.prototype = $extend(flambe.scene.Scene.prototype,{
	dispose: function() {
		flambe.scene.Scene.prototype.dispose.call(this);
	}
	,updateDisplaySize: function() {
		var tWidth = flambe.System._platform.getStage().get_width();
		var tHeight = flambe.System._platform.getStage().get_height();
		if(this.lastWidth != flambe.System._platform.getStage().get_width() || this.lastHeight != flambe.System._platform.getStage().get_height()) {
			var tScale = 1;
			if(tWidth / globals.NDiGameConstants.GAME_WIDTH < tHeight / globals.NDiGameConstants.GAME_HEIGHT) tScale = tWidth / globals.NDiGameConstants.GAME_WIDTH; else tScale = tHeight / globals.NDiGameConstants.GAME_HEIGHT;
			globals.NDiGameGlobals.getInstance().currentScaleGame = tScale;
			this.transform.setScale(tScale);
			var incX = Math.abs(flambe.System._platform.getStage().get_width() - globals.NDiGameConstants.GAME_WIDTH * tScale) / 2;
			if(this.transform.x._value + incX != this.lastPosX) {
				this.lastPosX = this.transform.x._value + incX;
				this.transform.x.set__(incX);
			}
			var incY = Math.abs(flambe.System._platform.getStage().get_height() - globals.NDiGameConstants.GAME_HEIGHT * tScale) / 2;
			if(this.transform.y._value + incY != this.lastPosY) {
				this.lastPosY = managers.NDiSceneManager.getInstance().transform.y._value + incY;
				this.transform.y.set__(incY);
			}
			this.lastWidth = flambe.System._platform.getStage().get_width();
			this.lastHeight = flambe.System._platform.getStage().get_height();
		}
	}
	,onUpdate: function(dt) {
		this.updateDisplaySize();
	}
	,onAdded: function() {
		flambe.scene.Scene.prototype.onAdded.call(this);
		this.owner.add(this.transform);
		this.updateDisplaySize();
	}
	,__class__: scenes.NDiAbstractScene
});
scenes.NDiCreditsScene = function() {
	this.creditIndex = 0;
	scenes.NDiAbstractScene.call(this);
	this.rootEntity = new flambe.Entity();
	this.script = new flambe.script.Script();
	this.rootEntity.add(this.script);
};
$hxClasses["scenes.NDiCreditsScene"] = scenes.NDiCreditsScene;
scenes.NDiCreditsScene.__name__ = ["scenes","NDiCreditsScene"];
scenes.NDiCreditsScene.__super__ = scenes.NDiAbstractScene;
scenes.NDiCreditsScene.prototype = $extend(scenes.NDiAbstractScene.prototype,{
	onAdded: function() {
		scenes.NDiAbstractScene.prototype.onAdded.call(this);
		this.owner.addChild(this.rootEntity);
		this.loadCreditsXML();
		this.addBackground();
		this.owner.addChild(new flambe.Entity().add(this.textTitle));
		this.owner.addChild(new flambe.Entity().add(this.textNames));
		this.owner.addChild(new flambe.Entity().add(this.textStudio));
		this.setCreditStudio("Credits",500,150);
		this.loadNextTitle();
		this.addButtonBack();
		this.addCreditsTitle();
	}
	,setCreditStudio: function(message,posX,posY) {
		if(posY == null) posY = 500;
		if(posX == null) posX = 500;
		if(message == null) message = "Credits";
		this.textStudio.set_text(message);
		this.textStudio.set_align(flambe.display.TextAlign.Center);
		this.textStudio.x.set__(posX);
		this.textStudio.y.set__(posY);
	}
	,setName: function(message,posX,posY) {
		if(posY == null) posY = 500;
		if(posX == null) posX = 500;
		if(message == null) message = "Default name";
		this.textNames.set_text(message);
		this.textNames.set_align(flambe.display.TextAlign.Center);
		this.textNames.x.set__(posX);
		this.textNames.y.set__(posY);
	}
	,setTitle: function(message,posX,posY) {
		if(posY == null) posY = 500;
		if(posX == null) posX = 500;
		if(message == null) message = "Default title";
		this.textTitle.set_text(message);
		this.textTitle.set_align(flambe.display.TextAlign.Center);
		this.textTitle.x.set__(posX);
		this.textTitle.y.set__(posY);
	}
	,addCreditsTitle: function() {
		var texture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.CREDITS_TITLE);
		var sprite = new flambe.display.ImageSprite(texture);
		sprite.centerAnchor();
		sprite.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.25 - 80);
		sprite.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5 + 20);
		this.rootEntity.addChild(new flambe.Entity().add(sprite));
	}
	,addButtonBack: function() {
		var texture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.CREDITS_BUTTON_BACK);
		var sprite = new flambe.display.ImageSprite(texture);
		sprite.centerAnchor();
		sprite.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.25 - 80);
		sprite.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.25 - 200);
		sprite.get_pointerDown().connect(function(event) {
			managers.NDiSceneManager.getInstance().changeScene(globals.NDiTypeScene.NDI_TYPE_SCENE_MAINMENU);
		});
		this.rootEntity.addChild(new flambe.Entity().add(sprite));
	}
	,addBackground: function() {
		var backgroundTexture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.CREDITS_BACKGROUND);
		this.background = new flambe.display.ImageSprite(backgroundTexture);
		this.background.centerAnchor();
		this.background.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
		this.background.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
		this.rootEntity.addChild(new flambe.Entity().add(this.background));
	}
	,loadNextTitle: function() {
		var _g = this;
		this.script.run(new flambe.script.Sequence([new flambe.script.AnimateTo(this.textNames.alpha,0,0.4),new flambe.script.AnimateTo(this.textTitle.alpha,0,0.4),new flambe.script.Delay(1.0),new flambe.script.CallFunction(function() {
			_g.setCreditStudio("Credits\n(" + _g.credits[_g.creditIndex].studio + ")",500,150);
			_g.setTitle(_g.credits[_g.creditIndex].title,500,250);
			_g.setName(_g.credits[_g.creditIndex].name,500,300);
		}),new flambe.script.AnimateTo(this.textTitle.alpha,0.8,0.4),new flambe.script.AnimateTo(this.textNames.alpha,0.8,0.4),new flambe.script.CallFunction(function() {
			haxe.Timer.delay($bind(_g,_g.loadNextTitle),globals.NDiGameConstants.CREDITS_DURATION);
		})]));
		this.creditIndex++;
		if(this.creditIndex >= this.credits.length) this.creditIndex = 0;
	}
	,loadCreditsXML: function() {
		this.credits = new Array();
		var textFile = managers.NDiResourcesManager.getInstance().loadXML(globals.NDiGameConstants.ASSET_PACKAGE_CONFIG,globals.NDiGameConstants.CONFIG_ASSET_CREDITS_XML);
		var myXML = new haxe.xml.Fast(Xml.parse(textFile).firstElement());
		var studioName = "";
		var $it0 = myXML.nodes.resolve("studio").iterator();
		while( $it0.hasNext() ) {
			var studioNode = $it0.next();
			studioName = studioNode.att.resolve("name");
			var $it1 = studioNode.nodes.resolve("credit").iterator();
			while( $it1.hasNext() ) {
				var creditNode = $it1.next();
				var credit = new data.NDiCreditData();
				credit.studio = studioName;
				credit.title = creditNode.node.resolve("title").get_innerData();
				var names = "";
				var $it2 = creditNode.nodes.resolve("name").iterator();
				while( $it2.hasNext() ) {
					var nameNode = $it2.next();
					names += nameNode.get_innerData() + "\n";
				}
				credit.name = names;
				this.credits.push(credit);
			}
		}
	}
	,__class__: scenes.NDiCreditsScene
});
scenes.NDiGamePlayScene = function() {
	scenes.NDiAbstractScene.call(this);
	this.rootEntity = new flambe.Entity();
	this.leftEntity = new flambe.Entity();
	this.rightEntity = new flambe.Entity();
	this.puzzleBoard = new managers.NDiTokenManager(this);
	this.enemyManager = new managers.NDiEnemyManager(this);
	this.hud = new managers.NDiHud(this);
	this.playerManager = new managers.NDiPlayerManager(this);
	this.isGameOver = false;
	this.isGamePause = false;
	this.rootEntity.add(new flambe.script.Script());
	this.pauseScene = new scenes.components.NDiPause(this);
	this.currentRound = 0;
	this.currentRange = 0;
	this.checkPushPizzas = false;
	this.initAssets();
};
$hxClasses["scenes.NDiGamePlayScene"] = scenes.NDiGamePlayScene;
scenes.NDiGamePlayScene.__name__ = ["scenes","NDiGamePlayScene"];
scenes.NDiGamePlayScene.__super__ = scenes.NDiAbstractScene;
scenes.NDiGamePlayScene.prototype = $extend(scenes.NDiAbstractScene.prototype,{
	onUpdate: function(dt) {
		scenes.NDiAbstractScene.prototype.onUpdate.call(this,dt);
	}
	,onRemoved: function() {
	}
	,addBackground: function() {
		this.backgroundGamePlay.centerAnchor();
		this.backgroundGamePlay.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
		this.backgroundGamePlay.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
		this.rootEntity.addChild(new flambe.Entity().add(this.backgroundGamePlay));
	}
	,initHud: function() {
		this.hud.updateTimerToAttack(this.enemyManager.getPercentTimeToAttack());
		this.hud.updateEnemyLife(this.enemyManager.getLife(),this.enemyManager.getTotalLife());
		this.hud.updatePlayerLife(this.playerManager.getLife());
		this.initHUDEnemy(globals.NDiGameConstants.ARRAY_ENUM_TYPE_ENEMIES[this.enemyManager.indexEnemy + 1]);
	}
	,onAdded: function() {
		scenes.NDiAbstractScene.prototype.onAdded.call(this);
		this.owner.addChild(this.rootEntity);
		this.addBackground();
		this.addSystemDominantHanded();
		this.rightEntity.addChild(this.puzzleBoard.addToEntity());
		this.leftEntity.addChild(this.enemyManager.addToEntity());
		this.leftEntity.addChild(this.playerManager.addToEntity());
		this.rootEntity.addChild(this.hud.addToEntity());
		this.initHud();
		var seq = new flambe.script.Sequence([new flambe.script.Delay(5),new flambe.script.CallFunction(function() {
		})]);
		this.rootEntity._compMap.Script_18.run(seq);
		this.addDebugSystem();
	}
	,addDebugSystem: function() {
		if(globals.NDiGameGlobals.getInstance().bCycleEnemies) this.enemyManager.addDebug();
	}
	,addSystemDominantHanded: function() {
		var transformLeft = new flambe.display.Sprite();
		this.leftEntity.add(transformLeft);
		this.rootEntity.addChild(this.leftEntity);
		var transformRight = new flambe.display.Sprite();
		this.rightEntity.add(transformRight);
		this.rootEntity.addChild(this.rightEntity);
		if(globals.NDiGameGlobals.getInstance().isRightHanded) {
			transformRight.x.set__(globals.NDiGameConstants.GAME_WIDTH / 2);
			transformRight.y.set__(0);
			transformLeft.x.set__(0);
			transformLeft.y.set__(0);
		} else {
			transformLeft.x.set__(globals.NDiGameConstants.GAME_WIDTH / 2);
			transformLeft.y.set__(0);
			transformRight.x.set__(0);
			transformRight.y.set__(0);
		}
	}
	,getRange: function() {
		return this.currentRange;
	}
	,getRound: function() {
		return this.currentRound;
	}
	,previousRound: function() {
		this.currentRound--;
		this.currentRange = managers.NDiResourcesManager.getInstance().getRangeOfRound(this.currentRound);
		this.checkPizzaRound();
	}
	,nextRound: function() {
		this.currentRound++;
		this.currentRange = managers.NDiResourcesManager.getInstance().getRangeOfRound(this.currentRound);
		this.checkPizzaRound();
	}
	,checkPizzaRound: function() {
		this.checkPushPizzas = false;
		if((this.currentRound + 1) % 5 == 0) this.checkPushPizzas = true;
	}
	,gamePause: function(active) {
		if(active == null) active = true;
		if(active) {
			this.isGamePause = true;
			new flambe.Entity().add(this.pauseScene);
			managers.NDiSceneManager.getInstance().director.pushScene(this.pauseScene.owner);
		} else {
			managers.NDiSceneManager.getInstance().director.popScene();
			this.isGamePause = false;
		}
	}
	,gameOver: function() {
		if(!this.isGameOver) {
			this.gameOverDisplay.setValues(this.playerManager.getScore(),this.enemyManager.getNumOfDefeatedEnemies());
			new flambe.Entity().add(this.gameOverDisplay);
			managers.NDiSceneManager.getInstance().director.pushScene(this.gameOverDisplay.owner);
			this.isGameOver = true;
		}
	}
	,setPauseTimerToAttackPaused: function(value) {
		this.enemyManager.isTimerToAttackPaused = value;
	}
	,getStateEnemyChange: function() {
		return this.enemyManager.isChanging;
	}
	,getPlayerPercentLife: function() {
		return this.playerManager.getPercentLife();
	}
	,sendSmokeToPlayer: function(sizeSmoke,destroy) {
		if(destroy == null) destroy = false;
		if(!destroy) this.puzzleBoard.hideTokens(sizeSmoke); else this.puzzleBoard.goBackStateTokenHiden();
	}
	,sendBlockToPlayer: function(totalBlocks,lifeWeed,destroy) {
		if(destroy == null) destroy = false;
		if(!destroy) this.playerManager.createBlocks(totalBlocks,lifeWeed); else this.playerManager.destroyBlock();
	}
	,sendAttackToWeeds: function(matchingFrequency) {
		this.playerManager.attackToWeeds(matchingFrequency);
	}
	,sendObstaclesToPuzzle: function(destroy) {
		if(destroy == null) destroy = false;
		if(!destroy) this.puzzleBoard.createRandomObstacles(); else this.puzzleBoard.destroyObstacles();
	}
	,sendCobwebsToPuzzle: function(destroy,value) {
		if(value == null) value = 0;
		if(!destroy) this.puzzleBoard.createRandomCobwebs(value); else this.puzzleBoard.destroyCobwebs();
	}
	,sendComboAttackToPlayer: function(comboAttack) {
		this.playerManager.owner.addChild(comboAttack.owner);
	}
	,sendAttackAnimationToHUD: function(attackEntity) {
		this.hud.owner.addChild(attackEntity);
	}
	,sendBlockToPuzzle: function(block,popupType) {
		if(block == null) block = false;
		var _g = this;
		if(this.getStateEnemyChange()) return;
		if(block) {
			this.setPauseTimerToAttackPaused(true);
			this.puzzleBoard.blockPuzzle(popupType);
		} else {
			this.puzzleBoard.unBlockPuzzle();
			var f1 = new flambe.script.CallFunction(function() {
				_g.setPauseTimerToAttackPaused(false);
			});
			var seq1 = new flambe.script.Sequence([new flambe.script.Delay(0.3),f1]);
			this.puzzleBoard.owner._compMap.Script_18.run(seq1);
		}
	}
	,checkPopupTurtleAttack: function(thereTurtles,matchingFrequency) {
		if(thereTurtles) {
			if(!this.playerManager.checkTurtleBlocked(matchingFrequency)) this.sendBlockToPuzzle(true,globals.NDiTypePopupPuzzle.NDI_POPUP_TURTLE_ATTACK);
		}
	}
	,puzzleInvalidMatch: function() {
		this.puzzleBoard.unSelectTokens();
		this.puzzleBoard.unSelectLines();
	}
	,doShufflePuzzle: function() {
		this.puzzleBoard.shuffle();
	}
	,updateHUDTimeToAttack: function() {
		this.hud.updateTimerToAttack(this.enemyManager.getPercentTimeToAttack());
	}
	,updateHUDEnemyLife: function() {
		this.hud.updateEnemyLife(this.enemyManager.getLife(),this.enemyManager.getTotalLife());
	}
	,initHUDEnemy: function(enemy) {
		this.hud.setEnemy(enemy);
	}
	,attackToEnemie: function(matchingFrequency) {
		this.enemyManager.receiveDamage(matchingFrequency);
		this.updateHUDEnemyLife();
	}
	,attackToPlayer: function(value) {
		if(value < 0) this.hud.showPlayerEffectDamage();
		this.playerManager.setDamage(value);
		var currentLifePlayer = this.playerManager.getLife();
		this.hud.updatePlayerLife(currentLifePlayer);
		if(currentLifePlayer < 1) this.gameOver();
	}
	,PizzaBonus: function(pizzaMatches) {
		var lifeConstant = 15;
		var value = pizzaMatches * lifeConstant + (pizzaMatches - 1) * (lifeConstant * 0.5);
		this.attackToPlayer(value);
	}
	,attackSystem: function(matchingFrequency) {
		var _g = this;
		this.playerManager.setScore(matchingFrequency);
		this.hud.updateScore(this.playerManager.getScore());
		var numTurtlesToAttack = this.playerManager.selectTurtleToAttack(matchingFrequency);
		var pizzaMatches = matchingFrequency.get(globals.NDiTypeToken.NDI_TYPE_TURTLE_PIZZA[0]);
		var f0 = new flambe.script.CallFunction(function() {
			if(pizzaMatches > 0) {
				_g.playerManager.addHealthParticles(matchingFrequency);
				_g.PizzaBonus(pizzaMatches);
			} else {
			}
		});
		this.enemyManager.getCurrentEnemy().turnSpecialAttack(matchingFrequency);
		var seq0 = new flambe.script.Sequence([new flambe.script.Delay(numTurtlesToAttack * 1.08),f0]);
		this.playerManager.owner._compMap.Script_18.run(seq0);
	}
	,initAssets: function() {
		var backgroundTexture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/backgrounds/background1");
		this.backgroundGamePlay = new flambe.display.ImageSprite(backgroundTexture);
		this.gameOverDisplay = new scenes.components.NDiGameOver();
	}
	,__class__: scenes.NDiGamePlayScene
});
scenes.NDiIntroScene = function() {
	scenes.NDiAbstractScene.call(this);
	this.rootEntity = new flambe.Entity();
	this.rootEntity.add(new flambe.script.Script());
};
$hxClasses["scenes.NDiIntroScene"] = scenes.NDiIntroScene;
scenes.NDiIntroScene.__name__ = ["scenes","NDiIntroScene"];
scenes.NDiIntroScene.__super__ = scenes.NDiAbstractScene;
scenes.NDiIntroScene.prototype = $extend(scenes.NDiAbstractScene.prototype,{
	onAdded: function() {
		scenes.NDiAbstractScene.prototype.onAdded.call(this);
		this.owner.addChild(this.rootEntity);
		this.addBackground();
		this.addTexts();
		this.addInvisibleButton();
	}
	,addInvisibleButton: function() {
		var invButton = new flambe.display.FillSprite(2236962,flambe.System._platform.getStage().get_width(),flambe.System._platform.getStage().get_height());
		invButton.centerAnchor();
		invButton.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
		invButton.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
		invButton.alpha.set__(0.0);
		invButton.get_pointerDown().connect(function(event) {
			managers.NDiSceneManager.getInstance().changeScene(globals.NDiTypeScene.NDI_TYPE_SCENE_TUTORIAL);
		});
		this.owner.addChild(new flambe.Entity().add(invButton));
	}
	,addTexts: function() {
		var data = managers.NDiLocalizationManager.getInstance().getLocalizationData("history|text1");
		var text1 = managers.NDiResourcesManager.addGenericText(data.content,175 + data.offsetX,13 + data.offsetY,data.fontScale,data.fontName,flambe.display.TextAlign.Left);
		new flambe.Entity().add(text1);
		data = managers.NDiLocalizationManager.getInstance().getLocalizationData("history|text2");
		var text2 = managers.NDiResourcesManager.addGenericText(data.content,365 + data.offsetX,465 + data.offsetY,data.fontScale,data.fontName,flambe.display.TextAlign.Left);
		new flambe.Entity().add(text2);
		this.owner.addChild(text1.owner);
		this.owner.addChild(text2.owner);
	}
	,addBackground: function() {
		var backgroundTexture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/backgrounds/story");
		this.backgroundMainMenu = new flambe.display.ImageSprite(backgroundTexture);
		this.backgroundMainMenu.centerAnchor();
		this.backgroundMainMenu.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
		this.backgroundMainMenu.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
		this.rootEntity.addChild(new flambe.Entity().add(this.backgroundMainMenu));
	}
	,__class__: scenes.NDiIntroScene
});
scenes.NDiLoadingScene = function() {
	scenes.NDiAbstractScene.call(this);
	this.numPackagesLoaded = 0;
	this.background = new flambe.display.ImageSprite(managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_LOADING,globals.NDiGameConstants.BACKGROUND_LOADING));
	this.background.centerAnchor();
	this.background.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
	this.background.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
	this.barLoading = new scenes.components.NDiBarLoading();
	this.barLoading.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5 - 155);
	this.barLoading.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5 + 192);
};
$hxClasses["scenes.NDiLoadingScene"] = scenes.NDiLoadingScene;
scenes.NDiLoadingScene.__name__ = ["scenes","NDiLoadingScene"];
scenes.NDiLoadingScene.__super__ = scenes.NDiAbstractScene;
scenes.NDiLoadingScene.prototype = $extend(scenes.NDiAbstractScene.prototype,{
	onLoadAssetPack: function(pack) {
		this.numPackagesLoaded++;
	}
	,loadAssets: function() {
		if(this.listPackageDependences == null || this.listPackageDependences.length == 0) managers.NDiSceneManager.getInstance().changeScene(globals.NDiTypeScene.NDI_TYPE_SCENE_NONE); else {
			var _g = 0, _g1 = this.listPackageDependences;
			while(_g < _g1.length) {
				var pack = _g1[_g];
				++_g;
				if(managers.NDiResourcesManager.getInstance().loadedAssetPacks.exists(pack)) this.numPackagesLoaded++; else managers.NDiResourcesManager.getInstance().loadAssetPack(pack,$bind(this,this.progressEvent),$bind(this,this.onLoadAssetPack));
			}
		}
	}
	,pushScene: function() {
		managers.NDiSceneManager.getInstance().popupLoading = new scenes.popups.NDiPopupLoading();
		managers.NDiSceneManager.getInstance().changeScene(globals.NDiTypeScene.NDI_TYPE_SCENE_NONE);
	}
	,onUpdate: function(dt) {
		scenes.NDiAbstractScene.prototype.onUpdate.call(this,dt);
		if(!this.bAllPackagesLoaded && this.numPackagesLoaded >= this.listPackageDependences.length) {
			this.bAllPackagesLoaded = true;
			var seq = new flambe.script.Sequence([new flambe.script.Delay(0),new flambe.script.CallFunction($bind(this,this.pushScene))]);
			this.rootEntity._compMap.Script_18.run(seq);
		}
	}
	,onRemoved: function() {
		this.rootEntity.dispose();
	}
	,progressEvent: function(percent) {
		this.barLoading.updateBar(percent);
	}
	,onAdded: function() {
		scenes.NDiAbstractScene.prototype.onAdded.call(this);
		this.rootEntity = new flambe.Entity();
		this.rootEntity.add(new flambe.script.Script());
		this.rootEntity.add(this.background);
		this.owner.addChild(this.rootEntity);
		this.owner.addChild(this.barLoading.addToEntity());
		this.loadAssets();
	}
	,__class__: scenes.NDiLoadingScene
});
scenes.NDiMainMenuScene = function() {
	scenes.NDiAbstractScene.call(this);
	this.rootEntity = new flambe.Entity();
	this.script = new flambe.script.Script();
	this.rootEntity.add(this.script);
};
$hxClasses["scenes.NDiMainMenuScene"] = scenes.NDiMainMenuScene;
scenes.NDiMainMenuScene.__name__ = ["scenes","NDiMainMenuScene"];
scenes.NDiMainMenuScene.__super__ = scenes.NDiAbstractScene;
scenes.NDiMainMenuScene.prototype = $extend(scenes.NDiAbstractScene.prototype,{
	onAdded: function() {
		scenes.NDiAbstractScene.prototype.onAdded.call(this);
		this.owner.addChild(this.rootEntity);
		this.addBackground();
		this.buttonSoundOnTexture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.MAINMENU_BUTTON_SOUND);
		this.buttonSoundOffTexture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.MAINMENU_BUTTON_SOUNDOFF);
		var data;
		data = managers.NDiLocalizationManager.getInstance().getLocalizationData("mainmenu|start_message_flash");
		this.addText(data.content,globals.NDiGameConstants.GAME_WIDTH * 0.5 + data.offsetX,globals.NDiGameConstants.GAME_HEIGHT * 0.85 + data.offsetY,data.fontScale,data.fontName);
		this.addInvisibleButton();
		this.addSoundButton();
		managers.NDiAudioManager.getInstance().enabledSoundBackground = util.NDiSaveData.getInstance().getData(globals.NDiVarsToSave.MUTE_MUSIC[0]);
		managers.NDiAudioManager.getInstance().enabledSoundEffects = util.NDiSaveData.getInstance().getData(globals.NDiVarsToSave.MUTE_SOUNDS[0]);
		managers.NDiAudioManager.getInstance().playSoundBackground(globals.NDiGameConstants.MUSIC_TMNT);
	}
	,addSoundButton: function() {
		var _g = this;
		var btnSoundTexture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.MAINMENU_BUTTON_SOUND);
		this.btnSound = new scenes.components.NDiButton(btnSoundTexture);
		this.btnSound.centerAnchor();
		this.btnSound.x.set__(globals.NDiGameConstants.GAME_WIDTH - this.btnSound.getNaturalWidth() * 0.5);
		this.btnSound.y.set__(this.btnSound.getNaturalHeight() * 0.5 - 15);
		this.btnSound.get_pointerDown().connect(function(event) {
			_g.switchSound();
		});
		if(util.NDiSaveData.getInstance().getData(globals.NDiVarsToSave.MUTE_MUSIC[0]) && util.NDiSaveData.getInstance().getData(globals.NDiVarsToSave.MUTE_MUSIC[0])) this.btnSound.texture = this.buttonSoundOnTexture; else this.btnSound.texture = this.buttonSoundOffTexture;
		this.owner.addChild(new flambe.Entity().add(this.btnSound));
	}
	,switchSound: function() {
		managers.NDiAudioManager.getInstance().setEnabledSoundEffects();
		managers.NDiAudioManager.getInstance().setEnabledSoundBackground();
		if(util.NDiSaveData.getInstance().getData(globals.NDiVarsToSave.MUTE_MUSIC[0]) && util.NDiSaveData.getInstance().getData(globals.NDiVarsToSave.MUTE_MUSIC[0])) this.btnSound.texture = this.buttonSoundOnTexture; else this.btnSound.texture = this.buttonSoundOffTexture;
	}
	,addText: function(message,posX,posY,scale,fontName) {
		if(scale == null) scale = 1;
		if(posY == null) posY = 500;
		if(posX == null) posX = 500;
		if(message == null) message = "Tap to start";
		var font = managers.NDiResourcesManager.getInstance().loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,fontName);
		this.mainText = new flambe.display.TextSprite(font,"");
		this.mainText.set_text(message);
		this.mainText.set_align(flambe.display.TextAlign.Center);
		this.mainText.x.set__(posX);
		this.mainText.y.set__(posY);
		this.mainText.setScale(scale);
		this.owner.addChild(new flambe.Entity().add(this.mainText));
		this.script.run(new flambe.script.Repeat(new flambe.script.Sequence([new flambe.script.AnimateTo(this.mainText.alpha,0.3,0.5),new flambe.script.AnimateTo(this.mainText.alpha,1.0,0.5),new flambe.script.Delay(1)])));
	}
	,addInvisibleButton: function() {
		var invButton = new flambe.display.FillSprite(2236962,flambe.System._platform.getStage().get_width(),flambe.System._platform.getStage().get_height());
		invButton.centerAnchor();
		invButton.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
		invButton.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
		invButton.alpha.set__(0.0);
		invButton.get_pointerDown().connect(function(event) {
			managers.NDiSceneManager.getInstance().changeScene(globals.NDiTypeScene.NDI_TYPE_SCENE_INTRO);
		});
		this.owner.addChild(new flambe.Entity().add(invButton));
	}
	,addBackground: function() {
		var backgroundTexture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.MAINMENU_BACKGROUND);
		this.backgroundMainMenu = new flambe.display.ImageSprite(backgroundTexture);
		this.backgroundMainMenu.centerAnchor();
		this.backgroundMainMenu.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
		this.backgroundMainMenu.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
		this.rootEntity.addChild(new flambe.Entity().add(this.backgroundMainMenu));
	}
	,__class__: scenes.NDiMainMenuScene
});
scenes.NDiSplashNDiScene = function() {
	scenes.NDiAbstractScene.call(this);
	this.rootEntity = new flambe.Entity();
	this.rootEntity.add(new flambe.script.Script());
};
$hxClasses["scenes.NDiSplashNDiScene"] = scenes.NDiSplashNDiScene;
scenes.NDiSplashNDiScene.__name__ = ["scenes","NDiSplashNDiScene"];
scenes.NDiSplashNDiScene.__super__ = scenes.NDiAbstractScene;
scenes.NDiSplashNDiScene.prototype = $extend(scenes.NDiAbstractScene.prototype,{
	onAdded: function() {
		scenes.NDiAbstractScene.prototype.onAdded.call(this);
		this.owner.addChild(this.rootEntity);
		this.addBackground();
		haxe.Timer.delay($bind(this,this.loadSplashNickelodeon),globals.NDiGameConstants.SPLASH_DURATION);
	}
	,addBackground: function() {
		var backgroundTexture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.SPLASHNDI_BACKGROUND);
		this.backgroundSplashNDi = new flambe.display.ImageSprite(backgroundTexture);
		this.backgroundSplashNDi.centerAnchor();
		this.backgroundSplashNDi.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
		this.backgroundSplashNDi.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
		this.rootEntity.addChild(new flambe.Entity().add(this.backgroundSplashNDi));
	}
	,loadSplashNickelodeon: function() {
		managers.NDiSceneManager.getInstance().changeScene(globals.NDiTypeScene.NDI_TYPE_SCENE_SPLASH_NICKELODEON);
	}
	,__class__: scenes.NDiSplashNDiScene
});
scenes.NDiSplashNickelodeonScene = function() {
	scenes.NDiAbstractScene.call(this);
	this.rootEntity = new flambe.Entity();
	this.rootEntity.add(new flambe.script.Script());
};
$hxClasses["scenes.NDiSplashNickelodeonScene"] = scenes.NDiSplashNickelodeonScene;
scenes.NDiSplashNickelodeonScene.__name__ = ["scenes","NDiSplashNickelodeonScene"];
scenes.NDiSplashNickelodeonScene.__super__ = scenes.NDiAbstractScene;
scenes.NDiSplashNickelodeonScene.prototype = $extend(scenes.NDiAbstractScene.prototype,{
	onAdded: function() {
		scenes.NDiAbstractScene.prototype.onAdded.call(this);
		this.owner.addChild(this.rootEntity);
		this.addBackground();
		haxe.Timer.delay($bind(this,this.loadMainMenuScene),globals.NDiGameConstants.SPLASH_DURATION);
	}
	,addBackground: function() {
		var backgroundTexture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.SPLASHNICK_BACKGROUND);
		this.backgroundSplashNickelodeon = new flambe.display.ImageSprite(backgroundTexture);
		this.backgroundSplashNickelodeon.centerAnchor();
		this.backgroundSplashNickelodeon.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
		this.backgroundSplashNickelodeon.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
		this.rootEntity.addChild(new flambe.Entity().add(this.backgroundSplashNickelodeon));
	}
	,loadMainMenuScene: function() {
		managers.NDiSceneManager.getInstance().changeScene(globals.NDiTypeScene.NDI_TYPE_SCENE_MAINMENU);
	}
	,__class__: scenes.NDiSplashNickelodeonScene
});
scenes.NDiTestScene = function() {
	scenes.NDiAbstractScene.call(this);
};
$hxClasses["scenes.NDiTestScene"] = scenes.NDiTestScene;
scenes.NDiTestScene.__name__ = ["scenes","NDiTestScene"];
scenes.NDiTestScene.__super__ = scenes.NDiAbstractScene;
scenes.NDiTestScene.prototype = $extend(scenes.NDiAbstractScene.prototype,{
	onUpdate: function(dt) {
		scenes.NDiAbstractScene.prototype.onUpdate.call(this,dt);
	}
	,onRemoved: function() {
	}
	,onAdded: function() {
		scenes.NDiAbstractScene.prototype.onAdded.call(this);
		var background = new flambe.display.ImageSprite(managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/panels/tiles/jewel_blue"));
		this.rootEntity = new flambe.Entity();
		this.rootEntity.add(background);
		this.owner.addChild(this.rootEntity);
	}
	,__class__: scenes.NDiTestScene
});
scenes.NDiTutorialScene = function() {
	scenes.NDiGamePlayScene.call(this);
	this.currentStep = 0;
	this.puzzleBoard.onRemoved();
	this.puzzleBoard = new managers.NDiTutorialTokenManager(this);
	this.entityHighLights = new flambe.Entity();
	this.enemyManager = new managers.NDiTutorialEnemyManager(this);
};
$hxClasses["scenes.NDiTutorialScene"] = scenes.NDiTutorialScene;
scenes.NDiTutorialScene.__name__ = ["scenes","NDiTutorialScene"];
scenes.NDiTutorialScene.__super__ = scenes.NDiGamePlayScene;
scenes.NDiTutorialScene.prototype = $extend(scenes.NDiGamePlayScene.prototype,{
	addDebugSystem: function() {
	}
	,gamePause: function(active) {
		if(active == null) active = true;
	}
	,onAdded: function() {
		scenes.NDiGamePlayScene.prototype.onAdded.call(this);
		this.owner.addChild(this.entityHighLights);
		this.addDialogs();
	}
	,activeTimerEnemy: function() {
		(js.Boot.__cast(this.enemyManager , managers.NDiTutorialEnemyManager)).activeTimer = true;
	}
	,handlePointerUp: function(event) {
		var tmpButton = js.Boot.__cast(event.hit , scenes.components.NDiButton);
		if(tmpButton.isSelected) {
			if(tmpButton.nameButton == "SKIP_BUTTON") this.changeStep();
		}
	}
	,gameOver: function() {
		this.playerManager.setLife(100);
		this.hud.updatePlayerLife(this.playerManager.getLife());
	}
	,changeStep: function() {
		this.endingTutorial();
	}
	,endingTutorial: function() {
		var f1 = new flambe.script.CallFunction(function() {
			managers.NDiSceneManager.getInstance().changeScene(globals.NDiTypeScene.NDI_TYPE_SCENE_GAMEPLAY);
		});
		var seq = new flambe.script.Sequence([new flambe.script.Delay(0),f1]);
		this.rootEntity._compMap.Script_18.run(seq);
	}
	,hideDialog: function(delay) {
		var _g = this;
		this.popupTutorial.transform.alpha.animateTo(0,0.15);
		var f1 = new flambe.script.CallFunction(function() {
			if(_g.currentStep <= 2) {
				_g.popupTutorial.changeText();
				_g.popupTutorial.transform.alpha.animateTo(1,0.15);
			}
		});
		var seq = new flambe.script.Sequence([new flambe.script.Delay(delay),f1]);
		this.rootEntity._compMap.Script_18.run(seq);
	}
	,addDialogs: function() {
		this.popupTutorial = new scenes.popups.NDiTutorialDialog(this,$bind(this,this.handlePointerUp));
		this.owner.addChild(new flambe.Entity().add(this.popupTutorial));
	}
	,__class__: scenes.NDiTutorialScene
});
scenes.components.NDiAttackAnimationPlayer = function(lib,turtle,parent) {
	flambe.swf.MoviePlayer.call(this,lib);
	this.transform = new flambe.display.Sprite();
	this.attackName = flambe.swf.MoviePlayer.prototype.get_name.call(this);
	this.originalTutle = turtle;
	this.parentManager = parent;
	this.frequencyMatch = 0;
};
$hxClasses["scenes.components.NDiAttackAnimationPlayer"] = scenes.components.NDiAttackAnimationPlayer;
scenes.components.NDiAttackAnimationPlayer.__name__ = ["scenes","components","NDiAttackAnimationPlayer"];
scenes.components.NDiAttackAnimationPlayer.__super__ = flambe.swf.MoviePlayer;
scenes.components.NDiAttackAnimationPlayer.prototype = $extend(flambe.swf.MoviePlayer.prototype,{
	onAdded: function() {
		flambe.swf.MoviePlayer.prototype.onAdded.call(this);
		this.owner.add(this.transform);
		this.owner.add(new flambe.script.Script());
	}
	,animationIdle: function(turnToAttack,turnToAppear) {
		var _g = this;
		this.loop("empty_animation");
		this.play(this.attackName + "_attack");
		var f0 = new flambe.script.CallFunction(function() {
			_g.transform.set_visible(false);
			var f1 = new flambe.script.CallFunction(function() {
				if(!_g.parentManager.getParentManager().getStateEnemyChange()) {
					_g.play(_g.attackName + "_attack_wpn");
					_g.transform.set_visible(true);
					var tmpMap = new haxe.ds.StringMap();
					tmpMap.set(_g.originalTutle.type[0],_g.frequencyMatch);
					tmpMap.set(globals.NDiGameConstants.TOTAL_TURTLES_TYPE,_g.totalTurtles);
					_g.parentManager.getParentManager().attackToEnemie(tmpMap);
					managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.SOUND_TMNT_WEAPON_FOLDER + "" + _g.attackName + "" + globals.NDiGameConstants.SOUND_TMNT_WEAPON_POSTFIX);
				}
				var f2 = new flambe.script.CallFunction(function() {
					_g.owner.dispose();
					var f3 = new flambe.script.CallFunction(function() {
						_g.originalTutle.transform.set_visible(true);
						_g.originalTutle.animationIdle();
						_g.originalTutle.animationFall();
						if(!_g.parentManager.firstTurtleAttack) {
							_g.parentManager.getParentManager().sendBlockToPuzzle();
							_g.parentManager.firstTurtleAttack = true;
						}
					});
					var delay = turnToAppear * 0.8;
					var seq3 = new flambe.script.Sequence([new flambe.script.Delay(delay),f3]);
					_g.originalTutle.owner._compMap.Script_18.run(seq3);
				});
				var seq2 = new flambe.script.Sequence([new flambe.script.Delay(0.416),f2]);
				_g.owner._compMap.Script_18.run(seq2);
			});
			var seq1 = new flambe.script.Sequence([new flambe.script.Delay(0.6 * turnToAttack),f1]);
			_g.owner._compMap.Script_18.run(seq1);
		});
		var seq0 = new flambe.script.Sequence([new flambe.script.Delay(0.666),f0]);
		this.owner._compMap.Script_18.run(seq0);
	}
	,__class__: scenes.components.NDiAttackAnimationPlayer
});
scenes.components.NDiBar1 = function() {
	this.transform = new flambe.display.Sprite();
	this.timerEnemy = null;
	this.timeFadeTurn = 0.4;
	this.isActiveHint = false;
};
$hxClasses["scenes.components.NDiBar1"] = scenes.components.NDiBar1;
scenes.components.NDiBar1.__name__ = ["scenes","components","NDiBar1"];
scenes.components.NDiBar1.__super__ = flambe.Component;
scenes.components.NDiBar1.prototype = $extend(flambe.Component.prototype,{
	addToEntity: function() {
		this.entity = new flambe.Entity();
		this.entity.add(this);
		return this.entity;
	}
	,onUpdate: function(dt) {
		this.updateEnemyAttackHint(dt);
	}
	,onRemoved: function() {
	}
	,onAdded: function() {
		this.owner.add(this.transform);
		this.addBar();
		this.addTextBar();
		this.addTurns();
		this.owner.addChild(this.entity);
	}
	,updateBar: function(value,valueText) {
		this.bar.scaleX.animateTo(value,0.2);
		this.countEnemyLife.set_text(valueText);
	}
	,updateEnemyAttackHint: function(dt) {
		if(this.isActiveHint) {
			var deltaAlpha = 0.5 * Math.sin(this.timeFadeTurn * 6) + 0.5;
			this.timerEnemy.alpha.set__(deltaAlpha);
			this.timeFadeTurn += dt;
		}
	}
	,setEnemy: function(enemy) {
		var texture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.GENERALENEMY_ICON);
		var data;
		var font;
		data = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|hud|enemyName|MOUSERS");
		font = managers.NDiResourcesManager.getInstance().loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,data.fontName);
		if(enemy == globals.NDiTypeEnemy.NDI_TYPE_ENEMY_NONE) {
			data = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|hud|enemyName|MOUSERS");
			font = managers.NDiResourcesManager.getInstance().loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,data.fontName);
		}
		if(enemy == globals.NDiTypeEnemy.NDI_TYPE_ENEMY_RAHZAR) {
			data = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|hud|enemyName|RAHZAR");
			font = managers.NDiResourcesManager.getInstance().loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,data.fontName);
		}
		if(enemy == globals.NDiTypeEnemy.NDI_TYPE_ENEMY_FOOTBOT) {
			data = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|hud|enemyName|FOOTBOT");
			font = managers.NDiResourcesManager.getInstance().loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,data.fontName);
		}
		if(enemy == globals.NDiTypeEnemy.NDI_TYPE_ENEMY_KRANG) {
			data = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|hud|enemyName|KRANG");
			font = managers.NDiResourcesManager.getInstance().loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,data.fontName);
		}
		if(enemy == globals.NDiTypeEnemy.NDI_TYPE_ENEMY_MOUSER) {
			data = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|hud|enemyName|MOUSERS");
			font = managers.NDiResourcesManager.getInstance().loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,data.fontName);
			this.enemyName.set_text("M.O.U.S.E.R.S");
		}
		if(enemy == globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SHREDDER) {
			data = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|hud|enemyName|SHREDDER");
			font = managers.NDiResourcesManager.getInstance().loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,data.fontName);
			this.enemyName.set_text("SHREDDER");
		}
		if(enemy == globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SNAKEWEED) {
			data = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|hud|enemyName|SNAKEWEED");
			font = managers.NDiResourcesManager.getInstance().loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,data.fontName);
		}
		if(enemy == globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SPIDERBYTEZ) {
			data = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|hud|enemyName|SPIDERBYTEZ");
			font = managers.NDiResourcesManager.getInstance().loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,data.fontName);
			this.enemyName.set_text("SPIDERBYTEZ");
		}
		this.entity.removeChild(this.enemyNameEntity);
		this.enemyName = new flambe.display.TextSprite(font,"Enemy");
		this.enemyName.set_align(flambe.display.TextAlign.Left);
		this.enemyName.setScale(data.fontScale);
		this.enemyName.x.set__(-145 + data.offsetX);
		this.enemyName.y.set__(53 + data.offsetY);
		this.enemyName.set_text(data.content);
		this.enemyNameEntity = new flambe.Entity();
		this.entity.addChild(this.enemyNameEntity.add(this.enemyName));
		if(this.iconEntity != null) this.iconEntity.dispose();
		this.iconEntity = new flambe.Entity();
		this.icon = new flambe.display.ImageSprite(texture);
		this.icon.centerAnchor();
		this.icon.y.set__(36);
		this.icon.x.set__(-(globals.NDiGameConstants.GAME_WIDTH * 0.25 - 67));
		this.entity.addChild(this.iconEntity.add(this.icon));
	}
	,addTextBar: function() {
		var data = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|hud|enemy|hp");
		var font = managers.NDiResourcesManager.getInstance().loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,data.fontName);
		this.countEnemyLife = new flambe.display.TextSprite(font,"");
		this.countEnemyLife.set_align(flambe.display.TextAlign.Center);
		this.countEnemyLife.x.set__(data.offsetX);
		this.countEnemyLife.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.04 + data.offsetY);
		this.countEnemyLife.setScale(data.fontScale);
		this.entity.addChild(new flambe.Entity().add(this.countEnemyLife));
	}
	,addTurns: function() {
		var data = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|hud|label|score");
		var font = managers.NDiResourcesManager.getInstance().loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,data.fontName);
		this.timerEnemy = new flambe.display.TextSprite(font,"");
		this.timerEnemy.set_align(flambe.display.TextAlign.Center);
		this.timerEnemy.x.set__(125 + data.offsetX);
		this.timerEnemy.y.set__(26 + data.offsetY);
		this.timerEnemy.setScale(data.fontScale);
		this.timerEnemy.disablePointer();
		this.owner.addChild(new flambe.Entity().add(this.timerEnemy));
	}
	,addBar: function() {
		var barLifeBgTexture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.ENEMYLIFEBAR_BACKGROUND);
		this.barBg = new flambe.display.ImageSprite(barLifeBgTexture);
		this.barBg.x.set__(-this.barBg.getNaturalWidth() * 0.5);
		this.entity.addChild(new flambe.Entity().add(this.barBg));
		var barLifeTexture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.ENEMYLIFEBAR);
		this.bar = new flambe.display.ImageSprite(barLifeTexture);
		this.entity.addChild(new flambe.Entity().add(this.bar));
		var difY = Math.abs(this.barBg.getNaturalHeight() - this.bar.getNaturalHeight()) * 0.40;
		this.bar.y.set__(difY);
		this.bar.x.set__(-this.bar.getNaturalWidth() * 0.6);
		var texture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.ENEMY_ICON);
		var iconBg = new flambe.display.ImageSprite(texture);
		iconBg.centerAnchor();
		iconBg.y.set__(36);
		iconBg.x.set__(-(globals.NDiGameConstants.GAME_WIDTH * 0.25 - 67));
		this.entity.addChild(new flambe.Entity().add(iconBg));
		this.setEnemy(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_NONE);
		this.entity.add(this.transform);
	}
	,get_name: function() {
		return "NDiBar1_16";
	}
	,__class__: scenes.components.NDiBar1
});
scenes.components.NDiBar2 = function() {
	this.transform = new flambe.display.Sprite();
	this.isDeathHint = false;
	this.timeFadeHint = 0;
	this.totalTimeToHintSound = this.elapsedTimeToHintSound = 10;
};
$hxClasses["scenes.components.NDiBar2"] = scenes.components.NDiBar2;
scenes.components.NDiBar2.__name__ = ["scenes","components","NDiBar2"];
scenes.components.NDiBar2.__super__ = flambe.Component;
scenes.components.NDiBar2.prototype = $extend(flambe.Component.prototype,{
	addToEntity: function() {
		this.entity = new flambe.Entity();
		this.entity.add(this);
		return this.entity;
	}
	,onUpdate: function(dt) {
		this.updatePlayerDeathHint(dt);
	}
	,onRemoved: function() {
	}
	,onAdded: function() {
		this.owner.add(this.transform);
		this.addBar();
		this.addTextBar();
		this.owner.addChild(this.entity);
	}
	,updatePlayerDeathHint: function(dt) {
		if(this.isDeathHint) {
			var deltaAlpha = 0.3 * Math.sin(this.timeFadeHint * 6) + 0.7;
			this.bar.alpha.set__(deltaAlpha);
			this.timeFadeHint += dt;
			if(this.elapsedTimeToHintSound >= this.totalTimeToHintSound) {
				this.playSoundLowHealth();
				this.elapsedTimeToHintSound = 0;
			}
			this.elapsedTimeToHintSound += dt;
		}
	}
	,playSoundLowHealth: function() {
		managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.SOUND_TMNT_LOW_HEALTH);
	}
	,setActiveDeathHint: function(active) {
		if(active == null) active = true;
		this.isDeathHint = active;
	}
	,updateBar: function(value,valueText) {
		this.bar.scaleX.animateTo(value,0.2);
		this.countEnemyLife.set_text(valueText);
		if(value < 0.2) this.isDeathHint = true; else if(this.isDeathHint) {
			this.setActiveDeathHint(false);
			this.bar.alpha.set__(1);
			this.elapsedTimeToHintSound = 0;
		}
	}
	,addTextBar: function() {
		var data = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|hud|player|hp");
		var font = managers.NDiResourcesManager.getInstance().loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,data.fontName);
		this.countEnemyLife = new flambe.display.TextSprite(font,"");
		this.countEnemyLife.set_align(flambe.display.TextAlign.Center);
		this.countEnemyLife.x.set__(data.offsetX);
		this.countEnemyLife.y.set__(this.barBg.getNaturalHeight() * 0.325 + data.offsetY);
		this.countEnemyLife.setScale(data.fontScale);
		this.entity.addChild(new flambe.Entity().add(this.countEnemyLife));
	}
	,addBar: function() {
		var barLifeBgTexture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.PLAYERLIFEBAR_BACKGROUND);
		this.barBg = new flambe.display.ImageSprite(barLifeBgTexture);
		this.barBg.y.set__(-11);
		this.barBg.x.set__(-this.barBg.getNaturalWidth() * 0.5);
		this.entity.addChild(new flambe.Entity().add(this.barBg));
		var barLifeTexture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.PLAYERLIFEBAR);
		this.bar = new flambe.display.ImageSprite(barLifeTexture);
		this.entity.addChild(new flambe.Entity().add(this.bar));
		var lifeIconTexture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.PLAYERLIFE_ICON);
		var lifeIcon = new flambe.display.ImageSprite(lifeIconTexture);
		lifeIcon.centerAnchor();
		lifeIcon.y.set__(50);
		lifeIcon.x.set__(-(globals.NDiGameConstants.GAME_WIDTH * 0.25 - 60));
		this.entity.addChild(new flambe.Entity().add(lifeIcon));
		var difY = Math.abs(this.barBg.getNaturalHeight() - this.bar.getNaturalHeight()) / 2;
		this.bar.y.set__(difY - 1);
		this.bar.x.set__(-this.bar.getNaturalWidth() * 0.5 + globals.NDiGameConstants.GAME_WIDTH * 0.01);
	}
	,get_name: function() {
		return "NDiBar2_15";
	}
	,__class__: scenes.components.NDiBar2
});
scenes.components.NDiBarLoading = function() {
	this.transform = new flambe.display.Sprite();
};
$hxClasses["scenes.components.NDiBarLoading"] = scenes.components.NDiBarLoading;
scenes.components.NDiBarLoading.__name__ = ["scenes","components","NDiBarLoading"];
scenes.components.NDiBarLoading.__super__ = flambe.Component;
scenes.components.NDiBarLoading.prototype = $extend(flambe.Component.prototype,{
	addToEntity: function() {
		new flambe.Entity().add(this);
		return this.owner;
	}
	,onAdded: function() {
		this.owner.add(this.transform);
		this.addBar();
		null;
	}
	,addBar: function() {
		var barLifeTexture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_LOADING,globals.NDiGameConstants.BAR_LOADING);
		this.bar = new flambe.display.ImageSprite(barLifeTexture);
		this.owner.addChild(new flambe.Entity().add(this.bar));
		this.bar.scaleX.set__(0);
		var lifeIconTexture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_LOADING,globals.NDiGameConstants.ICON_BAR_LOADING);
		var lifeIcon = new flambe.display.ImageSprite(lifeIconTexture);
		lifeIcon.centerAnchor();
		lifeIcon.y.set__(15);
		lifeIcon.x.set__(-40);
		this.owner.addChild(new flambe.Entity().add(lifeIcon));
	}
	,updateBar: function(value) {
		if(value > 1) value = 1; else if(value < 0) value = 0;
		this.bar.scaleX.animateTo(value,0.3);
	}
	,get_name: function() {
		return "NDiBarLoading_2";
	}
	,__class__: scenes.components.NDiBarLoading
});
scenes.components.NDiBarTimer1 = function() {
	var barTexture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/hud/barenemy_timer_bar");
	var barBgTexture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/hud/barenemy_timer_bg");
	var barIconTexture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/hud/barenemy_timer_icon");
	this.bar = new flambe.display.ImageSprite(barTexture);
	this.barBg = new flambe.display.ImageSprite(barBgTexture);
	this.barIcon = new flambe.display.ImageSprite(barIconTexture);
	this.transform = new flambe.display.Sprite();
};
$hxClasses["scenes.components.NDiBarTimer1"] = scenes.components.NDiBarTimer1;
scenes.components.NDiBarTimer1.__name__ = ["scenes","components","NDiBarTimer1"];
scenes.components.NDiBarTimer1.__super__ = flambe.Component;
scenes.components.NDiBarTimer1.prototype = $extend(flambe.Component.prototype,{
	onAdded: function() {
		this.owner.add(this.transform);
		this.addBar();
		this.addIcon();
	}
	,addBar: function() {
		this.barBg.anchorX.set__(this.barBg.getNaturalWidth() * 0.5);
		this.barBg.anchorY.set__(this.barBg.getNaturalHeight());
		this.owner.addChild(new flambe.Entity().add(this.barBg));
		this.bar.anchorX.set__(this.bar.getNaturalWidth() * 0.5);
		this.bar.anchorY.set__(this.bar.getNaturalHeight());
		this.bar.x.set__(3);
		this.bar.y.set__(-47);
		this.owner.addChild(new flambe.Entity().add(this.bar));
	}
	,addIcon: function() {
		this.barIcon.centerAnchor();
		this.barIcon.x.set__(3);
		this.barIcon.y.set__(-207);
		this.owner.addChild(new flambe.Entity().add(this.barIcon));
	}
	,updateBar: function(value) {
		this.bar.scaleY.set__(value);
	}
	,get_name: function() {
		return "NDiBarTimer1_14";
	}
	,__class__: scenes.components.NDiBarTimer1
});
scenes.components.NDiButton = function(texture) {
	flambe.display.ImageSprite.call(this,texture);
	this.isSelected = false;
	this.nameButton = flambe.display.ImageSprite.prototype.get_name.call(this);
};
$hxClasses["scenes.components.NDiButton"] = scenes.components.NDiButton;
scenes.components.NDiButton.__name__ = ["scenes","components","NDiButton"];
scenes.components.NDiButton.__super__ = flambe.display.ImageSprite;
scenes.components.NDiButton.prototype = $extend(flambe.display.ImageSprite.prototype,{
	onAdded: function() {
		flambe.display.ImageSprite.prototype.onAdded.call(this);
	}
	,animationRelease: function() {
		this.scaleX.animateTo(1,0.2,flambe.animation.Ease.linear);
		this.scaleY.animateTo(1,0.2,flambe.animation.Ease.linear);
	}
	,animationPressed: function() {
		this.scaleX.animateTo(0.85,0.2,flambe.animation.Ease.linear);
		this.scaleY.animateTo(0.85,0.2,flambe.animation.Ease.linear);
	}
	,__class__: scenes.components.NDiButton
});
scenes.components.NDiGameOver = function() {
	scenes.NDiAbstractScene.call(this,true);
	this.isHighScore = false;
	this.transform = new flambe.display.Sprite();
	this.initAssets();
};
$hxClasses["scenes.components.NDiGameOver"] = scenes.components.NDiGameOver;
scenes.components.NDiGameOver.__name__ = ["scenes","components","NDiGameOver"];
scenes.components.NDiGameOver.__super__ = scenes.NDiAbstractScene;
scenes.components.NDiGameOver.prototype = $extend(scenes.NDiAbstractScene.prototype,{
	onAdded: function() {
		scenes.NDiAbstractScene.prototype.onAdded.call(this);
		this.owner.add(this.transform);
		this.owner.addChild(new flambe.Entity().add(this.background));
		this.addTitle();
		this.addTextScore();
		this.addTextNumEnemies();
		this.addTextTopScores();
		this.addHighScores();
		this.addButtonReplay();
	}
	,handlePointerUpGlobal: function(event) {
		if(this.currentButtonPressed != null) {
			this.currentButtonPressed.animationRelease();
			this.currentButtonPressed = null;
		}
	}
	,handlePointerUp: function(event) {
		var tmpButton = js.Boot.__cast(event.hit , scenes.components.NDiButton);
		if(tmpButton.isSelected) {
			if(tmpButton.nameButton == "REPLAY_BUTTON") {
				managers.NDiSceneManager.getInstance().director.popScene();
				managers.NDiSceneManager.getInstance().changeScene(globals.NDiTypeScene.NDI_TYPE_SCENE_GAMEPLAY);
			} else if(tmpButton.nameButton == "QUIT_BUTTON") this.addPopupExit();
		}
	}
	,handlePointerMove: function(event) {
		var tmpButton = js.Boot.__cast(event.hit , scenes.components.NDiButton);
		if(tmpButton.isSelected) null;
	}
	,handlePointerDown: function(event) {
		var tmpButton = js.Boot.__cast(event.hit , scenes.components.NDiButton);
		tmpButton.isSelected = true;
		tmpButton.animationPressed();
		this.currentButtonPressed = tmpButton;
		null;
	}
	,addPopupExit: function() {
		this.popupExit = new scenes.popups.NDiPopupExit(globals.NDiTypeScene.NDI_TYPE_SCENE_MAINMENU);
		this.owner.addChild(this.popupExit.addToEntity());
		this.popupExit.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
		this.popupExit.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
	}
	,addTitle: function() {
		this.owner.addChild(new flambe.Entity().add(this.textTitle));
	}
	,addHighScores: function() {
		if(this.isHighScore) {
			this.owner.addChild(new flambe.Entity().add(this.highScoreFrame));
			this.highScoreFrame.owner.addChild(new flambe.Entity().add(this.highScoreText));
		}
	}
	,addButtonReplay: function() {
		this.owner.addChild(new flambe.Entity().add(this.buttonReplay));
		this.buttonReplay.owner.addChild(new flambe.Entity().add(this.buttonReplayText));
	}
	,addTextScore: function() {
		this.owner.addChild(new flambe.Entity().add(this.labelYourScore));
		this.scoreLabel.set_text("" + this.scoreValue);
		this.owner.addChild(new flambe.Entity().add(this.scoreLabel));
	}
	,addTextNumEnemies: function() {
		this.owner.addChild(new flambe.Entity().add(this.enemiesLabel));
		this.numEnemiesLabel.set_text("" + this.numDefeatedEnemies);
		this.owner.addChild(new flambe.Entity().add(this.numEnemiesLabel));
	}
	,addTextTopScores: function() {
		if(!globals.NDiGameGlobals.getInstance().bHighScores) return;
		this.owner.addChild(new flambe.Entity().add(this.topScoreBackground));
		this.owner.addChild(new flambe.Entity().add(this.topScoreTitle));
		this.topScoreValue = util.NDiSaveData.getInstance().getData(globals.NDiVarsToSave.SCORE[0]);
		this.topScoreValue_2 = util.NDiSaveData.getInstance().getData(globals.NDiVarsToSave.SCORE_2[0]);
		this.topScoreValue_3 = util.NDiSaveData.getInstance().getData(globals.NDiVarsToSave.SCORE_3[0]);
		this.owner.addChild(new flambe.Entity().add(this.topScore1Label));
		this.owner.addChild(new flambe.Entity().add(this.topScore2Label));
		this.owner.addChild(new flambe.Entity().add(this.topScore3Label));
		this.topScore1number.set_text("" + this.topScoreValue);
		this.owner.addChild(new flambe.Entity().add(this.topScore1number));
		this.topScore2number.set_text("" + this.topScoreValue_2);
		this.owner.addChild(new flambe.Entity().add(this.topScore2number));
		this.topScore3number.set_text("" + this.topScoreValue_3);
		this.owner.addChild(new flambe.Entity().add(this.topScore3number));
	}
	,recordScore: function(scoreValue) {
		this.topScoreValue = util.NDiSaveData.getInstance().getData(globals.NDiVarsToSave.SCORE[0]);
		this.topScoreValue_2 = util.NDiSaveData.getInstance().getData(globals.NDiVarsToSave.SCORE_2[0]);
		this.topScoreValue_3 = util.NDiSaveData.getInstance().getData(globals.NDiVarsToSave.SCORE_3[0]);
		if(scoreValue > this.topScoreValue) {
			util.NDiSaveData.getInstance().setData(globals.NDiVarsToSave.SCORE_3[0],this.topScoreValue_2);
			util.NDiSaveData.getInstance().setData(globals.NDiVarsToSave.SCORE_2[0],this.topScoreValue);
			util.NDiSaveData.getInstance().setData(globals.NDiVarsToSave.SCORE[0],scoreValue);
			this.isHighScore = true;
			this.topScoreValue = util.NDiSaveData.getInstance().getData(globals.NDiVarsToSave.SCORE[0]);
			this.topScoreValue_2 = util.NDiSaveData.getInstance().getData(globals.NDiVarsToSave.SCORE_2[0]);
			this.topScoreValue_3 = util.NDiSaveData.getInstance().getData(globals.NDiVarsToSave.SCORE_3[0]);
			return;
		} else if(scoreValue > this.topScoreValue_2) {
			util.NDiSaveData.getInstance().setData(globals.NDiVarsToSave.SCORE_3[0],this.topScoreValue_2);
			util.NDiSaveData.getInstance().setData(globals.NDiVarsToSave.SCORE_2[0],scoreValue);
			this.topScoreValue = util.NDiSaveData.getInstance().getData(globals.NDiVarsToSave.SCORE[0]);
			this.topScoreValue_2 = util.NDiSaveData.getInstance().getData(globals.NDiVarsToSave.SCORE_2[0]);
			this.topScoreValue_3 = util.NDiSaveData.getInstance().getData(globals.NDiVarsToSave.SCORE_3[0]);
			return;
		} else if(scoreValue > this.topScoreValue_3) {
			util.NDiSaveData.getInstance().setData(globals.NDiVarsToSave.SCORE_3[0],scoreValue);
			this.topScoreValue = util.NDiSaveData.getInstance().getData(globals.NDiVarsToSave.SCORE[0]);
			this.topScoreValue_2 = util.NDiSaveData.getInstance().getData(globals.NDiVarsToSave.SCORE_2[0]);
			this.topScoreValue_3 = util.NDiSaveData.getInstance().getData(globals.NDiVarsToSave.SCORE_3[0]);
			return;
		}
	}
	,setValues: function(scoreValue,numEnemies) {
		this.scoreValue = scoreValue;
		this.numDefeatedEnemies = numEnemies;
		this.recordScore(scoreValue);
	}
	,initAssets: function() {
		var backgroundTexture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.GAMEPLAY_RESULTS_BACKGROUND);
		this.background = new flambe.display.ImageSprite(backgroundTexture);
		this.background.centerAnchor();
		this.background.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
		this.background.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
		var data1 = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|results|title");
		this.textTitle = managers.NDiResourcesManager.addGenericText(data1.content,55 + data1.offsetX,34 + data1.offsetY,data1.fontScale,data1.fontName,flambe.display.TextAlign.Left);
		var data2 = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|results|your_score_label");
		this.labelYourScore = managers.NDiResourcesManager.addGenericText(data2.content,13 + data2.offsetX,globals.NDiGameConstants.GAME_HEIGHT * 0.25 + 12 + data2.offsetY,data2.fontScale,data2.fontName,flambe.display.TextAlign.Left);
		var data3 = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|results|score");
		this.scoreLabel = managers.NDiResourcesManager.addGenericText(data3.content,globals.NDiGameConstants.GAME_WIDTH * 0.25 + 40 + data3.offsetX,globals.NDiGameConstants.GAME_HEIGHT * 0.25 + 20 + data3.offsetY,data3.fontScale,data3.fontName,flambe.display.TextAlign.Right);
		var data4 = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|results|enemies_defeated_label");
		this.enemiesLabel = managers.NDiResourcesManager.addGenericText(data4.content,13 + data4.offsetX,globals.NDiGameConstants.GAME_HEIGHT * 0.25 + 72 + data4.offsetY,data4.fontScale,data4.fontName,flambe.display.TextAlign.Left);
		var data5 = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|results|enemies_defeated");
		this.numEnemiesLabel = managers.NDiResourcesManager.addGenericText(data5.content,globals.NDiGameConstants.GAME_WIDTH * 0.25 + 40 + data5.offsetX,globals.NDiGameConstants.GAME_HEIGHT * 0.25 + 80 + data5.offsetY,data5.fontScale,data5.fontName,flambe.display.TextAlign.Right);
		var data6 = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|results|your_topscores_label");
		this.topScoreTitle = managers.NDiResourcesManager.addGenericText(data6.content,globals.NDiGameConstants.GAME_WIDTH * 0.27 + data6.offsetX,globals.NDiGameConstants.GAME_HEIGHT * 0.48 + data6.offsetY,data6.fontScale,data6.fontName,flambe.display.TextAlign.Center);
		var data7 = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|results|topscores_number_label_1");
		this.topScore1Label = managers.NDiResourcesManager.addGenericText(data7.content,globals.NDiGameConstants.GAME_WIDTH * 0.23 - 2 + data7.offsetX,globals.NDiGameConstants.GAME_HEIGHT * 0.55 - 4 + data7.offsetY,data7.fontScale,data7.fontName,flambe.display.TextAlign.Center);
		var data8 = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|results|topscores_number_label_2");
		this.topScore2Label = managers.NDiResourcesManager.addGenericText(data8.content,globals.NDiGameConstants.GAME_WIDTH * 0.23 - 2 + data8.offsetX,globals.NDiGameConstants.GAME_HEIGHT * 0.63 - 5 + data8.offsetY,data8.fontScale,data8.fontName,flambe.display.TextAlign.Center);
		var data9 = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|results|topscores_number_label_3");
		this.topScore3Label = managers.NDiResourcesManager.addGenericText(data9.content,globals.NDiGameConstants.GAME_WIDTH * 0.23 - 2 + data9.offsetX,globals.NDiGameConstants.GAME_HEIGHT * 0.70 - 1 + data9.offsetY,data9.fontScale,data9.fontName,flambe.display.TextAlign.Center);
		var data10 = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|results|topscores_1");
		this.topScore1number = managers.NDiResourcesManager.addGenericText(data10.content,globals.NDiGameConstants.GAME_WIDTH * 0.3 + 1 + data10.offsetX,globals.NDiGameConstants.GAME_HEIGHT * 0.55 - 4 + data10.offsetY,data10.fontScale,data10.fontName,flambe.display.TextAlign.Center);
		var data11 = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|results|topscores_2");
		this.topScore2number = managers.NDiResourcesManager.addGenericText(data11.content,globals.NDiGameConstants.GAME_WIDTH * 0.3 + 1 + data11.offsetX,globals.NDiGameConstants.GAME_HEIGHT * 0.63 - 5 + data11.offsetY,data11.fontScale,data11.fontName,flambe.display.TextAlign.Center);
		var data12 = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|results|topscores_3");
		this.topScore3number = managers.NDiResourcesManager.addGenericText(data12.content,globals.NDiGameConstants.GAME_WIDTH * 0.3 + 1 + data12.offsetX,globals.NDiGameConstants.GAME_HEIGHT * 0.70 - 1 + data12.offsetY,data12.fontScale,data12.fontName,flambe.display.TextAlign.Center);
		var backgroundTexture1 = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.GAMEPLAY_RESULTS_HIGHSCORE_FRAME);
		this.highScoreFrame = new flambe.display.ImageSprite(backgroundTexture1);
		this.highScoreFrame.centerAnchor();
		this.highScoreFrame.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.3);
		this.highScoreFrame.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.4);
		var data13 = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|results|new_highscore_label");
		this.highScoreText = managers.NDiResourcesManager.addGenericText(data13.content,95 + data13.offsetX,60 + data13.offsetY,data13.fontScale,data13.fontName,flambe.display.TextAlign.Center);
		var btnTexture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.GAMEPLAY_RESULTS_BUTTON_REPLAY);
		this.buttonReplay = new scenes.components.NDiButton(btnTexture);
		this.buttonReplay.centerAnchor();
		this.buttonReplay.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.25 - 85);
		this.buttonReplay.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.85 + 40);
		this.buttonReplay.nameButton = "REPLAY_BUTTON";
		this.buttonReplay.get_pointerDown().connect($bind(this,this.handlePointerDown));
		this.buttonReplay.get_pointerMove().connect($bind(this,this.handlePointerMove));
		this.buttonReplay.get_pointerUp().connect($bind(this,this.handlePointerUp));
		flambe.System._platform.getPointer().up.connect($bind(this,this.handlePointerUpGlobal));
		var data14 = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|results|play_again_button");
		this.buttonReplayText = managers.NDiResourcesManager.addGenericText(data14.content,79 + data14.offsetX,27 + data14.offsetY,data14.fontScale,data14.fontName,flambe.display.TextAlign.Left);
		var topScoreBackgroundTexture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.GAMEPLAY_RESULTS_TOP_SCORES);
		this.topScoreBackground = new scenes.components.NDiButton(topScoreBackgroundTexture);
		this.topScoreBackground.centerAnchor();
		this.topScoreBackground.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.25 + 15);
		this.topScoreBackground.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5 + 84);
	}
	,__class__: scenes.components.NDiGameOver
});
scenes.components.NDiImage = function(texture) {
	this.image = new flambe.display.ImageSprite(texture);
	this.transform = new flambe.display.Sprite();
};
$hxClasses["scenes.components.NDiImage"] = scenes.components.NDiImage;
scenes.components.NDiImage.__name__ = ["scenes","components","NDiImage"];
scenes.components.NDiImage.__super__ = flambe.Component;
scenes.components.NDiImage.prototype = $extend(flambe.Component.prototype,{
	onAdded: function() {
		this.owner.add(this.transform);
		this.owner.addChild(new flambe.Entity().add(this.image));
		this.image.centerAnchor();
	}
	,get_name: function() {
		return "NDiImage_17";
	}
	,__class__: scenes.components.NDiImage
});
scenes.components.NDiPause = function(parent) {
	scenes.NDiAbstractScene.call(this,false);
	this.parentGamePlayScene = parent;
	this.buttonPlayTexture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.GAMEPLAY_PAUSEMENU_BUTTON_RESUME);
	this.buttonPlay = new scenes.components.NDiButton(this.buttonPlayTexture);
	this.buttonPlay.centerAnchor();
	this.buttonPlay.get_pointerDown().connect($bind(this,this.handlePointerDown));
	this.buttonPlay.get_pointerUp().connect($bind(this,this.handlePointerUp));
	flambe.System._platform.getPointer().up.connect($bind(this,this.handlePointerUpGlobal));
	this.buttonHelpTexture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.GAMEPLAY_PAUSEMENU_BUTTON_HELP);
	this.buttonHelp = new scenes.components.NDiButton(this.buttonHelpTexture);
	this.buttonHelp.centerAnchor();
	this.buttonHelp.get_pointerDown().connect($bind(this,this.handlePointerDown));
	this.buttonHelp.get_pointerUp().connect($bind(this,this.handlePointerUp));
	flambe.System._platform.getPointer().up.connect($bind(this,this.handlePointerUpGlobal));
	this.buttonSoundOnTexture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.GAMEPLAY_PAUSEMENU_BUTTON_SOUND_ON);
	this.buttonSoundOffTexture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.GAMEPLAY_PAUSEMENU_BUTTON_SOUND_OFF);
	this.buttonSounds = new scenes.components.NDiButton(this.buttonSoundOnTexture);
	this.buttonSounds.centerAnchor();
	this.buttonSounds.get_pointerDown().connect($bind(this,this.handlePointerDown));
	this.buttonSounds.get_pointerUp().connect($bind(this,this.handlePointerUp));
	flambe.System._platform.getPointer().up.connect($bind(this,this.handlePointerUpGlobal));
	this.buttonHomeTexture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.GAMEPLAY_PAUSEMENU_BUTTON_QUIT);
	this.buttonHome = new scenes.components.NDiButton(this.buttonHomeTexture);
	this.buttonHome.centerAnchor();
	this.buttonHome.get_pointerDown().connect($bind(this,this.handlePointerDown));
	this.buttonHome.get_pointerUp().connect($bind(this,this.handlePointerUp));
	flambe.System._platform.getPointer().up.connect($bind(this,this.handlePointerUpGlobal));
	this.bgAlpha = new flambe.display.FillSprite(4006223,globals.NDiGameConstants.GAME_WIDTH * 1.25,globals.NDiGameConstants.GAME_HEIGHT * 1.25);
	var backgroundTexture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.GAMEPLAY_PAUSEMENU_BACKGROUND);
	this.background = new flambe.display.ImageSprite(backgroundTexture);
	this.data0 = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|pause|score");
	var font0 = managers.NDiResourcesManager.getInstance().loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,this.data0.fontName);
	this.scoreLabel = new flambe.display.TextSprite(font0,"");
	this.data1 = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|pause|top_score");
	var font1 = managers.NDiResourcesManager.getInstance().loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,this.data1.fontName);
	this.scoreTitleLabel = new flambe.display.TextSprite(font1,"");
	this.scoreTitleLabel.disablePointer();
	this.data2 = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|pause|title_pause");
	var font2 = managers.NDiResourcesManager.getInstance().loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,this.data2.fontName);
	this.titlePauseLabel = new flambe.display.TextSprite(font2,"");
	this.data3 = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|pause|resume_button");
	var font3 = managers.NDiResourcesManager.getInstance().loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,this.data3.fontName);
	this.textResumeButton = new flambe.display.TextSprite(font3,"");
	this.textResumeButton.disablePointer();
	this.data4 = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|pause|help_button");
	var font4 = managers.NDiResourcesManager.getInstance().loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,this.data4.fontName);
	this.textHelpButton = new flambe.display.TextSprite(font4,"");
	this.textHelpButton.disablePointer();
	this.data5 = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|pause|sound_button");
	var font5 = managers.NDiResourcesManager.getInstance().loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,this.data5.fontName);
	this.textSoundButton = new flambe.display.TextSprite(font5,"");
	this.textSoundButton.disablePointer();
	this.data6 = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|pause|quit_button");
	var font6 = managers.NDiResourcesManager.getInstance().loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,this.data6.fontName);
	this.textHomeButton = new flambe.display.TextSprite(font6,"");
	this.textHomeButton.disablePointer();
	this.popupHelp = new scenes.popups.NDiPopupHelp();
	this.popupExit = new scenes.popups.NDiPopupExit(globals.NDiTypeScene.NDI_TYPE_SCENE_MAINMENU,true);
};
$hxClasses["scenes.components.NDiPause"] = scenes.components.NDiPause;
scenes.components.NDiPause.__name__ = ["scenes","components","NDiPause"];
scenes.components.NDiPause.__super__ = scenes.NDiAbstractScene;
scenes.components.NDiPause.prototype = $extend(scenes.NDiAbstractScene.prototype,{
	onAdded: function() {
		scenes.NDiAbstractScene.prototype.onAdded.call(this);
		this.owner.add(this.transform);
		this.addBackground();
		this.addFrame();
		this.addTextScore();
		this.addTitleText();
		this.addButtonPlay();
		this.addButtonHelp();
		this.addButtonSounds();
		this.addButtonHome();
	}
	,handlePointerUpGlobal: function(event) {
		if(this.currentButtonPressed != null) {
			this.currentButtonPressed.animationRelease();
			this.currentButtonPressed = null;
		}
	}
	,handlePointerUp: function(event) {
		var tmpButton = js.Boot.__cast(event.hit , scenes.components.NDiButton);
		if(tmpButton.isSelected) {
			if(tmpButton.nameButton == "PLAY_BUTTON") this.parentGamePlayScene.gamePause(false); else if(tmpButton.nameButton == "HOME_BUTTON") this.goToHome(); else if(tmpButton.nameButton == "HELP_BUTTON") this.showHelp(); else if(tmpButton.nameButton == "SOUNDS_BUTTON") {
				managers.NDiAudioManager.getInstance().setEnabledSoundEffects();
				managers.NDiAudioManager.getInstance().setEnabledSoundBackground();
				if(util.NDiSaveData.getInstance().getData(globals.NDiVarsToSave.MUTE_MUSIC[0]) && util.NDiSaveData.getInstance().getData(globals.NDiVarsToSave.MUTE_MUSIC[0])) this.buttonSounds.texture = this.buttonSoundOnTexture; else this.buttonSounds.texture = this.buttonSoundOffTexture;
			}
		}
	}
	,showHelp: function() {
		this.owner.addChild(this.popupHelp.addToEntity());
	}
	,goToHome: function() {
		this.owner.addChild(this.popupExit.addToEntity());
	}
	,handlePointerDown: function(event) {
		var tmpButton = js.Boot.__cast(event.hit , scenes.components.NDiButton);
		tmpButton.isSelected = true;
		tmpButton.animationPressed();
		this.currentButtonPressed = tmpButton;
	}
	,addBackground: function() {
		this.bgAlpha.centerAnchor();
		this.bgAlpha.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
		this.bgAlpha.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
		this.bgAlpha.alpha.set__(0.5);
		this.owner.addChild(new flambe.Entity().add(this.bgAlpha));
	}
	,addFrame: function() {
		this.background.centerAnchor();
		this.background.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
		this.background.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5 + 50);
		this.owner.addChild(new flambe.Entity().add(this.background));
	}
	,addButtonHome: function() {
		this.buttonHome.nameButton = "HOME_BUTTON";
		this.buttonHome.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5 + 85);
		this.buttonHome.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5 + this.buttonHome.getNaturalHeight() * 0.5 * 1.40);
		this.owner.addChild(new flambe.Entity().add(this.buttonHome));
		this.textHomeButton.set_align(flambe.display.TextAlign.Center);
		this.textHomeButton.x.set__(48 + this.data6.offsetX);
		this.textHomeButton.y.set__(100 + this.data6.offsetY);
		this.textHomeButton.set_text(this.data6.content);
		this.textHomeButton.setScale(this.data6.fontScale);
		this.buttonHome.owner.addChild(new flambe.Entity().add(this.textHomeButton));
	}
	,addButtonSounds: function() {
		this.buttonSounds.nameButton = "SOUNDS_BUTTON";
		this.buttonSounds.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5 - 22);
		this.buttonSounds.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5 + this.buttonPlay.getNaturalHeight() * 0.5 * 1.75);
		if(util.NDiSaveData.getInstance().getData(globals.NDiVarsToSave.MUTE_MUSIC[0])) this.buttonSounds.texture = this.buttonSoundOnTexture; else this.buttonSounds.texture = this.buttonSoundOffTexture;
		this.owner.addChild(new flambe.Entity().add(this.buttonSounds));
		this.textSoundButton.set_align(flambe.display.TextAlign.Center);
		this.textSoundButton.x.set__(48 + this.data5.offsetX);
		this.textSoundButton.y.set__(100 + this.data5.offsetY);
		this.textSoundButton.set_text(this.data5.content);
		this.textSoundButton.setScale(this.data5.fontScale);
		this.buttonSounds.owner.addChild(new flambe.Entity().add(this.textSoundButton));
	}
	,addButtonHelp: function() {
		this.buttonHelp.nameButton = "HELP_BUTTON";
		this.buttonHelp.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5 + 135);
		this.buttonHelp.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5 - this.buttonHelp.getNaturalHeight() * 0.5 * 0.1);
		this.owner.addChild(new flambe.Entity().add(this.buttonHelp));
		this.textHelpButton.set_align(flambe.display.TextAlign.Center);
		this.textHelpButton.x.set__(48 + this.data4.offsetX);
		this.textHelpButton.y.set__(100 + this.data4.offsetY);
		this.textHelpButton.set_text(this.data4.content);
		this.textHelpButton.setScale(this.data4.fontScale);
		this.buttonHelp.owner.addChild(new flambe.Entity().add(this.textHelpButton));
	}
	,addButtonPlay: function() {
		this.buttonPlay.nameButton = "PLAY_BUTTON";
		this.buttonPlay.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5 + 15);
		this.buttonPlay.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5 + this.buttonPlay.getNaturalHeight() * 0.5 * 0.15);
		this.owner.addChild(new flambe.Entity().add(this.buttonPlay));
		this.textResumeButton.set_align(flambe.display.TextAlign.Center);
		this.textResumeButton.x.set__(48 + this.data3.offsetX);
		this.textResumeButton.y.set__(100 + this.data3.offsetY);
		this.textResumeButton.set_text(this.data3.content);
		this.textResumeButton.setScale(this.data3.fontScale);
		this.buttonPlay.owner.addChild(new flambe.Entity().add(this.textResumeButton));
	}
	,addTextScore: function() {
		this.scoreLabel.set_align(flambe.display.TextAlign.Right);
		this.scoreLabel.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5 + 185 + this.data0.offsetX);
		this.scoreLabel.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5 - 103 + this.data0.offsetY);
		var topScore = util.NDiSaveData.getInstance().getData(globals.NDiVarsToSave.SCORE[0]);
		this.scoreLabel.set_text("" + topScore);
		this.scoreLabel.setScale(this.data0.fontScale);
		this.owner.addChild(new flambe.Entity().add(this.scoreLabel));
		this.scoreTitleLabel.set_align(flambe.display.TextAlign.Center);
		this.scoreTitleLabel.x.set__(497 + this.data1.offsetX);
		this.scoreTitleLabel.y.set__(182 + this.data1.offsetY);
		this.scoreTitleLabel.set_text(this.data1.content);
		this.scoreTitleLabel.setScale(this.data1.fontScale);
		this.owner.addChild(new flambe.Entity().add(this.scoreTitleLabel));
	}
	,addTitleText: function() {
		this.titlePauseLabel.set_align(flambe.display.TextAlign.Center);
		this.titlePauseLabel.x.set__(633 + this.data2.offsetX);
		this.titlePauseLabel.y.set__(117 + this.data2.offsetY);
		this.titlePauseLabel.set_text(this.data2.content);
		this.titlePauseLabel.setScale(this.data2.fontScale);
		this.owner.addChild(new flambe.Entity().add(this.titlePauseLabel));
	}
	,__class__: scenes.components.NDiPause
});
scenes.components.NDiToken = function(lib) {
	flambe.swf.MoviePlayer.call(this,lib);
	this.transform = new flambe.display.Sprite();
	this.isSelected = false;
	this.tokenName = flambe.swf.MoviePlayer.prototype.get_name.call(this);
	this.gridPosition = new math.NDiVector2D(0,0);
	this.isDead = false;
	this.isHide = false;
	this.indexTypeToken = 0;
	this.isBlocked = false;
};
$hxClasses["scenes.components.NDiToken"] = scenes.components.NDiToken;
scenes.components.NDiToken.__name__ = ["scenes","components","NDiToken"];
scenes.components.NDiToken.__super__ = flambe.swf.MoviePlayer;
scenes.components.NDiToken.prototype = $extend(flambe.swf.MoviePlayer.prototype,{
	addToEntity: function() {
		this.entity = new flambe.Entity();
		this.entity.add(this);
		return this.entity;
	}
	,'delete': function() {
		this.entity.dispose();
	}
	,onAdded: function() {
		flambe.swf.MoviePlayer.prototype.onAdded.call(this);
		this.entity.add(this.transform);
	}
	,animationSelectedOff: function() {
		this.transform.scaleX.animateTo(1,0.5,flambe.animation.Ease.bounceOut);
		this.transform.scaleY.animateTo(1,0.5,flambe.animation.Ease.bounceOut);
	}
	,animationSelectedOn: function() {
		this.transform.scaleX.animateTo(0.8,0.5,flambe.animation.Ease.bounceOut);
		this.transform.scaleY.animateTo(0.8,0.5,flambe.animation.Ease.bounceOut);
	}
	,animationTimeOut: function() {
		this.play(this.tokenName + "timeout");
	}
	,animationIdle: function() {
		this.loop(this.tokenName + "idle");
	}
	,hide: function(value) {
		if(value == null) value = true;
		if(value) this.tokenName = globals.NDiGameConstants.ARRAY_PREFIX_ANIMATION_TOKEN[globals.NDiGameConstants.ARRAY_PREFIX_ANIMATION_TOKEN.length - 1]; else this.tokenName = globals.NDiGameConstants.ARRAY_PREFIX_ANIMATION_TOKEN[this.indexTypeToken];
		this.isHide = value;
		this.animationIdle();
	}
	,animationOff: function() {
		this.hide(false);
		this.transform.alpha.set__(1);
		this.isDead = true;
		this.play(this.tokenName + "disappear");
	}
	,__class__: scenes.components.NDiToken
});
scenes.components.NDiTokenStatic = function(texture) {
	flambe.display.ImageSprite.call(this,texture);
	this.isSelected = false;
	this.tokenName = flambe.display.ImageSprite.prototype.get_name.call(this);
	this.gridPosition = new math.NDiVector2D(0,0);
	this.indexToken = -1;
};
$hxClasses["scenes.components.NDiTokenStatic"] = scenes.components.NDiTokenStatic;
scenes.components.NDiTokenStatic.__name__ = ["scenes","components","NDiTokenStatic"];
scenes.components.NDiTokenStatic.__super__ = flambe.display.ImageSprite;
scenes.components.NDiTokenStatic.prototype = $extend(flambe.display.ImageSprite.prototype,{
	addToEntity: function() {
		this.entity = new flambe.Entity();
		this.entity.add(this);
		return this.entity;
	}
	,onAdded: function() {
		flambe.display.ImageSprite.prototype.onAdded.call(this);
	}
	,__class__: scenes.components.NDiTokenStatic
});
scenes.components.NDiTutorialHighlight = function(texture) {
	flambe.display.ImageSprite.call(this,texture);
	this.countTime = 0;
	this.isHighLight = false;
};
$hxClasses["scenes.components.NDiTutorialHighlight"] = scenes.components.NDiTutorialHighlight;
scenes.components.NDiTutorialHighlight.__name__ = ["scenes","components","NDiTutorialHighlight"];
scenes.components.NDiTutorialHighlight.__super__ = flambe.display.ImageSprite;
scenes.components.NDiTutorialHighlight.prototype = $extend(flambe.display.ImageSprite.prototype,{
	onAdded: function() {
		flambe.display.ImageSprite.prototype.onAdded.call(this);
	}
	,onUpdate: function(dt) {
		flambe.display.ImageSprite.prototype.onUpdate.call(this,dt);
		this.updateHighLight(dt);
	}
	,updateHighLight: function(dt) {
		this.countTime += dt;
		if(this.countTime > 0.8) {
			if(this.isHighLight) {
				this.highLightOff();
				this.isHighLight = false;
			} else {
				this.highLightOn();
				this.isHighLight = true;
			}
			this.countTime = 0;
		}
	}
	,highLightOff: function() {
		this.alpha.animateTo(0,0.4);
	}
	,highLightOn: function() {
		this.alpha.animateTo(1,0.4);
	}
	,__class__: scenes.components.NDiTutorialHighlight
});
scenes.popups = {}
scenes.popups.NDiPopupExit = function(scene,isOnRoot) {
	if(isOnRoot == null) isOnRoot = false;
	this.onRoot = isOnRoot;
	this.nextScene = scene;
	this.transform = new flambe.display.Sprite();
	var btnTextureYes = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.POPUP_EXIT_BUTTON_YES);
	this.buttonYES = new scenes.components.NDiButton(btnTextureYes);
	this.buttonYES.centerAnchor();
	this.buttonYES.nameButton = "buttonYES";
	this.buttonYES.x.set__(-80);
	this.buttonYES.y.set__(70);
	this.buttonYES.get_pointerUp().connect($bind(this,this.handlePointerDown));
	var btnTextureNo = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.POPUP_EXIT_BUTTON_NO);
	this.buttonNO = new scenes.components.NDiButton(btnTextureNo);
	this.buttonNO.centerAnchor();
	this.buttonNO.nameButton = "buttonNO";
	this.buttonNO.x.set__(80);
	this.buttonNO.y.set__(70);
	this.buttonNO.get_pointerUp().connect($bind(this,this.handlePointerDown));
	var bgTexture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.POPUP_EXIT_BACKGROUND);
	this.bg = new flambe.display.ImageSprite(bgTexture);
	this.bg.centerAnchor();
	this.bgAlpha = new flambe.display.FillSprite(2495538,flambe.System._platform.getStage().get_width(),flambe.System._platform.getStage().get_height());
	this.bgAlpha.centerAnchor();
	this.bgAlpha.alpha.set__(0.5);
	var data1 = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|pause|popupExit|areyoursure_label");
	this.labelText = managers.NDiResourcesManager.addGenericText(data1.content,globals.NDiGameConstants.GAME_WIDTH * 0.03 + data1.offsetX,globals.NDiGameConstants.GAME_HEIGHT * -0.15 + data1.offsetY,data1.fontScale,data1.fontName,flambe.display.TextAlign.Center);
	var dataYes = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|pause|popupExit|accept_button");
	this.textYES = managers.NDiResourcesManager.addGenericText(dataYes.content,this.buttonYES.x._value + dataYes.offsetX,this.buttonYES.y._value - 19 + dataYes.offsetY,dataYes.fontScale,dataYes.fontName,flambe.display.TextAlign.Center);
	var dataNo = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|pause|popupExit|cancel_button");
	this.textNO = managers.NDiResourcesManager.addGenericText(dataNo.content,this.buttonNO.x._value + dataNo.offsetX,this.buttonNO.y._value - 19 + dataNo.offsetY,dataNo.fontScale,dataNo.fontName,flambe.display.TextAlign.Center);
};
$hxClasses["scenes.popups.NDiPopupExit"] = scenes.popups.NDiPopupExit;
scenes.popups.NDiPopupExit.__name__ = ["scenes","popups","NDiPopupExit"];
scenes.popups.NDiPopupExit.__super__ = flambe.Component;
scenes.popups.NDiPopupExit.prototype = $extend(flambe.Component.prototype,{
	addToEntity: function() {
		new flambe.Entity().add(this);
		return this.owner;
	}
	,onAdded: function() {
		this.owner.add(this.transform);
		this.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
		this.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
		this.addBackground();
		this.addTextQuestion();
		this.addButtons();
	}
	,addTextQuestion: function() {
		this.owner.addChild(new flambe.Entity().add(this.labelText));
	}
	,handlePointerDown: function(event) {
		var tmpButton = js.Boot.__cast(event.hit , scenes.components.NDiButton);
		if(tmpButton.nameButton == "buttonYES") {
			if(this.onRoot == false) managers.NDiSceneManager.getInstance().changeScene(this.nextScene); else {
				managers.NDiSceneManager.getInstance().director.popScene();
				managers.NDiSceneManager.getInstance().changeScene(this.nextScene);
			}
		} else if(tmpButton.nameButton == "buttonNO") this.owner.dispose();
	}
	,addBackground: function() {
		this.owner.addChild(new flambe.Entity().add(this.bgAlpha));
		this.owner.addChild(new flambe.Entity().add(this.bg));
	}
	,addButtons: function() {
		this.owner.addChild(new flambe.Entity().add(this.buttonYES));
		this.owner.addChild(new flambe.Entity().add(this.buttonNO));
		this.owner.addChild(new flambe.Entity().add(this.textYES));
		this.owner.addChild(new flambe.Entity().add(this.textNO));
	}
	,get_name: function() {
		return "NDiPopupExit_8";
	}
	,__class__: scenes.popups.NDiPopupExit
});
scenes.popups.NDiPopupHelp = function() {
	this.transform = new flambe.display.Sprite();
	this.bgAlpha = new flambe.display.FillSprite(2495538,flambe.System._platform.getStage().get_width(),flambe.System._platform.getStage().get_height());
	var titleTexture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/titles/textcontainer");
	this.title = new scenes.components.NDiImage(titleTexture);
	var data1 = managers.NDiLocalizationManager.getInstance().getLocalizationData("help|title");
	var font1 = managers.NDiResourcesManager.getInstance().loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,data1.fontName);
	this.frameText = managers.NDiResourcesManager.addGenericText(data1.content,data1.offsetX,-20 + data1.offsetY,data1.fontScale,data1.fontName,flambe.display.TextAlign.Center);
	this.frame1 = this.createFrame("images/panels/help/slot01HELP");
	this.frame2 = this.createFrame("images/panels/help/slot02HELP");
	this.frame3 = this.createFrame("images/panels/help/slot03HELP");
	var dataNumberFrame1 = managers.NDiLocalizationManager.getInstance().getLocalizationData("help|number1");
	this.number1 = this.addNumberTexts(dataNumberFrame1);
	var dataNumberFrame2 = managers.NDiLocalizationManager.getInstance().getLocalizationData("help|number2");
	this.number2 = this.addNumberTexts(dataNumberFrame2);
	var dataNumberFrame3 = managers.NDiLocalizationManager.getInstance().getLocalizationData("help|number3");
	this.number3 = this.addNumberTexts(dataNumberFrame3);
	var dataTextFrame1 = managers.NDiLocalizationManager.getInstance().getLocalizationData("help|number1_text");
	this.text1 = this.addTexts(dataTextFrame1);
	var dataTextFrame2 = managers.NDiLocalizationManager.getInstance().getLocalizationData("help|number2_text");
	this.text2 = this.addTexts(dataTextFrame2);
	var dataTextFrame3 = managers.NDiLocalizationManager.getInstance().getLocalizationData("help|number3_text");
	this.text3 = this.addTexts(dataTextFrame3);
};
$hxClasses["scenes.popups.NDiPopupHelp"] = scenes.popups.NDiPopupHelp;
scenes.popups.NDiPopupHelp.__name__ = ["scenes","popups","NDiPopupHelp"];
scenes.popups.NDiPopupHelp.__super__ = flambe.Component;
scenes.popups.NDiPopupHelp.prototype = $extend(flambe.Component.prototype,{
	addToEntity: function() {
		new flambe.Entity().add(this);
		return this.owner;
	}
	,onAdded: function() {
		flambe.Component.prototype.onAdded.call(this);
		this.owner.add(this.transform);
		this.addBackground();
		this.addFrames();
		this.addTitle();
		this.addButtons();
	}
	,handlePointerDown: function(event) {
		var tmpButton = js.Boot.__cast(event.hit , scenes.components.NDiButton);
		tmpButton.isSelected = true;
		tmpButton.animationPressed();
		this.currentButtonPressed = tmpButton;
	}
	,handlePointerUpGlobal: function(event) {
		if(this.currentButtonPressed != null) {
			this.currentButtonPressed.animationRelease();
			this.currentButtonPressed = null;
		}
	}
	,handlePointerUp: function(event) {
		var tmpButton = js.Boot.__cast(event.hit , scenes.components.NDiButton);
		if(tmpButton.isSelected) {
			if(tmpButton.nameButton == "OK_BUTTON") this.owner.dispose();
		}
	}
	,createFrame: function(nameFrame) {
		var textImage = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,nameFrame);
		var newImage = new scenes.components.NDiImage(textImage);
		return newImage;
	}
	,addFrames: function() {
		this.frame1.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.25 - 50);
		this.frame1.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
		new flambe.Entity().add(this.frame1);
		this.frame1.owner.addChild(new flambe.Entity().add(this.number1));
		this.frame1.owner.addChild(new flambe.Entity().add(this.text1));
		this.owner.addChild(this.frame1.owner);
		this.frame2.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
		this.frame2.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
		new flambe.Entity().add(this.frame2);
		this.frame2.owner.addChild(new flambe.Entity().add(this.number2));
		this.frame2.owner.addChild(new flambe.Entity().add(this.text2));
		this.owner.addChild(this.frame2.owner);
		this.frame3.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.75 + 50);
		this.frame3.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
		new flambe.Entity().add(this.frame3);
		this.frame3.owner.addChild(new flambe.Entity().add(this.number3));
		this.frame3.owner.addChild(new flambe.Entity().add(this.text3));
		this.owner.addChild(this.frame3.owner);
	}
	,addNumberTexts: function(data) {
		var font = managers.NDiResourcesManager.getInstance().loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,data.fontName);
		var number = new flambe.display.TextSprite(font);
		number.set_text(data.content);
		number.set_align(flambe.display.TextAlign.Center);
		number.x.set__(-100 + data.offsetX);
		number.y.set__(-198 + data.offsetY);
		number.setScale(data.fontScale);
		return number;
	}
	,addTexts: function(data) {
		var font = managers.NDiResourcesManager.getInstance().loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,data.fontName);
		var text = new flambe.display.TextSprite(font);
		text.set_text(data.content);
		text.set_align(flambe.display.TextAlign.Left);
		text.x.set__(-110 + data.offsetX);
		text.y.set__(50 + data.offsetY);
		text.setScale(data.fontScale);
		return text;
	}
	,addTitle: function() {
		this.title.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
		this.title.transform.y.set__(24);
		this.owner.addChild(new flambe.Entity().add(this.title));
		this.title.owner.addChild(new flambe.Entity().add(this.frameText));
	}
	,addBackground: function() {
		this.bgAlpha.alpha.set__(0.7);
		this.owner.addChild(new flambe.Entity().add(this.bgAlpha));
	}
	,addButtons: function() {
		var tmpButton = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/buttons/popupExit/btn_cancel");
		this.buttonOK = new scenes.components.NDiButton(tmpButton);
		this.buttonOK.centerAnchor();
		this.buttonOK.nameButton = "OK_BUTTON";
		this.buttonOK.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5 + 370);
		this.buttonOK.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5 + 252);
		this.buttonOK.get_pointerDown().connect($bind(this,this.handlePointerDown));
		this.buttonOK.get_pointerUp().connect($bind(this,this.handlePointerUp));
		flambe.System._platform.getPointer().up.connect($bind(this,this.handlePointerUpGlobal));
		this.owner.addChild(new flambe.Entity().add(this.buttonOK));
		var data = managers.NDiLocalizationManager.getInstance().getLocalizationData("help|ok_button");
		var textTmp = managers.NDiResourcesManager.addGenericText(data.content,89 + data.offsetX,15 + data.offsetY,data.fontScale,data.fontName,flambe.display.TextAlign.Center);
		this.buttonOK.owner.addChild(new flambe.Entity().add(textTmp));
	}
	,get_name: function() {
		return "NDiPopupHelp_7";
	}
	,__class__: scenes.popups.NDiPopupHelp
});
scenes.popups.NDiPopupLoading = function() {
	this.transform = new flambe.display.Sprite();
	this.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
	this.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
	var backgroundTexture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/backgrounds/loading_bg");
	this.background = new scenes.components.NDiImage(backgroundTexture);
	var data1 = managers.NDiLocalizationManager.getInstance().getLocalizationData("loading_scenes|loading_text");
	this.textLoading = managers.NDiResourcesManager.addGenericText(data1.content,320 + data1.offsetX,220 + data1.offsetY,data1.fontScale,data1.fontName,flambe.display.TextAlign.Left);
};
$hxClasses["scenes.popups.NDiPopupLoading"] = scenes.popups.NDiPopupLoading;
scenes.popups.NDiPopupLoading.__name__ = ["scenes","popups","NDiPopupLoading"];
scenes.popups.NDiPopupLoading.__super__ = flambe.Component;
scenes.popups.NDiPopupLoading.prototype = $extend(flambe.Component.prototype,{
	onAdded: function() {
		flambe.Component.prototype.onAdded.call(this);
		this.owner.add(this.transform);
		this.owner.addChild(new flambe.Entity().add(this.background));
		this.owner.addChild(new flambe.Entity().add(this.textLoading));
	}
	,get_name: function() {
		return "NDiPopupLoading_1";
	}
	,__class__: scenes.popups.NDiPopupLoading
});
scenes.popups.NDiPopupPuzzle = function() {
	this.transform = new flambe.display.Sprite();
	var bgTexture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/panels/puzzle/popup_background");
	var frameTexture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/panels/puzzle/popup_battle");
	this.data1 = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|popup|turtle_attack");
	this.font1 = managers.NDiResourcesManager.getInstance().loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,this.data1.fontName);
	this.data2 = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|popup|enemy_attack");
	this.font2 = managers.NDiResourcesManager.getInstance().loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,this.data1.fontName);
	this.data3 = managers.NDiLocalizationManager.getInstance().getLocalizationData("gameplay|popup|enemy_defeated");
	this.font3 = managers.NDiResourcesManager.getInstance().loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,this.data1.fontName);
	this.message = new flambe.display.TextSprite(this.font1,"");
	this.bg = new flambe.display.ImageSprite(bgTexture);
	this.frame = new flambe.display.ImageSprite(frameTexture);
};
$hxClasses["scenes.popups.NDiPopupPuzzle"] = scenes.popups.NDiPopupPuzzle;
scenes.popups.NDiPopupPuzzle.__name__ = ["scenes","popups","NDiPopupPuzzle"];
scenes.popups.NDiPopupPuzzle.__super__ = flambe.Component;
scenes.popups.NDiPopupPuzzle.prototype = $extend(flambe.Component.prototype,{
	onAdded: function() {
		flambe.Component.prototype.onAdded.call(this);
		this.owner.add(this.transform);
		this.owner.add(new flambe.script.Script());
		this.addBackground();
		this.addFrame();
		this.addText();
		this.toggleHide(0,false);
	}
	,addText: function() {
		this.message.centerAnchor();
		this.message.set_align(flambe.display.TextAlign.Center);
		this.message.x.set__(-25);
		this.message.y.set__(-53);
		this.owner.addChild(new flambe.Entity().add(this.message));
	}
	,addFrame: function() {
		this.frame.centerAnchor();
		this.frame.x.set__(-25);
		this.owner.addChild(new flambe.Entity().add(this.frame));
	}
	,addBackground: function() {
		var fillBg = new flambe.display.FillSprite(16777215,472,472);
		fillBg.alpha.set__(0.0);
		fillBg.centerAnchor();
		this.owner.addChild(new flambe.Entity().add(fillBg));
		this.bg.centerAnchor();
		this.bg.x.set__(-31);
		this.bg.y.set__(-35);
		this.owner.addChild(new flambe.Entity().add(this.bg));
	}
	,toggleHide: function(time,visible) {
		var _g = this;
		if(visible) {
			this.transform.alpha.set__(0);
			this.transform.scaleX.set__(0);
			this.transform.scaleY.set__(0);
			this.transform.alpha.animateTo(1,time);
			this.transform.scaleX.animateTo(1,time);
			this.transform.scaleY.animateTo(1,time);
			this.transform.set_visible(visible);
			return;
		} else {
			this.transform.alpha.animateTo(0,time);
			this.transform.scaleX.animateTo(0,time);
			this.transform.scaleY.animateTo(0,time);
		}
		var f1 = new flambe.script.CallFunction(function() {
			_g.transform.set_visible(visible);
		});
		var seq1 = new flambe.script.Sequence([new flambe.script.Delay(time),f1]);
		this.owner._compMap.Script_18.run(seq1);
	}
	,show: function() {
		this.toggleHide(0.2,true);
	}
	,hide: function() {
		this.toggleHide(0.2,false);
	}
	,changeText: function(popupType) {
		var data;
		if(popupType == globals.NDiTypePopupPuzzle.NDI_POPUP_TURTLE_ATTACK) {
			data = this.data1;
			this.message.set_font(this.font1);
		} else if(popupType == globals.NDiTypePopupPuzzle.NDI_POPUP_ENEMY_ATTACK) {
			data = this.data2;
			this.message.set_font(this.font2);
		} else {
			data = this.data3;
			this.message.set_font(this.font3);
		}
		this.message.set_text(data.content);
		this.message.setScale(data.fontScale);
		var _g = this.message.x;
		_g.set__(_g._value + data.offsetX);
		var _g = this.message.y;
		_g.set__(_g._value + data.offsetY);
	}
	,get_name: function() {
		return "NDiPopupPuzzle_10";
	}
	,__class__: scenes.popups.NDiPopupPuzzle
});
scenes.popups.NDiTutorialDialog = function(parent,upFunction,upGlobalFunction,downFunction) {
	this.transform = new flambe.display.Sprite();
	if(upFunction == null) this.handlePointerUpFunction = $bind(this,this.handlePointerUp); else this.handlePointerUpFunction = upFunction;
	if(upGlobalFunction == null) this.handlePointerUpGlobalFunction = $bind(this,this.handlePointerUpGlobal); else this.handlePointerUpGlobalFunction = upGlobalFunction;
	if(downFunction == null) this.handlePointerDownFunction = $bind(this,this.handlePointerDown); else this.handlePointerDownFunction = downFunction;
	this.parentScene = parent;
};
$hxClasses["scenes.popups.NDiTutorialDialog"] = scenes.popups.NDiTutorialDialog;
scenes.popups.NDiTutorialDialog.__name__ = ["scenes","popups","NDiTutorialDialog"];
scenes.popups.NDiTutorialDialog.__super__ = flambe.Component;
scenes.popups.NDiTutorialDialog.prototype = $extend(flambe.Component.prototype,{
	onAdded: function() {
		flambe.Component.prototype.onAdded.call(this);
		this.owner.add(this.transform);
		this.addBackground();
		this.addText();
		this.addSkipButton();
	}
	,handlePointerDown: function(event) {
		var tmpButton = js.Boot.__cast(event.hit , scenes.components.NDiButton);
		tmpButton.isSelected = true;
		tmpButton.animationPressed();
		this.currentButtonPressed = tmpButton;
	}
	,handlePointerUpGlobal: function(event) {
		if(this.currentButtonPressed != null) {
			this.currentButtonPressed.animationRelease();
			this.currentButtonPressed = null;
		}
	}
	,handlePointerUp: function(event) {
		var tmpButton = js.Boot.__cast(event.hit , scenes.components.NDiButton);
		if(tmpButton.isSelected) {
			if(tmpButton.nameButton == "SKIP_BUTTON") {
			}
		}
	}
	,changeText: function() {
		this.frameText.owner.dispose();
		this.addText();
	}
	,addBackground: function() {
		var tmpBg = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/panels/tutorial/tutorial_dialogbox");
		this.frame = new scenes.components.NDiButton(tmpBg);
		this.frame.centerAnchor();
		this.frame.disablePointer();
		this.frame.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.25);
		this.frame.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
		this.owner.addChild(new flambe.Entity().add(this.frame));
	}
	,addSkipButton: function() {
		var tmpButton = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/buttons/popupExit/btn_cancel");
		this.skipButton = new scenes.components.NDiButton(tmpButton);
		this.skipButton.centerAnchor();
		this.skipButton.nameButton = "SKIP_BUTTON";
		this.skipButton.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.25 + 140);
		this.skipButton.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5 + 90);
		this.skipButton.get_pointerDown().connect(this.handlePointerDownFunction);
		this.skipButton.get_pointerUp().connect(this.handlePointerUpFunction);
		flambe.System._platform.getPointer().up.connect(this.handlePointerUpGlobalFunction);
		this.owner.addChild(new flambe.Entity().add(this.skipButton));
		var data = managers.NDiLocalizationManager.getInstance().getLocalizationData("tutorial|skip_button");
		var textTmp = managers.NDiResourcesManager.addGenericText(data.content,this.skipButton.getNaturalWidth() * 0.5 + data.offsetX,15 + data.offsetY,data.fontScale,data.fontName,flambe.display.TextAlign.Center);
		this.skipButton.owner.addChild(new flambe.Entity().add(textTmp));
	}
	,addText: function() {
		var data = managers.NDiLocalizationManager.getInstance().getLocalizationData(globals.NDiGameConstants.ARRAY_TUTORIAL_TEXTS[this.parentScene.currentStep]);
		var font = managers.NDiResourcesManager.getInstance().loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,data.fontName);
		this.frameText = new flambe.display.TextSprite(font,"");
		this.frameText.set_text(data.content);
		this.frameText.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.25 - 135 + data.offsetX);
		this.frameText.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5 - 85 + data.offsetY);
		this.frameText.set_align(flambe.display.TextAlign.Left);
		this.frameText.setScale(data.fontScale);
		this.owner.addChild(new flambe.Entity().add(this.frameText));
	}
	,get_name: function() {
		return "NDiTutorialDialog_3";
	}
	,__class__: scenes.popups.NDiTutorialDialog
});
util.JSEmbedProxy = function() { }
$hxClasses["util.JSEmbedProxy"] = util.JSEmbedProxy;
util.JSEmbedProxy.__name__ = ["util","JSEmbedProxy"];
util.JSEmbedProxy.get_base = function() {
	return util.JSEmbedProxy.callJSEmbedMethod("baseUrl()");
}
util.JSEmbedProxy.callJSEmbedMethod = function(pRequest) {
	try {
		var result = eval("jsembed." + pRequest);
		return result == null?"":result;
	} catch( err ) {
	}
	return "";
}
util.NDiFillLine = function(point0,point1,thickness) {
	util.NDiLine.call(this,point0,point1);
	this.line = new flambe.display.FillSprite(16777215,this.distance,thickness);
	this.line.setAnchor(0,this.getLine().height._value * 0.5);
};
$hxClasses["util.NDiFillLine"] = util.NDiFillLine;
util.NDiFillLine.__name__ = ["util","NDiFillLine"];
util.NDiFillLine.__super__ = util.NDiLine;
util.NDiFillLine.prototype = $extend(util.NDiLine.prototype,{
	onAdded: function() {
		this.entity.addChild(new flambe.Entity().add(this.line));
		this.entity.add(this.transform);
		this.updateLine();
	}
	,updateLine: function() {
		util.NDiLine.prototype.updateLine.call(this);
		this.getLine().width.set__(this.distance);
	}
	,getLine: function() {
		return this.line;
	}
	,__class__: util.NDiFillLine
});
util.NDiMatchLine = function(point0,point1,thickness) {
	util.NDiFillLine.call(this,point0,point1,thickness);
	this.joinTexture = managers.NDiResourcesManager.getInstance().loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/decorations/dot_match");
	this.joinL = new scenes.components.NDiImage(this.joinTexture);
	this.joinR = new scenes.components.NDiImage(this.joinTexture);
	this.joinL.image.disablePointer();
	this.joinR.image.disablePointer();
};
$hxClasses["util.NDiMatchLine"] = util.NDiMatchLine;
util.NDiMatchLine.__name__ = ["util","NDiMatchLine"];
util.NDiMatchLine.__super__ = util.NDiFillLine;
util.NDiMatchLine.prototype = $extend(util.NDiFillLine.prototype,{
	onAdded: function() {
		util.NDiFillLine.prototype.onAdded.call(this);
		this.owner.addChild(new flambe.Entity().add(this.joinL));
		this.owner.addChild(new flambe.Entity().add(this.joinR));
		this.joinL.transform.x.set__(this.startingPoint.x);
		this.joinL.transform.y.set__(this.startingPoint.y);
		this.joinR.transform.x.set__(this.endingPoint.x);
		this.joinR.transform.y.set__(this.endingPoint.y);
	}
	,__class__: util.NDiMatchLine
});
util.NDiProbabilityUtils = function() { }
$hxClasses["util.NDiProbabilityUtils"] = util.NDiProbabilityUtils;
util.NDiProbabilityUtils.__name__ = ["util","NDiProbabilityUtils"];
util.NDiProbabilityUtils.isFiltered = function(value,filter) {
	var _g1 = 0, _g = filter.length;
	while(_g1 < _g) {
		var index2 = _g1++;
		if(filter[index2] == value) {
			return true;
			break;
		}
	}
	return false;
}
util.NDiProbabilityUtils.convertRangeToPercent = function(probabilities) {
	var newMap = new haxe.ds.EnumValueMap();
	var prevValue = 0;
	var _g1 = 1, _g = globals.NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN.length;
	while(_g1 < _g) {
		var index = _g1++;
		var value = probabilities.get(globals.NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[index]);
		var setValue = value;
		if(index > 1) setValue = value - prevValue;
		setValue = setValue < 0?0:setValue;
		newMap.set(globals.NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[index],setValue);
		prevValue = value;
	}
	return newMap;
}
util.NDiProbabilityUtils.createModifiedProbability = function(probabilities,filter,newProbability) {
	var remaining = 1 - newProbability;
	var factor = remaining / (1 - probabilities.get(filter));
	var newMap = new haxe.ds.EnumValueMap();
	var prevValue = 0;
	var _g1 = 1, _g = globals.NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN.length;
	while(_g1 < _g) {
		var index = _g1++;
		var value = probabilities.get(globals.NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[index]);
		if(globals.NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[index] == filter) value = newProbability; else value = value * factor;
		if(index > 1) value = prevValue + value;
		value = value < 0?0:value;
		newMap.set(globals.NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[index],value);
		prevValue = value;
	}
	return newMap;
}
util.NDiProbabilityUtils.createFilteredProbability = function(probabilities,filter) {
	var inc = 0;
	var _g1 = 0, _g = filter.length;
	while(_g1 < _g) {
		var index = _g1++;
		inc += probabilities.get(filter[index]);
	}
	inc = inc / (globals.NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN.length - 1 - filter.length);
	var newMap = new haxe.ds.EnumValueMap();
	var prevValue = 0;
	var _g1 = 1, _g = globals.NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN.length;
	while(_g1 < _g) {
		var index = _g1++;
		var isFiltered = util.NDiProbabilityUtils.isFiltered(globals.NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[index],filter);
		if(isFiltered) newMap.set(globals.NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[index],0); else {
			var value = probabilities.get(globals.NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[index]);
			if(index > 1) value = prevValue + value;
			value += inc;
			value = value < 0?0:value;
			newMap.set(globals.NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[index],value);
			prevValue = value;
		}
	}
	return newMap;
}
util.NDiProbabilityUtils.createNormalProbabilities = function(probabilities) {
	var newMap = new haxe.ds.EnumValueMap();
	var prevValue = 0;
	var _g1 = 1, _g = globals.NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN.length;
	while(_g1 < _g) {
		var index = _g1++;
		var value = probabilities.get(globals.NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[index]);
		if(index > 1) value = prevValue + value;
		value = value < 0?0:value;
		newMap.set(globals.NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[index],value);
		prevValue = value;
	}
	return newMap;
}
util.NDiRandomUtils = function() { }
$hxClasses["util.NDiRandomUtils"] = util.NDiRandomUtils;
util.NDiRandomUtils.__name__ = ["util","NDiRandomUtils"];
util.NDiRandomUtils.getRandomFloat = function(a,b) {
	var dif = Math.abs(a - b);
	var rnd = Math.random();
	rnd = rnd * dif;
	rnd = a + rnd;
	return rnd;
}
util.NDiSaveData = function() {
	this.data = flambe.System._platform.getStorage();
	this.initData();
};
$hxClasses["util.NDiSaveData"] = util.NDiSaveData;
util.NDiSaveData.__name__ = ["util","NDiSaveData"];
util.NDiSaveData.initInstance = function() {
	if(util.NDiSaveData.instance == null) util.NDiSaveData.instance = new util.NDiSaveData();
}
util.NDiSaveData.getInstance = function() {
	return util.NDiSaveData.instance;
}
util.NDiSaveData.prototype = {
	getData: function(key) {
		return this.data.get(key);
	}
	,setData: function(key,value) {
		this.data.set(key,value);
	}
	,initData: function() {
		var _g1 = 0, _g = globals.NDiGameConstants.ARRAY_VARS_TO_SAVE.length;
		while(_g1 < _g) {
			var index = _g1++;
			if(this.getData(globals.NDiGameConstants.ARRAY_VARS_TO_SAVE[index][0]) == null) this.setData(globals.NDiGameConstants.ARRAY_VARS_TO_SAVE[index][0],globals.NDiGameConstants.ARRAY_VARS_INIT_VALUES[index]);
			null;
		}
	}
	,__class__: util.NDiSaveData
}
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; };
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; };
if(Array.prototype.indexOf) HxOverrides.remove = function(a,o) {
	var i = a.indexOf(o);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
Array.prototype.__class__ = $hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
Xml.Element = "element";
Xml.PCData = "pcdata";
Xml.CData = "cdata";
Xml.Comment = "comment";
Xml.DocType = "doctype";
Xml.ProcessingInstruction = "processingInstruction";
Xml.Document = "document";
if(typeof(JSON) != "undefined") haxe.Json = JSON;
flambe.platform.html.HtmlPlatform.instance = new flambe.platform.html.HtmlPlatform();
flambe.util.SignalBase.DISPATCHING_SENTINEL = new flambe.util.SignalConnection(null,null);
flambe.System.root = new flambe.Entity();
flambe.System.uncaughtError = new flambe.util.Signal1();
flambe.System.hidden = new flambe.util.Value(false);
flambe.System.hasGPU = new flambe.util.Value(false);
flambe.System.volume = new flambe.animation.AnimatedFloat(1);
flambe.System._platform = flambe.platform.html.HtmlPlatform.instance;
flambe.System._calledInit = false;
js.Browser.window = typeof window != "undefined" ? window : null;
js.Browser.document = typeof window != "undefined" ? window.document : null;
js.Browser.navigator = typeof window != "undefined" ? window.navigator : null;
flambe.asset.Manifest.__meta__ = { obj : { assets : [{ assets_loading : [{ bytes : 998, md5 : "b38479596f6ecd5b29c27a8cb35a0031", name : "loading_bar.png"},{ bytes : 96383, md5 : "b504a73f8d96426dbd55a60d03fd9950", name : "loading_bg.jpg"},{ bytes : 13020, md5 : "cc01ed8ca30b15e7e6278a4d25c176c0", name : "loading_icon.png"}], assets_general : [{ bytes : 65101, md5 : "1191e9b068a4746f974148c089e7ecbf", name : "fonts/Original/30px/TMNToriginalFont_30.fnt"},{ bytes : 22017, md5 : "b1612133ccaa43e0dd33ee75f15bc997", name : "fonts/Original/30px/TMNToriginalFont_30_0.png"},{ bytes : 53165, md5 : "7805520f0238afa873c36e13dd168f64", name : "fonts/Original/45px/TMNToriginalFont_45.fnt"},{ bytes : 32004, md5 : "bcb383752d1886638af5f9a0c69045ba", name : "fonts/Original/45px/TMNToriginalFont_45_0.png"},{ bytes : 77110, md5 : "0bddc6eb8a5fb0b9661e406e02b45a09", name : "fonts/Original/60px/TMNToriginalFont_60.fnt"},{ bytes : 40437, md5 : "0fcce530f5767eb7c35d5372a1c8bd7a", name : "fonts/Original/60px/TMNToriginalFont_60_0.png"},{ bytes : 376704, md5 : "10409ac16ac4f9e8f66d5d99e33cc743", name : "images/animations/enemies/footBot/atlas0.png"},{ bytes : 34455, md5 : "ed7d5155c0e93ba8397950908e5ab639", name : "images/animations/enemies/footBot/library.json"},{ bytes : 243556, md5 : "38914667b59a73b4f5d77e632e306a6f", name : "images/animations/enemies/Kraang/atlas0.png"},{ bytes : 15947, md5 : "a25a2e1069682027cd9fbf12cf07af37", name : "images/animations/enemies/Kraang/atlas1.png"},{ bytes : 13931, md5 : "d72e2e6eeafeeffacebe346728a9b5ce", name : "images/animations/enemies/Kraang/library.json"},{ bytes : 235282, md5 : "6f2889240772b0aa573ff932661e674b", name : "images/animations/enemies/Mouser/atlas0.png"},{ bytes : 20876, md5 : "1f0689eaa5bb0cf2c622e1cc28753bfe", name : "images/animations/enemies/Mouser/atlas1.png"},{ bytes : 11522, md5 : "0035ac50c86a27d90146d25f25ba505b", name : "images/animations/enemies/Mouser/library.json"},{ bytes : 383564, md5 : "bf6aab3dd2f82e46659c9a822fdc8b54", name : "images/animations/enemies/Rahzar/atlas0.png"},{ bytes : 14540, md5 : "f6cf59dd2361b28a7a0221de0e182af5", name : "images/animations/enemies/Rahzar/library.json"},{ bytes : 284209, md5 : "b7e74bf9e6cf38d03ff4c184f2d7382b", name : "images/animations/enemies/Shredder/atlas0.png"},{ bytes : 15197, md5 : "6939e25d9ffd03c60ca8b47667791b7c", name : "images/animations/enemies/Shredder/library.json"},{ bytes : 297620, md5 : "8bac9488f56d2c14b9cff3224b7d61e4", name : "images/animations/enemies/Snakeweed/atlas0.png"},{ bytes : 12729, md5 : "95f7723b456631b2dc4403f2c0ab0f57", name : "images/animations/enemies/Snakeweed/library.json"},{ bytes : 352002, md5 : "b85e5b799d0c7e3f3d00405f3cb4bb6c", name : "images/animations/enemies/Spiderbytez/atlas0.png"},{ bytes : 16477, md5 : "0cf03155cbfac4f33cf1800968f59b99", name : "images/animations/enemies/Spiderbytez/library.json"},{ bytes : 49847, md5 : "36f7800c8be11e661a7280820c001e92", name : "images/animations/enemies/weed/atlas0.png"},{ bytes : 42990, md5 : "51fc05fa6e46b9c641b1c9fffd60dc67", name : "images/animations/enemies/weed/atlas1.png"},{ bytes : 38310, md5 : "11987f9981cb1f4437fde413cefdda8b", name : "images/animations/enemies/weed/atlas2.png"},{ bytes : 1836, md5 : "111db188dd26e111fd9d4b9f4ede5397", name : "images/animations/enemies/weed/library.json"},{ bytes : 156037, md5 : "ffb5ad7571d38181ed1de273ced24b42", name : "images/animations/tmnt_smoke/atlas0.png"},{ bytes : 1077, md5 : "054f41012bdf64d01e7daa12eb214401", name : "images/animations/tmnt_smoke/library.json"},{ bytes : 115570, md5 : "93d3cdc7faccee1b5ca81afe79e022cc", name : "images/animations/tmnt_tokens/atlas0.png"},{ bytes : 20866, md5 : "09c3bc13a82622a2ee58e262e96ce3bc", name : "images/animations/tmnt_tokens/library.json"},{ bytes : 1397686, md5 : "6c6a1c452e46df5ce9d4da06302b5e54", name : "images/animations/turtles/animationsTurtlesAttacksHUD/atlas0.png"},{ bytes : 18007, md5 : "7460463380ecb2a82ab6c2d4260f0e72", name : "images/animations/turtles/animationsTurtlesAttacksHUD/library.json"},{ bytes : 535851, md5 : "bdfe3c62018a6d3950988ea6860ad88b", name : "images/animations/turtles/animationsTurtlesHUD/atlas0.png"},{ bytes : 159840, md5 : "6f77f7171eafb7a72b63e33274c5faa8", name : "images/animations/turtles/animationsTurtlesHUD/atlas1.png"},{ bytes : 11829, md5 : "38b2e84ff5c23281441e0e7ae686473a", name : "images/animations/turtles/animationsTurtlesHUD/library.json"},{ bytes : 3148, md5 : "183e679f8e1a808d4c4a9a0d1544a8ea", name : "images/animations/turtles/health_particles/atlas0.png"},{ bytes : 4640, md5 : "0b69cba7c0ade11bec8049eb11a09e2d", name : "images/animations/turtles/health_particles/library.json"},{ bytes : 533259, md5 : "1ac73e5bc5d3a49b16e60ea6db03eb12", name : "images/backgrounds/background1.png"},{ bytes : 93822, md5 : "7bb7e03ce028fdb9ae70974770d423cc", name : "images/backgrounds/loading_bg.jpg"},{ bytes : 1565545, md5 : "014f7d6c3d15c37de759e6a4307d2c37", name : "images/backgrounds/mainscreenBG.png"},{ bytes : 857454, md5 : "098a93d3d57e7355aa4ea2336668cdd3", name : "images/backgrounds/resultsBG.png"},{ bytes : 895808, md5 : "55cb7f53cdee2fd5c8e4c2644fc57489", name : "images/backgrounds/story.png"},{ bytes : 934133, md5 : "687599a17340f6e93cd911a65a974eaa", name : "images/backgrounds/_resultsBG.png"},{ bytes : 7481, md5 : "c09581e58b2ac77ec5a1178975553bd3", name : "images/buttons/credits/back.png"},{ bytes : 10947, md5 : "ae8ff4dad6832dc86794ee38482579c6", name : "images/buttons/mainscreen/btn_credits.png"},{ bytes : 53559, md5 : "1b83616be0f5c3b095e86e10df8dc98f", name : "images/buttons/mainscreen/btn_play.png"},{ bytes : 11629, md5 : "d5bd564a576f5ba116ee5e956d6b91ec", name : "images/buttons/mainscreen/btn_sound.png"},{ bytes : 10645, md5 : "fd0ddc95d66cebd71c1af71ddb9dca9d", name : "images/buttons/mainscreen/btn_soundoff.png"},{ bytes : 10987, md5 : "d51d0383aa44fc3ddfceb8b1e91020e1", name : "images/buttons/pause/help.png"},{ bytes : 10671, md5 : "2e5bcabef4b408cac43a1868ca51738a", name : "images/buttons/pause/quit.png"},{ bytes : 10941, md5 : "882ca2e6320860e432616c634a33b396", name : "images/buttons/pause/resume.png"},{ bytes : 9897, md5 : "f9a8c8608ef3760f1ab4dcc546e7ddd2", name : "images/buttons/pause/soundOFF.png"},{ bytes : 11031, md5 : "b1019ff2714f39aa0d94419b26a4a286", name : "images/buttons/pause/soundON.png"},{ bytes : 7575, md5 : "37afe2338808ac925b217ea8d5e9c9b4", name : "images/buttons/pause_button.png"},{ bytes : 8784, md5 : "72aac7a88bc4e8e93df289b11c43c4ac", name : "images/buttons/popupExit/btn_accept.png"},{ bytes : 8975, md5 : "bb17ef28619d1fb98f17064b46cbff20", name : "images/buttons/popupExit/btn_cancel.png"},{ bytes : 11149, md5 : "840d56f868ce3742beb8ef348f54bcf9", name : "images/buttons/results/quit.png"},{ bytes : 20214, md5 : "c3c73114d40944e36ba7ccac4468d35a", name : "images/buttons/results/replay.png"},{ bytes : 4313, md5 : "c39a7ba1bc0ed5d0e19a22dbafe55ce5", name : "images/decorations/dot_match.png"},{ bytes : 34719, md5 : "eb37c9587e69935c69de709fa03a1055", name : "images/decorations/newtopscore.png"},{ bytes : 9869, md5 : "6cdb6f7486662e981457528fda3ec46c", name : "images/hud/barenemy_bg.png"},{ bytes : 974, md5 : "9d3ce6fc6567f4bb0c887b11bc97f352", name : "images/hud/barenemy_blood.png"},{ bytes : 7160, md5 : "5412073e5a3a39ed694df90ff0ddbc7d", name : "images/hud/barenemy_icon.png"},{ bytes : 960, md5 : "b4941a05f9aaf333c0f97749ee08ebe0", name : "images/hud/barenemy_timer_bar.png"},{ bytes : 8030, md5 : "a0a81b063f1837ba393f24407651bb1d", name : "images/hud/barenemy_timer_bg.png"},{ bytes : 3386, md5 : "b33b79e8c5cce2ee79477ab94de79e41", name : "images/hud/barenemy_timer_icon.png"},{ bytes : 22944, md5 : "6ef9ca5e3734e578711d9909832f29fa", name : "images/hud/barlife_bg.png"},{ bytes : 990, md5 : "bf84117fd89a614d4f8262eed53d53bb", name : "images/hud/barlife_blood.png"},{ bytes : 7376, md5 : "a9639d74a11a947289d8410beffd8db1", name : "images/hud/barlife_icon.png"},{ bytes : 7160, md5 : "5412073e5a3a39ed694df90ff0ddbc7d", name : "images/hud/enemy_icons/barenemy_icon.png"},{ bytes : 7575, md5 : "37afe2338808ac925b217ea8d5e9c9b4", name : "images/hud/pause_button.png"},{ bytes : 157994, md5 : "6a58efdad5931aee26db4c43832ac6b1", name : "images/hud/puzzle_container.png"},{ bytes : 20415, md5 : "3c5fe0bf954c8862a5d1cdcce2e17109", name : "images/hud/scoreEmpty.png"},{ bytes : 8683, md5 : "7744d97d74a2ec46c48b2ab7093f6f4d", name : "images/hud/turtles_container.png"},{ bytes : 11435, md5 : "912ce9c960e50f204647c24cbfc58149", name : "images/panels/enemy/tmnt_hitReceiveFrame.png"},{ bytes : 244459, md5 : "1ad54e627c66db0c1d7c3cdf1cb979be", name : "images/panels/help/slot01HELP.png"},{ bytes : 238182, md5 : "e8ea7f6243d459cc4d08ad384dd3aa58", name : "images/panels/help/slot02HELP.png"},{ bytes : 199850, md5 : "7575e5d74b4eff95d2cb914af3ca71b8", name : "images/panels/help/slot03HELP.png"},{ bytes : 460846, md5 : "67eb1d8764a884eb4b8f65c5047913c0", name : "images/panels/help/slotallHELP.png"},{ bytes : 981, md5 : "b64de2879432741cc17565c8cfa946fe", name : "images/panels/laser/laser.png"},{ bytes : 3291, md5 : "99705b84e29f134653748683de5b4ba3", name : "images/panels/laser/laser_edge.png"},{ bytes : 253947, md5 : "744be3c1c73c7f3d609d0af6bc437bb0", name : "images/panels/pause/frame.png"},{ bytes : 186579, md5 : "87fea6c1811af06dd5d1bf6092205caa", name : "images/panels/popupExit/popup_bg.png"},{ bytes : 54537, md5 : "218fdfe47a27fc563698cd5a035e5bc5", name : "images/panels/puzzle/popup_background.png"},{ bytes : 112253, md5 : "66e2837b3aeb1191ffb0036d8e52d4cb", name : "images/panels/puzzle/popup_battle.png"},{ bytes : 25240, md5 : "ff37774c4b22f1cdf462df5603488f5d", name : "images/panels/results/topscores.png"},{ bytes : 12127, md5 : "73248a647f5beeea46c9f64d5985b279", name : "images/panels/tokens/donnie_token.png"},{ bytes : 11502, md5 : "91cc90298442599fabaf9d8b37257edd", name : "images/panels/tokens/leo_token.png"},{ bytes : 12308, md5 : "9c5ff69b44bb264915d51dfce2b5ecbd", name : "images/panels/tokens/mike_token.png"},{ bytes : 13953, md5 : "01b954e52a44e0728a68b60c28765286", name : "images/panels/tokens/pizzapower_token.png"},{ bytes : 11908, md5 : "3d1848c1b570341160a2463455821ca2", name : "images/panels/tokens/rapha_token.png"},{ bytes : 9954, md5 : "66bef374aabc6a15e9df710d62c9112e", name : "images/panels/tokens/splinter_token.png"},{ bytes : 15574, md5 : "8e8a7d1f2abea2caa11d5412c7a4fbf4", name : "images/panels/tokens/web.png"},{ bytes : 99593, md5 : "f6d81b2acc60a66a0823e88b70118e01", name : "images/panels/tutorial/tutorial_dialogbox.png"},{ bytes : 20580, md5 : "f22d7fe172553451cd517dbd5332ae63", name : "images/panels/tutorial/tutorial_highlight_threetokens.png"},{ bytes : 13691, md5 : "e1ee8fdcf24f23c1a6e496ea0242f2c5", name : "images/panels/tutorial/tutorial_highlight_timer.png"},{ bytes : 27588, md5 : "76b9ddc2ca64f9430f59823e3b0f62bb", name : "images/panels/tutorial/tutorial_highlight_twotokens.png"},{ bytes : 33687, md5 : "6f7c4046d2af53408e321ce23fb244f4", name : "images/panels/tutorial/_tutorial_highlight_threetokens.png"},{ bytes : 29520, md5 : "923ca1f536fa6cec48f1dc7371f20bb7", name : "images/titles/textcontainer.png"},{ bytes : 5877, md5 : "a76abdf20d9d8d2aad8dadf5696cba92", name : "sounds/button02.mp3"},{ bytes : 6098, md5 : "6507b3d0531de29482e5a1a6ddb6c0a1", name : "sounds/button02.ogg"},{ bytes : 19629, md5 : "1e718e37a89a73e1e2621d15f66d9d62", name : "sounds/donnie_wpn_attack.mp3"},{ bytes : 33714, md5 : "a1a0421087ed704d4671b7c6d9f5eb46", name : "sounds/donnie_wpn_attack.ogg"},{ bytes : 19270, md5 : "df2d1f3220f4d27468b5336c2be724aa", name : "sounds/enm_appears.mp3"},{ bytes : 22549, md5 : "083cb11c179a19e68ee63064848e767d", name : "sounds/enm_appears.ogg"},{ bytes : 19225, md5 : "b9d7c2b2f96543415797c46c173fcf2c", name : "sounds/enm_footbot_comboAttack.mp3"},{ bytes : 26495, md5 : "3053573a9bfde14efae7ed8fe1f289f7", name : "sounds/enm_footbot_comboAttack.ogg"},{ bytes : 21732, md5 : "f95c76cefe669e34c400d0e632b83b6c", name : "sounds/enm_footbot_explosion.mp3"},{ bytes : 27911, md5 : "40c9cc5a566e036922c23cc63c846cac", name : "sounds/enm_footbot_explosion.ogg"},{ bytes : 23013, md5 : "9de83185298c22434bb1da73569cbf23", name : "sounds/enm_hitReceive.mp3"},{ bytes : 32855, md5 : "06000406d28ebe75cb7ffb3b6457f71a", name : "sounds/enm_hitReceive.ogg"},{ bytes : 20061, md5 : "598f5c0e38e49fe7a090aee546e83f40", name : "sounds/enm_kraang_comboAttack.mp3"},{ bytes : 29452, md5 : "9e1764802aac8febb2261eac418e9453", name : "sounds/enm_kraang_comboAttack.ogg"},{ bytes : 32181, md5 : "c2fecac685d44e0adb6bd3a377d33b0e", name : "sounds/enm_kraang_explosion.mp3"},{ bytes : 38019, md5 : "e656ff51ce147a1783c9722e291aec65", name : "sounds/enm_kraang_explosion.ogg"},{ bytes : 11310, md5 : "2c7cb4f3d2aca587d3aca0de20021921", name : "sounds/enm_kraang_specialAttack.mp3"},{ bytes : 11419, md5 : "b6b50bb9cb866c86d72831d65b226abf", name : "sounds/enm_kraang_specialAttack.ogg"},{ bytes : 19225, md5 : "58693d9a23d330a3c67710093798b64d", name : "sounds/enm_mouser_comboAttack.mp3"},{ bytes : 24683, md5 : "461c7abf716cc72361c1da78d7c8ef16", name : "sounds/enm_mouser_comboAttack.ogg"},{ bytes : 22568, md5 : "9e749f656510ead2e36cbf6e7a8bd822", name : "sounds/enm_mouser_explosion.mp3"},{ bytes : 29493, md5 : "568b138c110955605d1a60664f8ef6bd", name : "sounds/enm_mouser_explosion.ogg"},{ bytes : 19225, md5 : "b97a70dfa8e300231b7df16c99573f35", name : "sounds/enm_rahzar_comboAttack.mp3"},{ bytes : 23062, md5 : "2075fa057b4895c51b61d0be5cf73460", name : "sounds/enm_rahzar_comboAttack.ogg"},{ bytes : 39287, md5 : "86e58fe7c971eed882ce575e62ad40a8", name : "sounds/enm_rahzar_explosion.mp3"},{ bytes : 44614, md5 : "d1011cc331473f323f0420297f2b3fdb", name : "sounds/enm_rahzar_explosion.ogg"},{ bytes : 21759, md5 : "cfebfddc37720502f0f620b0d1abfd62", name : "sounds/enm_rahzar_specialAttack.mp3"},{ bytes : 19054, md5 : "3bb11424f858043e984c3600f5f9ac83", name : "sounds/enm_rahzar_specialAttack.ogg"},{ bytes : 19225, md5 : "6abea0d2fbb394f115603da1f2152db8", name : "sounds/enm_shredder_comboAttack.mp3"},{ bytes : 27345, md5 : "d14e26029fa4d1eb38c6e0b90e5c58bc", name : "sounds/enm_shredder_comboAttack.ogg"},{ bytes : 31346, md5 : "49dcf034d570ecd9d4fe70945dfcf44d", name : "sounds/enm_shredder_explosion.mp3"},{ bytes : 37828, md5 : "ce1526e2f52a8979821210b432fbeb57", name : "sounds/enm_shredder_explosion.ogg"},{ bytes : 19225, md5 : "5098a72c099df3fe6f85fd77751ad84d", name : "sounds/enm_snakeweed_comboAttack.mp3"},{ bytes : 27100, md5 : "e830c9d152a666b18aebece502606960", name : "sounds/enm_snakeweed_comboAttack.ogg"},{ bytes : 26330, md5 : "e1bff8f08d0825933e9dfdf81bd55dfa", name : "sounds/enm_snakeweed_explosion.mp3"},{ bytes : 31431, md5 : "8da9bafb82c6bf4aecd6164b5dd1e28d", name : "sounds/enm_snakeweed_explosion.ogg"},{ bytes : 19225, md5 : "f0bcf57aab34832d95afee195263f5bb", name : "sounds/enm_spiderbytez_comboAttack.mp3"},{ bytes : 28111, md5 : "71b68271233059e097fa7bc80c1992a6", name : "sounds/enm_spiderbytez_comboAttack.ogg"},{ bytes : 21732, md5 : "291c5f237b8e478c3f600c3ae9b2ae9b", name : "sounds/enm_spiderbytez_explosion.mp3"},{ bytes : 28575, md5 : "dfb62e926fab191c27f028406049e1e9", name : "sounds/enm_spiderbytez_explosion.ogg"},{ bytes : 17431, md5 : "30bc86ff4501630260b53eb000ce95be", name : "sounds/leo_wpn_attack.mp3"},{ bytes : 41625, md5 : "0ef0afa7ecaf231b7462a46ce1d51ead", name : "sounds/leo_wpn_attack.ogg"},{ bytes : 19631, md5 : "594e2905451c222fa4b101eec1974e35", name : "sounds/low_health.mp3"},{ bytes : 61216, md5 : "8bcf882ba5e11b8125eedf8d087a8877", name : "sounds/low_health.ogg"},{ bytes : 19625, md5 : "df8e6b438e048f96e4f7b8044cb70479", name : "sounds/mike_wpn_attack.mp3"},{ bytes : 34259, md5 : "0aba7fb923a75f63a5ac99be96726d40", name : "sounds/mike_wpn_attack.ogg"},{ bytes : 23390, md5 : "b557a168e9a933bedd772a3590b99bd2", name : "sounds/rapha_wpn_attack.mp3"},{ bytes : 34902, md5 : "b37b7c00dab4f62cca989be6a520082d", name : "sounds/rapha_wpn_attack.ogg"},{ bytes : 67547, md5 : "ccf074d4c50cbe995b2aa2f257ceb049", name : "sounds/tmnt_4attack.mp3"},{ bytes : 58088, md5 : "6e6dfabaf37487eb3314c03eb0d586cc", name : "sounds/tmnt_4attack.ogg"},{ bytes : 8904, md5 : "1c5e7ea941720ac76d4c9af2c5d72233", name : "sounds/tmnt_attack.mp3"},{ bytes : 15038, md5 : "9044f832f210323e911cce489be524d1", name : "sounds/tmnt_attack.ogg"},{ bytes : 11310, md5 : "0cbf00d3e9bc46b62fcc203333697ad2", name : "sounds/tmnt_health.mp3"},{ bytes : 10244, md5 : "814988614e69451d2ea1f782979b5427", name : "sounds/tmnt_health.ogg"},{ bytes : 4249, md5 : "0beb271de925ac68ecb40d78145fee22", name : "sounds/tmnt_jump.mp3"},{ bytes : 7801, md5 : "f84f00fc282c7c42dc6ba01931ae76fc", name : "sounds/tmnt_jump.ogg"},{ bytes : 10101, md5 : "9814f912b639ce2de0a31477f649ae81", name : "sounds/tmnt_land.mp3"},{ bytes : 13389, md5 : "7acf34e438144330283946e2eae0e5ef", name : "sounds/tmnt_land.ogg"},{ bytes : 466973, md5 : "4f86cd91d42f9b9460a4d528ff3f4808", name : "sounds/tmnt_theme.mp3"},{ bytes : 1720037, md5 : "0d7beb05084dfc6dd3b028b993f1457a", name : "sounds/tmnt_theme.ogg"},{ bytes : 9657, md5 : "32606906a285dde0acf7b9b1ee279eca", name : "sounds/tokens/scale/token01.mp3"},{ bytes : 7080, md5 : "7e4a065344c6889fc0b80260d24e2586", name : "sounds/tokens/scale/token01.ogg"},{ bytes : 9657, md5 : "0cc6f6a9bf79a4d2d9a6ef75551c8bdd", name : "sounds/tokens/scale/token02.mp3"},{ bytes : 7044, md5 : "86f91b2521235c5ba675ad0610fab8ee", name : "sounds/tokens/scale/token02.ogg"},{ bytes : 9657, md5 : "b45873acad47b6f47d26abdfcbd1168b", name : "sounds/tokens/scale/token03.mp3"},{ bytes : 7109, md5 : "91b7c0b55b35f919390626ca15f92863", name : "sounds/tokens/scale/token03.ogg"},{ bytes : 9657, md5 : "c070ff53ea2f3caa43b6f10dd7637405", name : "sounds/tokens/scale/token04.mp3"},{ bytes : 7247, md5 : "beab3a673e774c4ecb4643f10ab9c58d", name : "sounds/tokens/scale/token04.ogg"},{ bytes : 9657, md5 : "0db8ce226445f8c8ca2b605719066db6", name : "sounds/tokens/scale/token05.mp3"},{ bytes : 7182, md5 : "1e6ca0fe2dffd60ad9e71845399d7a4f", name : "sounds/tokens/scale/token05.ogg"},{ bytes : 9657, md5 : "5b370b9ddba48aac72b6c71ad1fffbef", name : "sounds/tokens/scale/token06.mp3"},{ bytes : 6836, md5 : "9eba2786aa043784316a3e583eb45a90", name : "sounds/tokens/scale/token06.ogg"},{ bytes : 9657, md5 : "4ab0926267e0cbf61e2c0386979143f9", name : "sounds/tokens/scale/token07.mp3"},{ bytes : 6760, md5 : "8611ecd3f0d889d347cce5ee5c4096bc", name : "sounds/tokens/scale/token07.ogg"},{ bytes : 9657, md5 : "a0cf26f5fe7201482f222cdf27db8f50", name : "sounds/tokens/scale/token08.mp3"},{ bytes : 6827, md5 : "2f9633f2ca58152ce883f0b95f5e11de", name : "sounds/tokens/scale/token08.ogg"},{ bytes : 9657, md5 : "0db241a181460f60ba0ecd773201f3c3", name : "sounds/tokens/scale/token09.mp3"},{ bytes : 6830, md5 : "50d1f1747e0192b276015de95c0fe665", name : "sounds/tokens/scale/token09.ogg"},{ bytes : 9657, md5 : "27cd807f14d91e2459790f504d3fa951", name : "sounds/tokens/scale/token10.mp3"},{ bytes : 6832, md5 : "1d8ae5c2ff4f4d8462167a1896d7dd6b", name : "sounds/tokens/scale/token10.ogg"},{ bytes : 8803, md5 : "6dd5e3b962aded139e36818fbd878839", name : "sounds/tokens/token_disappear.mp3"},{ bytes : 9424, md5 : "59f376b5e5f8630116d6c03b379dd91a", name : "sounds/tokens/token_disappear.ogg"},{ bytes : 13437, md5 : "e7a22c57ef6feea5951d3ae58b889b2d", name : "sounds/tokens/token_pizza.mp3"},{ bytes : 12461, md5 : "b7c4bf13514119adf0246508f812a656", name : "sounds/tokens/token_pizza.ogg"},{ bytes : 7583, md5 : "36651119d66d40eb3ad07818ea89b9cb", name : "sounds/tokens/token_splinter.mp3"},{ bytes : 9578, md5 : "d40dbbeded4276b7d029aadee8147bd7", name : "sounds/tokens/token_splinter.ogg"}], config : [{ bytes : 492, md5 : "975fd057d52c18edd1de0f666a389d5c", name : "Config.xml"},{ bytes : 2016, md5 : "5389adecea0ea119b67ca80714bc3d0d", name : "Credits.xml"},{ bytes : 13907, md5 : "2284722671b8423f71b56cd9c0b29dd7", name : "Localization.xml"}]}]}};
flambe.asset.Manifest._supportsCrossOrigin = (function() {
	var blacklist = new EReg("\\b(Android)\\b","");
	if(blacklist.match(js.Browser.window.navigator.userAgent)) return false;
	var xhr = new XMLHttpRequest();
	return xhr.withCredentials != null;
})();
flambe.display.Sprite._scratchPoint = new flambe.math.Point();
flambe.display.Font.NEWLINE = new flambe.display.Glyph(10);
flambe.platform.BasicMouse._sharedEvent = new flambe.input.MouseEvent();
flambe.platform.BasicPointer._sharedEvent = new flambe.input.PointerEvent();
flambe.platform.html.CanvasRenderer.CANVAS_TEXTURES = (function() {
	var pattern = new EReg("(iPhone|iPod|iPad)","");
	return pattern.match(js.Browser.window.navigator.userAgent);
})();
flambe.platform.html.HtmlAssetPackLoader._mediaRefCount = 0;
flambe.platform.html.HtmlAssetPackLoader._detectBlobSupport = true;
flambe.platform.html.HtmlUtil.VENDOR_PREFIXES = ["webkit","moz","ms","o","khtml"];
flambe.platform.html.HtmlUtil.SHOULD_HIDE_MOBILE_BROWSER = js.Browser.window.top == js.Browser.window && new EReg("Mobile(/.*)? Safari","").match(js.Browser.navigator.userAgent);
flambe.platform.html.WebAudioSound._detectSupport = true;
flambe.platform.html.WebGLGraphics._scratchMatrix = new flambe.math.Matrix();
globals.NDiGameConstants.CONFIG_ASSET_CONFIG_XML = "Config.xml";
globals.NDiGameConstants.CONFIG_ASSET_LOCALIZATION_XML = "Localization.xml";
globals.NDiGameConstants.CONFIG_ASSET_CREDITS_XML = "Credits.xml";
globals.NDiGameConstants.ASSET_PACKAGE_CONFIG = "config";
globals.NDiGameConstants.ASSET_PACKAGE_LOADING = "assets_loading";
globals.NDiGameConstants.ASSET_PACKAGE_GENERAL = "assets_general";
globals.NDiGameConstants.BACKGROUND_LOADING = "loading_bg";
globals.NDiGameConstants.BAR_LOADING = "loading_bar";
globals.NDiGameConstants.ICON_BAR_LOADING = "loading_icon";
globals.NDiGameConstants.GAMEPLAY_BUTTON_PAUSE = "images/buttons/pause_button";
globals.NDiGameConstants.GAMEPLAY_PAUSEMENU_BACKGROUND = "images/panels/pause/frame";
globals.NDiGameConstants.GAMEPLAY_PAUSEMENU_BUTTON_RESUME = "images/buttons/pause/resume";
globals.NDiGameConstants.GAMEPLAY_PAUSEMENU_BUTTON_HELP = "images/buttons/pause/help";
globals.NDiGameConstants.GAMEPLAY_PAUSEMENU_BUTTON_SOUND_ON = "images/buttons/pause/soundON";
globals.NDiGameConstants.GAMEPLAY_PAUSEMENU_BUTTON_SOUND_OFF = "images/buttons/pause/soundOFF";
globals.NDiGameConstants.GAMEPLAY_PAUSEMENU_BUTTON_QUIT = "images/buttons/pause/quit";
globals.NDiGameConstants.GAMEPLAY_RESULTS_HIGHSCORE_FRAME = "images/decorations/newtopscore";
globals.NDiGameConstants.GAMEPLAY_RESULTS_BACKGROUND = "images/backgrounds/resultsBG";
globals.NDiGameConstants.GAMEPLAY_RESULTS_BUTTON_REPLAY = "images/buttons/results/replay";
globals.NDiGameConstants.GAMEPLAY_RESULTS_TOP_SCORES = "images/panels/results/topscores";
globals.NDiGameConstants.POPUP_EXIT_BUTTON_YES = "images/buttons/popupExit/btn_accept";
globals.NDiGameConstants.POPUP_EXIT_BUTTON_NO = "images/buttons/popupExit/btn_cancel";
globals.NDiGameConstants.POPUP_EXIT_BACKGROUND = "images/panels/popupExit/popup_bg";
globals.NDiGameConstants.ENEMYLIFEBAR_BACKGROUND = "images/hud/barenemy_bg";
globals.NDiGameConstants.ENEMYLIFEBAR = "images/hud/barenemy_blood";
globals.NDiGameConstants.ENEMY_ICON = "images/hud/barenemy_icon";
globals.NDiGameConstants.GENERALENEMY_ICON = "images/hud/enemy_icons/barenemy_icon";
globals.NDiGameConstants.PLAYERLIFEBAR_BACKGROUND = "images/hud/barlife_bg";
globals.NDiGameConstants.PLAYERLIFEBAR = "images/hud/barlife_blood";
globals.NDiGameConstants.PLAYERLIFE_ICON = "images/hud/barlife_icon";
globals.NDiGameConstants.MAINMENU_BACKGROUND = "images/backgrounds/mainscreenBG";
globals.NDiGameConstants.CREDITS_BACKGROUND = "images/backgrounds/creditsBG";
globals.NDiGameConstants.SPLASHNDI_BACKGROUND = "images/backgrounds/NDi";
globals.NDiGameConstants.SPLASHNICK_BACKGROUND = "images/backgrounds/Nick";
globals.NDiGameConstants.HUD_SCORE_BACKGROUND = "images/hud/scoreEmpty";
globals.NDiGameConstants.PUZZLE_BACKGROUND = "images/hud/puzzle_container";
globals.NDiGameConstants.MAINMENU_BUTTON_SOUND = "images/buttons/mainscreen/btn_sound";
globals.NDiGameConstants.MAINMENU_BUTTON_SOUNDOFF = "images/buttons/mainscreen/btn_soundoff";
globals.NDiGameConstants.CREDITS_BUTTON_BACK = "images/buttons/credits/back";
globals.NDiGameConstants.CREDITS_TITLE = "images/decorations/creditsTitle";
globals.NDiGameConstants.ARRAY_TUTORIAL_TOKENS_STEP1 = [globals.NDiTypeToken.NDI_TYPE_TURTLE_MICHELANGELO,globals.NDiTypeToken.NDI_TYPE_TURTLE_RAPHAEL,globals.NDiTypeToken.NDI_TYPE_TURTLE_LEONARDO,globals.NDiTypeToken.NDI_TYPE_TURTLE_LEONARDO,globals.NDiTypeToken.NDI_TYPE_TURTLE_MICHELANGELO,globals.NDiTypeToken.NDI_TYPE_TURTLE_DONATELLO,globals.NDiTypeToken.NDI_TYPE_TURTLE_DONATELLO,globals.NDiTypeToken.NDI_TYPE_TURTLE_PIZZA,globals.NDiTypeToken.NDI_TYPE_TURTLE_MICHELANGELO,globals.NDiTypeToken.NDI_TYPE_TURTLE_RAPHAEL,globals.NDiTypeToken.NDI_TYPE_TURTLE_DONATELLO,globals.NDiTypeToken.NDI_TYPE_TURTLE_LEONARDO,globals.NDiTypeToken.NDI_TYPE_TURTLE_MICHELANGELO,globals.NDiTypeToken.NDI_TYPE_TURTLE_RAPHAEL,globals.NDiTypeToken.NDI_TYPE_TURTLE_DONATELLO,globals.NDiTypeToken.NDI_TYPE_TURTLE_LEONARDO,globals.NDiTypeToken.NDI_TYPE_TURTLE_MICHELANGELO,globals.NDiTypeToken.NDI_TYPE_TURTLE_RAPHAEL,globals.NDiTypeToken.NDI_TYPE_TURTLE_DONATELLO,globals.NDiTypeToken.NDI_TYPE_TURTLE_LEONARDO,globals.NDiTypeToken.NDI_TYPE_TURTLE_MICHELANGELO,globals.NDiTypeToken.NDI_TYPE_TURTLE_PIZZA,globals.NDiTypeToken.NDI_TYPE_TURTLE_DONATELLO,globals.NDiTypeToken.NDI_TYPE_TURTLE_LEONARDO,globals.NDiTypeToken.NDI_TYPE_TURTLE_MICHELANGELO,globals.NDiTypeToken.NDI_TYPE_TURTLE_RAPHAEL,globals.NDiTypeToken.NDI_TYPE_TURTLE_DONATELLO,globals.NDiTypeToken.NDI_TYPE_TURTLE_LEONARDO,globals.NDiTypeToken.NDI_TYPE_TURTLE_MICHELANGELO,globals.NDiTypeToken.NDI_TYPE_TURTLE_RAPHAEL,globals.NDiTypeToken.NDI_TYPE_TURTLE_RAPHAEL,globals.NDiTypeToken.NDI_TYPE_TURTLE_DONATELLO,globals.NDiTypeToken.NDI_TYPE_TURTLE_LEONARDO,globals.NDiTypeToken.NDI_TYPE_TURTLE_MICHELANGELO,globals.NDiTypeToken.NDI_TYPE_TURTLE_RAPHAEL,globals.NDiTypeToken.NDI_TYPE_TURTLE_DONATELLO];
globals.NDiGameConstants.ARRAY_TUTORIAL_TOKENS_STEP2 = [globals.NDiTypeToken.NDI_TYPE_TURTLE_MICHELANGELO,globals.NDiTypeToken.NDI_TYPE_TURTLE_RAPHAEL,globals.NDiTypeToken.NDI_TYPE_TURTLE_DONATELLO,globals.NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER,globals.NDiTypeToken.NDI_TYPE_TURTLE_MICHELANGELO,globals.NDiTypeToken.NDI_TYPE_TURTLE_DONATELLO,globals.NDiTypeToken.NDI_TYPE_TURTLE_DONATELLO,globals.NDiTypeToken.NDI_TYPE_TURTLE_PIZZA,globals.NDiTypeToken.NDI_TYPE_TURTLE_MICHELANGELO,globals.NDiTypeToken.NDI_TYPE_TURTLE_RAPHAEL,globals.NDiTypeToken.NDI_TYPE_TURTLE_DONATELLO,globals.NDiTypeToken.NDI_TYPE_TURTLE_LEONARDO,globals.NDiTypeToken.NDI_TYPE_TURTLE_MICHELANGELO,globals.NDiTypeToken.NDI_TYPE_TURTLE_RAPHAEL,globals.NDiTypeToken.NDI_TYPE_TURTLE_DONATELLO,globals.NDiTypeToken.NDI_TYPE_TURTLE_LEONARDO,globals.NDiTypeToken.NDI_TYPE_TURTLE_MICHELANGELO,globals.NDiTypeToken.NDI_TYPE_TURTLE_RAPHAEL,globals.NDiTypeToken.NDI_TYPE_TURTLE_DONATELLO,globals.NDiTypeToken.NDI_TYPE_TURTLE_LEONARDO,globals.NDiTypeToken.NDI_TYPE_TURTLE_MICHELANGELO,globals.NDiTypeToken.NDI_TYPE_TURTLE_PIZZA,globals.NDiTypeToken.NDI_TYPE_TURTLE_DONATELLO,globals.NDiTypeToken.NDI_TYPE_TURTLE_LEONARDO,globals.NDiTypeToken.NDI_TYPE_TURTLE_MICHELANGELO,globals.NDiTypeToken.NDI_TYPE_TURTLE_RAPHAEL,globals.NDiTypeToken.NDI_TYPE_TURTLE_DONATELLO,globals.NDiTypeToken.NDI_TYPE_TURTLE_LEONARDO,globals.NDiTypeToken.NDI_TYPE_TURTLE_MICHELANGELO,globals.NDiTypeToken.NDI_TYPE_TURTLE_RAPHAEL,globals.NDiTypeToken.NDI_TYPE_TURTLE_RAPHAEL,globals.NDiTypeToken.NDI_TYPE_TURTLE_DONATELLO,globals.NDiTypeToken.NDI_TYPE_TURTLE_LEONARDO,globals.NDiTypeToken.NDI_TYPE_TURTLE_MICHELANGELO,globals.NDiTypeToken.NDI_TYPE_TURTLE_RAPHAEL,globals.NDiTypeToken.NDI_TYPE_TURTLE_DONATELLO];
globals.NDiGameConstants.ARRAY_TUTORIAL_TEXTS = ["tutorial|text_step1","tutorial|text_step2","tutorial|text_step3"];
globals.NDiGameConstants.ARRAY_OBSTACLES_CONFIG = [[(function($this) {
	var $r;
	var _g = new haxe.ds.StringMap();
	_g.set("direction","x");
	_g.set("length",2);
	_g.set("position",new math.NDiVector2D(0,1));
	$r = _g;
	return $r;
}(this)),(function($this) {
	var $r;
	var _g1 = new haxe.ds.StringMap();
	_g1.set("direction","x");
	_g1.set("length",2);
	_g1.set("position",new math.NDiVector2D(4,1));
	$r = _g1;
	return $r;
}(this)),(function($this) {
	var $r;
	var _g2 = new haxe.ds.StringMap();
	_g2.set("direction","y");
	_g2.set("length",3);
	_g2.set("position",new math.NDiVector2D(3,3));
	$r = _g2;
	return $r;
}(this)),(function($this) {
	var $r;
	var _g3 = new haxe.ds.StringMap();
	_g3.set("direction","y");
	_g3.set("length",2);
	_g3.set("position",new math.NDiVector2D(5,4));
	$r = _g3;
	return $r;
}(this))],[(function($this) {
	var $r;
	var _g4 = new haxe.ds.StringMap();
	_g4.set("direction","x");
	_g4.set("length",4);
	_g4.set("position",new math.NDiVector2D(1,5));
	$r = _g4;
	return $r;
}(this)),(function($this) {
	var $r;
	var _g5 = new haxe.ds.StringMap();
	_g5.set("direction","y");
	_g5.set("length",4);
	_g5.set("position",new math.NDiVector2D(1,0));
	$r = _g5;
	return $r;
}(this)),(function($this) {
	var $r;
	var _g6 = new haxe.ds.StringMap();
	_g6.set("direction","x");
	_g6.set("length",3);
	_g6.set("position",new math.NDiVector2D(2,2));
	$r = _g6;
	return $r;
}(this)),(function($this) {
	var $r;
	var _g7 = new haxe.ds.StringMap();
	_g7.set("direction","y");
	_g7.set("length",2);
	_g7.set("position",new math.NDiVector2D(5,1));
	$r = _g7;
	return $r;
}(this))],[(function($this) {
	var $r;
	var _g8 = new haxe.ds.StringMap();
	_g8.set("direction","y");
	_g8.set("length",1);
	_g8.set("position",new math.NDiVector2D(2,0));
	$r = _g8;
	return $r;
}(this)),(function($this) {
	var $r;
	var _g9 = new haxe.ds.StringMap();
	_g9.set("direction","y");
	_g9.set("length",2);
	_g9.set("position",new math.NDiVector2D(5,0));
	$r = _g9;
	return $r;
}(this)),(function($this) {
	var $r;
	var _g10 = new haxe.ds.StringMap();
	_g10.set("direction","x");
	_g10.set("length",2);
	_g10.set("position",new math.NDiVector2D(0,2));
	$r = _g10;
	return $r;
}(this)),(function($this) {
	var $r;
	var _g11 = new haxe.ds.StringMap();
	_g11.set("direction","y");
	_g11.set("length",2);
	_g11.set("position",new math.NDiVector2D(2,2));
	$r = _g11;
	return $r;
}(this)),(function($this) {
	var $r;
	var _g12 = new haxe.ds.StringMap();
	_g12.set("direction","y");
	_g12.set("length",2);
	_g12.set("position",new math.NDiVector2D(3,3));
	$r = _g12;
	return $r;
}(this)),(function($this) {
	var $r;
	var _g13 = new haxe.ds.StringMap();
	_g13.set("direction","x");
	_g13.set("length",3);
	_g13.set("position",new math.NDiVector2D(1,5));
	$r = _g13;
	return $r;
}(this))]];
globals.NDiGameConstants.SPLASH_DURATION = 2000;
globals.NDiGameConstants.CREDITS_DURATION = 2000;
globals.NDiGameConstants.SCORE_VALUE_COLOR = 10;
globals.NDiGameConstants.SCORE_VALUE_PIZZA = 50;
globals.NDiGameConstants.SCORE_VALUE_SPLINTER = 100;
globals.NDiGameConstants.GAME_WIDTH = 960;
globals.NDiGameConstants.GAME_HEIGHT = 560;
globals.NDiGameConstants.LINE_THICKNESS = 8;
globals.NDiGameConstants.TOTAL_TOKENS_TYPE = "TOTAL_TOKENS";
globals.NDiGameConstants.TOTAL_TURTLES_TYPE = "TOTAL_TURTLES";
globals.NDiGameConstants.ATTACK_DMG = 2;
globals.NDiGameConstants.ATTACK_COEF = 1;
globals.NDiGameConstants.TOKENS_PROBABILITY = (function($this) {
	var $r;
	var _g = new haxe.ds.EnumValueMap();
	_g.set(globals.NDiTypeToken.NDI_TYPE_TURTLE_DONATELLO,0.20);
	_g.set(globals.NDiTypeToken.NDI_TYPE_TURTLE_RAPHAEL,0.20);
	_g.set(globals.NDiTypeToken.NDI_TYPE_TURTLE_MICHELANGELO,0.20);
	_g.set(globals.NDiTypeToken.NDI_TYPE_TURTLE_LEONARDO,0.20);
	_g.set(globals.NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER,0.10);
	_g.set(globals.NDiTypeToken.NDI_TYPE_TURTLE_PIZZA,0.10);
	$r = _g;
	return $r;
}(this));
globals.NDiGameConstants.TOKENS_WIDTH = 72;
globals.NDiGameConstants.TOKENS_HEIGHT = 72;
globals.NDiGameConstants.TOKENS_DISTANCE = 8;
globals.NDiGameConstants.PACK_ANIMATIONS_TOKENS = "images/animations/tmnt_tokens";
globals.NDiGameConstants.PACK_SMOKE_ANIMATION = "images/animations/tmnt_smoke";
globals.NDiGameConstants.NAME_SMOKE_ANIMATION = "vfx_smoke_anim";
globals.NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN = Type.allEnums(globals.NDiTypeToken);
globals.NDiGameConstants.ARRAY_PREFIX_ANIMATION_TOKEN = ["tk_don_","tk_rapha_","tk_mike_","tk_leo_","tk_splinter_","tk_pizza_","tk_unknow_"];
globals.NDiGameConstants.SPRITE_COBWEB = "images/panels/tokens/web";
globals.NDiGameConstants.ARRAY_COLOR_TOKEN = [11360227,15351101,15965214,958683,9671571,16773120];
globals.NDiGameConstants.HEALTH_PARTICLES_PACK = "images/animations/turtles/health_particles";
globals.NDiGameConstants.HEALTH_PARTICLES_ANIMATION = "health_anim";
globals.NDiGameConstants.ARRAY_TYPE_TURTLES = [globals.NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[1],globals.NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[2],globals.NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[3],globals.NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[4]];
globals.NDiGameConstants.PACK_ANIMATIONS_TURTLES = "images/animations/turtles/animationsTurtlesHUD";
globals.NDiGameConstants.ARRAY_ANIMATION_PREFIX_TURTLES = ["donnie","rapha","mike","leo"];
globals.NDiGameConstants.ARRAY_X_POSITION_TURTLES = [60,154,293,417];
globals.NDiGameConstants.PACK_ANIMATIONS_ATTACK_TURTLES = "images/animations/turtles/animationsTurtlesAttacksHUD";
globals.NDiGameConstants.ARRAY_POSITIONS_ANIMATIONS_ATTACK = [new math.NDiVector2D(300,25),new math.NDiVector2D(295,25),new math.NDiVector2D(195,185),new math.NDiVector2D(200,190)];
globals.NDiGameConstants.ARRAY_APPEAR_ORDER_ANIMATIONS = [globals.NDiTypeToken.NDI_TYPE_TURTLE_MICHELANGELO,globals.NDiTypeToken.NDI_TYPE_TURTLE_RAPHAEL,globals.NDiTypeToken.NDI_TYPE_TURTLE_DONATELLO,globals.NDiTypeToken.NDI_TYPE_TURTLE_LEONARDO];
globals.NDiGameConstants.ARRAY_ENUM_TYPE_ENEMIES = Type.allEnums(globals.NDiTypeEnemy);
globals.NDiGameConstants.ARRAY_PACK_ANIMATIONS_ENEMIES = ["images/animations/enemies/Mouser","images/animations/enemies/footBot","images/animations/enemies/Kraang","images/animations/enemies/Rahzar","images/animations/enemies/Snakeweed","images/animations/enemies/Spiderbytez","images/animations/enemies/Shredder"];
globals.NDiGameConstants.ARRAY_ANIMATION_PREFIX_ENEMIES = ["enm_mouser","enm_footbot","enm_kraang","enm_rahzar","enm_snakeweed","enm_spiderbytez","enm_shredder"];
globals.NDiGameConstants.COMBOATTACK_POSITIONS_OFFSET = (function($this) {
	var $r;
	var _g = new haxe.ds.EnumValueMap();
	_g.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_MOUSER,new math.NDiVector2D(0,180));
	_g.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_FOOTBOT,new math.NDiVector2D(-50,10));
	_g.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_KRANG,new math.NDiVector2D(-20,10));
	_g.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_RAHZAR,new math.NDiVector2D(-20,10));
	_g.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SNAKEWEED,new math.NDiVector2D(-20,10));
	_g.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SPIDERBYTEZ,new math.NDiVector2D(-20,10));
	_g.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SHREDDER,new math.NDiVector2D(-20,10));
	$r = _g;
	return $r;
}(this));
globals.NDiGameConstants.ARRAY_POSITIONS_MOUSERS = [new math.NDiVector2D(globals.NDiGameConstants.GAME_WIDTH * 0.25,globals.NDiGameConstants.GAME_HEIGHT * 0.5 - 105),new math.NDiVector2D(90,145),new math.NDiVector2D(-90,145),new math.NDiVector2D(145,0),new math.NDiVector2D(-130,0)];
globals.NDiGameConstants.WEED_ANIMATION_PACK = "images/animations/enemies/weed";
globals.NDiGameConstants.WEED_ANIMATION_PREFIX = "weed_trap";
globals.NDiGameConstants.MUSIC_TMNT = "sounds/tmnt_theme";
globals.NDiGameConstants.SOUND_TOKEN_PIZZA = "sounds/tokens/token_pizza";
globals.NDiGameConstants.SOUND_TOKEN_SPLINTER = "sounds/tokens/token_splinter";
globals.NDiGameConstants.SOUND_TOKEN_DISAPPEAR = "sounds/tokens/token_disappear";
globals.NDiGameConstants.SOUND_TMNT_LOW_HEALTH = "sounds/low_health";
globals.NDiGameConstants.SOUND_TMNT_ATTACK = "sounds/tmnt_attack";
globals.NDiGameConstants.SOUND_TMNT_ATTACK2 = "sounds/tmnt_4attack";
globals.NDiGameConstants.SOUND_TMNT_JUMP = "sounds/tmnt_jump";
globals.NDiGameConstants.SOUND_TMNT_HEALTH = "sounds/tmnt_health";
globals.NDiGameConstants.SOUND_TMNT_FALL = "sounds/tmnt_land";
globals.NDiGameConstants.SOUND_TMNT_WEAPON_POSTFIX = "_wpn_attack";
globals.NDiGameConstants.SOUND_TMNT_WEAPON_FOLDER = "sounds/";
globals.NDiGameConstants.SOUND_PATH_ENEMY_EXPLOSION = "sounds/";
globals.NDiGameConstants.SOUND_ENEMY_APPEAR = "sounds/enm_appears";
globals.NDiGameConstants.SOUND_ENEMY_COMBOATTACK_POSTFIX = "_comboAttack";
globals.NDiGameConstants.SOUND_ENEMY_COMBOATTACK_FOLDER = "sounds/";
globals.NDiGameConstants.SOUND_ENEMY_SPECIALATTACK_POSTFIX = "_specialAttack";
globals.NDiGameConstants.SOUND_ENEMY_SPECIALATTACK_FOLDER = "sounds/";
globals.NDiGameConstants.ARRAY_SOUND_TOKENS = ["sounds/tokens/scale/token01","sounds/tokens/scale/token02","sounds/tokens/scale/token03","sounds/tokens/scale/token04","sounds/tokens/scale/token05","sounds/tokens/scale/token06","sounds/tokens/scale/token07","sounds/tokens/scale/token08","sounds/tokens/scale/token09","sounds/tokens/scale/token10"];
globals.NDiGameConstants.ARRAY_VARS_TO_SAVE = Type.allEnums(globals.NDiVarsToSave);
globals.NDiGameConstants.ARRAY_VARS_INIT_VALUES = [0,0,0,true,true];
globals.NDiGameConstants.RANGE_ARRAY = [0,4,8,13,19,24];
globals.NDiGameConstants.PERCENT_WEIGHT_ENEMY_ARRAY = [(function($this) {
	var $r;
	var _g = new haxe.ds.EnumValueMap();
	_g.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_MOUSER,0.9);
	_g.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_FOOTBOT,1.0);
	$r = _g;
	return $r;
}(this)),(function($this) {
	var $r;
	var _g1 = new haxe.ds.EnumValueMap();
	_g1.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_MOUSER,0.20);
	_g1.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_FOOTBOT,0.60);
	_g1.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SPIDERBYTEZ,1.0);
	$r = _g1;
	return $r;
}(this)),(function($this) {
	var $r;
	var _g2 = new haxe.ds.EnumValueMap();
	_g2.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_MOUSER,0.10);
	_g2.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_FOOTBOT,0.30);
	_g2.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SPIDERBYTEZ,0.50);
	_g2.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SNAKEWEED,0.75);
	_g2.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_RAHZAR,1.0);
	$r = _g2;
	return $r;
}(this)),(function($this) {
	var $r;
	var _g3 = new haxe.ds.EnumValueMap();
	_g3.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_MOUSER,0.10);
	_g3.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_FOOTBOT,0.20);
	_g3.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SPIDERBYTEZ,0.30);
	_g3.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SNAKEWEED,0.55);
	_g3.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_RAHZAR,0.70);
	_g3.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_KRANG,1.0);
	$r = _g3;
	return $r;
}(this)),(function($this) {
	var $r;
	var _g4 = new haxe.ds.EnumValueMap();
	_g4.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_MOUSER,0.10);
	_g4.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_FOOTBOT,0.20);
	_g4.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SPIDERBYTEZ,0.30);
	_g4.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SNAKEWEED,0.40);
	_g4.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_RAHZAR,0.70);
	_g4.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_KRANG,1.0);
	$r = _g4;
	return $r;
}(this)),(function($this) {
	var $r;
	var _g5 = new haxe.ds.EnumValueMap();
	_g5.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_MOUSER,0.10);
	_g5.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_FOOTBOT,0.20);
	_g5.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SPIDERBYTEZ,0.30);
	_g5.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SNAKEWEED,0.40);
	_g5.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_RAHZAR,0.55);
	_g5.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_KRANG,0.75);
	_g5.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SHREDDER,1.0);
	$r = _g5;
	return $r;
}(this)),(function($this) {
	var $r;
	var _g6 = new haxe.ds.EnumValueMap();
	_g6.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_MOUSER,0.10);
	_g6.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_FOOTBOT,0.25);
	_g6.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SPIDERBYTEZ,0.40);
	_g6.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SNAKEWEED,0.55);
	_g6.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_RAHZAR,0.70);
	_g6.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_KRANG,0.85);
	_g6.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SHREDDER,1.0);
	$r = _g6;
	return $r;
}(this))];
globals.NDiGameConstants.CONFIG_VARS_ENEMY_ARRAY = [(function($this) {
	var $r;
	var _g = new haxe.ds.EnumValueMap();
	_g.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_MOUSER,(function($this) {
		var $r;
		var _g1 = new haxe.ds.StringMap();
		_g1.set("hitPoints",50);
		_g1.set("damage",10);
		_g1.set("time",20);
		_g1.set("param1",3);
		$r = _g1;
		return $r;
	}($this)));
	_g.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_FOOTBOT,(function($this) {
		var $r;
		var _g2 = new haxe.ds.StringMap();
		_g2.set("hitPoints",60);
		_g2.set("damage",15);
		_g2.set("time",15);
		_g2.set("param1",0);
		$r = _g2;
		return $r;
	}($this)));
	$r = _g;
	return $r;
}(this)),(function($this) {
	var $r;
	var _g3 = new haxe.ds.EnumValueMap();
	_g3.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_MOUSER,(function($this) {
		var $r;
		var _g4 = new haxe.ds.StringMap();
		_g4.set("hitPoints",50);
		_g4.set("damage",10);
		_g4.set("time",20);
		_g4.set("param1",3);
		$r = _g4;
		return $r;
	}($this)));
	_g3.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_FOOTBOT,(function($this) {
		var $r;
		var _g5 = new haxe.ds.StringMap();
		_g5.set("hitPoints",60);
		_g5.set("damage",15);
		_g5.set("time",15);
		_g5.set("param1",0);
		$r = _g5;
		return $r;
	}($this)));
	_g3.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SPIDERBYTEZ,(function($this) {
		var $r;
		var _g6 = new haxe.ds.StringMap();
		_g6.set("hitPoints",70);
		_g6.set("damage",15);
		_g6.set("time",20);
		_g6.set("param1",5);
		$r = _g6;
		return $r;
	}($this)));
	$r = _g3;
	return $r;
}(this)),(function($this) {
	var $r;
	var _g7 = new haxe.ds.EnumValueMap();
	_g7.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_MOUSER,(function($this) {
		var $r;
		var _g8 = new haxe.ds.StringMap();
		_g8.set("hitPoints",50);
		_g8.set("damage",10);
		_g8.set("time",20);
		_g8.set("param1",4);
		$r = _g8;
		return $r;
	}($this)));
	_g7.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_FOOTBOT,(function($this) {
		var $r;
		var _g9 = new haxe.ds.StringMap();
		_g9.set("hitPoints",60);
		_g9.set("damage",15);
		_g9.set("time",12);
		_g9.set("param1",3);
		$r = _g9;
		return $r;
	}($this)));
	_g7.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SPIDERBYTEZ,(function($this) {
		var $r;
		var _g10 = new haxe.ds.StringMap();
		_g10.set("hitPoints",70);
		_g10.set("damage",15);
		_g10.set("time",15);
		_g10.set("param1",5);
		$r = _g10;
		return $r;
	}($this)));
	_g7.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SNAKEWEED,(function($this) {
		var $r;
		var _g11 = new haxe.ds.StringMap();
		_g11.set("hitPoints",70);
		_g11.set("damage",15);
		_g11.set("time",12);
		_g11.set("param1",1);
		_g11.set("param2",3);
		$r = _g11;
		return $r;
	}($this)));
	_g7.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_RAHZAR,(function($this) {
		var $r;
		var _g12 = new haxe.ds.StringMap();
		_g12.set("hitPoints",70);
		_g12.set("damage",15);
		_g12.set("time",15);
		$r = _g12;
		return $r;
	}($this)));
	$r = _g7;
	return $r;
}(this)),(function($this) {
	var $r;
	var _g13 = new haxe.ds.EnumValueMap();
	_g13.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_MOUSER,(function($this) {
		var $r;
		var _g14 = new haxe.ds.StringMap();
		_g14.set("hitPoints",50);
		_g14.set("damage",10);
		_g14.set("time",20);
		_g14.set("param1",4);
		$r = _g14;
		return $r;
	}($this)));
	_g13.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_FOOTBOT,(function($this) {
		var $r;
		var _g15 = new haxe.ds.StringMap();
		_g15.set("hitPoints",60);
		_g15.set("damage",15);
		_g15.set("time",12);
		_g15.set("param1",3);
		$r = _g15;
		return $r;
	}($this)));
	_g13.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SPIDERBYTEZ,(function($this) {
		var $r;
		var _g16 = new haxe.ds.StringMap();
		_g16.set("hitPoints",70);
		_g16.set("damage",15);
		_g16.set("time",15);
		_g16.set("param1",7);
		$r = _g16;
		return $r;
	}($this)));
	_g13.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SNAKEWEED,(function($this) {
		var $r;
		var _g17 = new haxe.ds.StringMap();
		_g17.set("hitPoints",70);
		_g17.set("damage",15);
		_g17.set("time",12);
		_g17.set("param1",2);
		_g17.set("param2",3);
		$r = _g17;
		return $r;
	}($this)));
	_g13.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_RAHZAR,(function($this) {
		var $r;
		var _g18 = new haxe.ds.StringMap();
		_g18.set("hitPoints",80);
		_g18.set("damage",20);
		_g18.set("time",15);
		$r = _g18;
		return $r;
	}($this)));
	_g13.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_KRANG,(function($this) {
		var $r;
		var _g19 = new haxe.ds.StringMap();
		_g19.set("hitPoints",80);
		_g19.set("damage",20);
		_g19.set("time",15);
		$r = _g19;
		return $r;
	}($this)));
	$r = _g13;
	return $r;
}(this)),(function($this) {
	var $r;
	var _g20 = new haxe.ds.EnumValueMap();
	_g20.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_MOUSER,(function($this) {
		var $r;
		var _g21 = new haxe.ds.StringMap();
		_g21.set("hitPoints",50);
		_g21.set("damage",10);
		_g21.set("time",20);
		_g21.set("param1",4);
		$r = _g21;
		return $r;
	}($this)));
	_g20.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_FOOTBOT,(function($this) {
		var $r;
		var _g22 = new haxe.ds.StringMap();
		_g22.set("hitPoints",60);
		_g22.set("damage",15);
		_g22.set("time",12);
		_g22.set("param1",3);
		$r = _g22;
		return $r;
	}($this)));
	_g20.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SPIDERBYTEZ,(function($this) {
		var $r;
		var _g23 = new haxe.ds.StringMap();
		_g23.set("hitPoints",70);
		_g23.set("damage",15);
		_g23.set("time",15);
		_g23.set("param1",7);
		$r = _g23;
		return $r;
	}($this)));
	_g20.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SNAKEWEED,(function($this) {
		var $r;
		var _g24 = new haxe.ds.StringMap();
		_g24.set("hitPoints",70);
		_g24.set("damage",15);
		_g24.set("time",12);
		_g24.set("param1",2);
		_g24.set("param2",3);
		$r = _g24;
		return $r;
	}($this)));
	_g20.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_RAHZAR,(function($this) {
		var $r;
		var _g25 = new haxe.ds.StringMap();
		_g25.set("hitPoints",80);
		_g25.set("damage",20);
		_g25.set("time",15);
		$r = _g25;
		return $r;
	}($this)));
	_g20.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_KRANG,(function($this) {
		var $r;
		var _g26 = new haxe.ds.StringMap();
		_g26.set("hitPoints",100);
		_g26.set("damage",15);
		_g26.set("time",12);
		$r = _g26;
		return $r;
	}($this)));
	$r = _g20;
	return $r;
}(this)),(function($this) {
	var $r;
	var _g27 = new haxe.ds.EnumValueMap();
	_g27.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_MOUSER,(function($this) {
		var $r;
		var _g28 = new haxe.ds.StringMap();
		_g28.set("hitPoints",50);
		_g28.set("damage",10);
		_g28.set("time",10);
		_g28.set("param1",4);
		$r = _g28;
		return $r;
	}($this)));
	_g27.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_FOOTBOT,(function($this) {
		var $r;
		var _g29 = new haxe.ds.StringMap();
		_g29.set("hitPoints",60);
		_g29.set("damage",15);
		_g29.set("time",10);
		_g29.set("param1",2);
		$r = _g29;
		return $r;
	}($this)));
	_g27.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SPIDERBYTEZ,(function($this) {
		var $r;
		var _g30 = new haxe.ds.StringMap();
		_g30.set("hitPoints",70);
		_g30.set("damage",15);
		_g30.set("time",10);
		_g30.set("param1",8);
		$r = _g30;
		return $r;
	}($this)));
	_g27.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SNAKEWEED,(function($this) {
		var $r;
		var _g31 = new haxe.ds.StringMap();
		_g31.set("hitPoints",70);
		_g31.set("damage",15);
		_g31.set("time",10);
		_g31.set("param1",2);
		_g31.set("param2",3);
		$r = _g31;
		return $r;
	}($this)));
	_g27.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_RAHZAR,(function($this) {
		var $r;
		var _g32 = new haxe.ds.StringMap();
		_g32.set("hitPoints",80);
		_g32.set("damage",20);
		_g32.set("time",10);
		$r = _g32;
		return $r;
	}($this)));
	_g27.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_KRANG,(function($this) {
		var $r;
		var _g33 = new haxe.ds.StringMap();
		_g33.set("hitPoints",100);
		_g33.set("damage",15);
		_g33.set("time",10);
		$r = _g33;
		return $r;
	}($this)));
	_g27.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SHREDDER,(function($this) {
		var $r;
		var _g34 = new haxe.ds.StringMap();
		_g34.set("hitPoints",120);
		_g34.set("damage",15);
		_g34.set("time",8);
		_g34.set("param1",3);
		$r = _g34;
		return $r;
	}($this)));
	$r = _g27;
	return $r;
}(this)),(function($this) {
	var $r;
	var _g35 = new haxe.ds.EnumValueMap();
	_g35.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_MOUSER,(function($this) {
		var $r;
		var _g36 = new haxe.ds.StringMap();
		_g36.set("hitPoints",65);
		_g36.set("damage",15);
		_g36.set("time",7);
		_g36.set("param1",5);
		$r = _g36;
		return $r;
	}($this)));
	_g35.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_FOOTBOT,(function($this) {
		var $r;
		var _g37 = new haxe.ds.StringMap();
		_g37.set("hitPoints",75);
		_g37.set("damage",20);
		_g37.set("time",7);
		_g37.set("param1",3);
		$r = _g37;
		return $r;
	}($this)));
	_g35.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SPIDERBYTEZ,(function($this) {
		var $r;
		var _g38 = new haxe.ds.StringMap();
		_g38.set("hitPoints",80);
		_g38.set("damage",20);
		_g38.set("time",7);
		_g38.set("param1",9);
		$r = _g38;
		return $r;
	}($this)));
	_g35.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SNAKEWEED,(function($this) {
		var $r;
		var _g39 = new haxe.ds.StringMap();
		_g39.set("hitPoints",80);
		_g39.set("damage",20);
		_g39.set("time",7);
		_g39.set("param1",2);
		_g39.set("param2",4);
		$r = _g39;
		return $r;
	}($this)));
	_g35.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_RAHZAR,(function($this) {
		var $r;
		var _g40 = new haxe.ds.StringMap();
		_g40.set("hitPoints",90);
		_g40.set("damage",30);
		_g40.set("time",7);
		$r = _g40;
		return $r;
	}($this)));
	_g35.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_KRANG,(function($this) {
		var $r;
		var _g41 = new haxe.ds.StringMap();
		_g41.set("hitPoints",110);
		_g41.set("damage",20);
		_g41.set("time",7);
		$r = _g41;
		return $r;
	}($this)));
	_g35.set(globals.NDiTypeEnemy.NDI_TYPE_ENEMY_SHREDDER,(function($this) {
		var $r;
		var _g42 = new haxe.ds.StringMap();
		_g42.set("hitPoints",130);
		_g42.set("damage",20);
		_g42.set("time",7);
		_g42.set("param1",4);
		$r = _g42;
		return $r;
	}($this)));
	$r = _g35;
	return $r;
}(this))];
haxe.Serializer.USE_CACHE = false;
haxe.Serializer.USE_ENUM_INDEX = false;
haxe.Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.Unserializer.DEFAULT_RESOLVER = Type;
haxe.Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.ds.ObjectMap.count = 0;
haxe.xml.Parser.escapes = (function($this) {
	var $r;
	var h = new haxe.ds.StringMap();
	h.set("lt","<");
	h.set("gt",">");
	h.set("amp","&");
	h.set("quot","\"");
	h.set("apos","'");
	h.set("nbsp",String.fromCharCode(160));
	$r = h;
	return $r;
}(this));
math.NDiMath.TO_DEGREE = 180 / Math.PI;
Main.main();
})();
