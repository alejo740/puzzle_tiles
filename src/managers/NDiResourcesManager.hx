package managers;

import flambe.asset.File;
import flambe.display.Font;
import flambe.display.ImageSprite;
import flambe.display.TextSprite;
import flambe.display.Texture;
import flambe.Entity;
import flambe.sound.Sound;
import flambe.swf.Library;
import flambe.swf.MoviePlayer;
import globals.NDiGameConstants;
import scenes.NDiAbstractScene;
import flambe.scene.Director;
import flambe.System;
import flambe.asset.AssetPack;
import flambe.asset.Manifest;
import util.JSEmbedProxy;

class NDiResourcesManager
{
	private static var instance:NDiResourcesManager;
	
	public var loadedAssetPacks:Map<String, AssetPack>;
	public var loadedCache:Map<String, Dynamic>;
	
    private function new()
    {
    	this.loadedAssetPacks = new Map<String, AssetPack>();
		this.loadedCache = new Map<String, Dynamic>();
    }
    
    public function loadAssetPack(assetName:String, progressFunction:Float->Void, completeFunction:AssetPack->Void):Void
    {
    	if(!this.loadedAssetPacks.exists(assetName))
    	{
			var keyStr:String = ".com";
			
    		var manifest:Manifest = Manifest.build(assetName);			
			var base : String = ""; 
			#if js 
				base = JSEmbedProxy.base; 
			#end
			
			if (base != "") { 
				manifest.externalBasePath = base + "assets/"; 
				manifest.relativeBasePath = manifest.externalBasePath.substring(manifest.externalBasePath.indexOf(keyStr) + keyStr.length);
			} //Then load this manifest. Do not load assets pack before you set the base path			
			
			#if js
				trace(base);
				trace(manifest.externalBasePath);
				trace(manifest.relativeBasePath);
			#end
    	
        	var loader = System.loadAssetPack(manifest);
        
        	loader.progressChanged.connect
        	(
        		function() 
        		{
            		var ratio = loader.progress / loader.total;
            	
            		if(progressFunction != null)
            		{
            			progressFunction(ratio);
            		}
        		}
        	);
        
        	loader.get
        	(
        		function(pack:AssetPack)
        		{
        			this.loadedAssetPacks.set(assetName, pack);
        			
        			if(completeFunction != null)
            		{
            			completeFunction(pack);
            		}
        		}
        	);
    	}
    	else
    	{
    		if(completeFunction != null)
            {
    			completeFunction(this.loadedAssetPacks.get(assetName));
            }
    	}
    }
	
	public function loadFont(packName:String, path:String):Font
	{
		var mapCache:Map<String, Dynamic> = NDiResourcesManager.getInstance().loadedCache;
		var key:String = packName + "_" + path;
		
		if (mapCache.exists(key))
		{
			return cast(mapCache.get(key), Font);
		}else {
			var pack:AssetPack = NDiResourcesManager.getInstance().loadedAssetPacks.get(packName);
			var font:Font = new Font(pack, path); 
			mapCache.set(key, font);
			return font;
		}
		
	}
	
	public function loadImage(packName:String, path:String):Texture
	{
		var mapCache:Map<String, Dynamic> = NDiResourcesManager.getInstance().loadedCache;
		var key:String = packName + "_" + path;
		
		if (mapCache.exists(key))
		{
			//trace("CACHEE "+key);
			return cast(mapCache.get(key), Texture);
		}else {
			var pack:AssetPack = NDiResourcesManager.getInstance().loadedAssetPacks.get(packName);
			var texture:Texture = pack.getTexture(path);
			//trace("NEW - TO CACHEE "+key);
			mapCache.set(key, texture);
			return texture;		
		}	
	}
	
	public function loadXML(packName:String, path:String):String
    {
		var pack:AssetPack = NDiResourcesManager.getInstance().loadedAssetPacks.get(packName);
		var textFile:File = pack.getFile(path);
		
        var xmlString:String = textFile.toString();
        return xmlString;
    }
	
	public function loadSetAnimations(packName:String, path:String):Library
	{
		var mapCache:Map<String, Dynamic> = NDiResourcesManager.getInstance().loadedCache;
		var key:String = packName + "_" + path;
		
		if (mapCache.exists(key))
		{
			return cast(mapCache.get(key), Library);			
		}else {
			var pack:AssetPack = NDiResourcesManager.getInstance().loadedAssetPacks.get(packName);
			var library:Library = new Library(pack, path);		
			mapCache.set(key, library);
			return library;
		}
	}
	
	public function loadSound(packName:String, path:String):Sound
	{
		var mapCache:Map<String, Dynamic> = NDiResourcesManager.getInstance().loadedCache;
		var key:String = packName + "_" + path;
		
		if (mapCache.exists(key))
		{
			return cast(mapCache.get(key), Sound);
		}else {
			var pack:AssetPack = NDiResourcesManager.getInstance().loadedAssetPacks.get(packName);
			var sound:Sound = pack.getSound(path);
			mapCache.set(key, sound);
			return sound;
		}
	}
	
	public static function addGenericText(msg:String, posX:Float, posY:Float, scale:Float, fontName:String, align:TextAlign):TextSprite
	{
		var font:Font = NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, fontName);
		var titleLabel:TextSprite = new TextSprite(font, "");
		titleLabel.align = align;
		titleLabel.x._ =  posX;
		titleLabel.y._ =  posY;
		titleLabel.text = msg;		
		titleLabel.disablePointer();
		titleLabel.setScale(scale);
		/*
		if (parent == null) 
		{
			//this.owner.addChild(new Entity().add(titleLabel));			
			//new Entity().add(titleLabel);
		} 
		else 
		{
			//parent.addChild(new Entity().add(titleLabel));			
		}*/
		return titleLabel;
	}
	
	public function getRangeOfRound(round:Int):Int
	{
		for (i in 0...NDiGameConstants.RANGE_ARRAY.length)
		{
			if (round <= NDiGameConstants.RANGE_ARRAY[i])
			{
				return i;
			}
		}
		return NDiGameConstants.RANGE_ARRAY.length-1;
	}
	
    /*
	 * STATIC METHODS
	 */
    public static function initInstance():Void
    {
    	if(NDiResourcesManager.instance == null)
    	{
    		NDiResourcesManager.instance = new NDiResourcesManager();
    	}
    }
    
    public static function getInstance():NDiResourcesManager
    {
    	return NDiResourcesManager.instance;
    }

	
}
