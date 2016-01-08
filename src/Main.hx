import flambe.asset.Manifest;
import flambe.debug.FpsDisplay;
import flambe.display.EmitterMold;
import flambe.display.FillSprite;
import flambe.display.Font;
import flambe.display.Sprite;
import flambe.display.TextSprite;
import flambe.Entity;
import globals.NDiGameConstants;
import globals.NDiGameGlobals;
import managers.NDiAudioManager;
import managers.NDiSceneManager;
import managers.NDiResourcesManager;
import managers.NDiLocalizationManager;
import flambe.System;
import flambe.asset.AssetPack;
import util.NDiSaveData;

class Main
{
	public static function onLoadConfigAssets(pack:AssetPack):Void
	{
		NDiGameGlobals.getInstance().initGlobalConfigData();
		NDiLocalizationManager.getInstance().initLocalizationData();

		// Load loading assets.
        NDiResourcesManager.getInstance().loadAssetPack(NDiGameConstants.ASSET_PACKAGE_LOADING, null, Main.onLoadInitialAssets);
	}

	public static function onLoadInitialAssets(pack:AssetPack):Void
	{
		//Display current FPS
		//displayFPS();
		
		/*Loading Scene*/
		NDiSceneManager.getInstance().changeScene(NDI_TYPE_SCENE_MAINMENU);
		//NDiSceneManager.getInstance().changeScene(NDI_TYPE_SCENE_INTRO);
	}
	
    private static function main()
    {
        // Wind up all platform-specific stuff!
        System.init();
		//this.setPathForAssets();
		//setBackground();
		
        // Init singletons.
		NDiSaveData.initInstance();
		
        NDiGameGlobals.initInstance();
        NDiSceneManager.initInstance();
        NDiResourcesManager.initInstance();
		NDiAudioManager.initInstance();
		NDiLocalizationManager.initInstance();
		
		
        // Load initial assets.
        NDiResourcesManager.getInstance().loadAssetPack(NDiGameConstants.ASSET_PACKAGE_CONFIG, null, Main.onLoadConfigAssets);
    }
	/*
	private static function setPathForAssets()
	{
		var manifest : Manifest = Manifest.build("bootstrap"); 
		var base : String = ""; 
		#if js 
			base = JSEmbedProxy.base; 
		#end
		
		if (base != "") { 
			manifest.externalBasePath = base + "assets/"; 
		} //Then load this manifest. Do not load assets pack before you set the base path
		
	}*/
	
	private static function displayFPS()
	{
		//var font:Font = new Font(pack, "Giddyup");
		var font:Font = NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_LOADING, "arial");
		var textSp:TextSprite = new TextSprite(font);
		textSp.align = TextAlign.Right;
		textSp.x._ = System.stage.width-textSp.getNaturalWidth();
		textSp.y._ = System.stage.height-textSp.getNaturalHeight();
		var fpsMeterEntity = new Entity().add(textSp).add(new FpsDisplay());
		System.root.addChild(fpsMeterEntity);
	}
	
	private static function setBackground():Void
	{
		var sprite:Sprite = new FillSprite(0x333333, System.stage.width, System.stage.height);
		sprite.centerAnchor();
		sprite.x._ = System.stage.width / 2;
		sprite.y._ = System.stage.height / 2;
		
		System.root.addChild(new Entity().add(sprite));
		
	}
	
}
