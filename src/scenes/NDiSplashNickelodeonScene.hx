package scenes;

import flambe.display.FillSprite;
import flambe.display.ImageSprite;
import flambe.display.Sprite;
import flambe.display.TextSprite;
import flambe.display.Texture;
import flambe.Entity;
import flambe.display.Font;
import flambe.input.PointerEvent;
import flambe.script.CallFunction;
import flambe.script.Delay;
import flambe.script.Script;
import flambe.script.Sequence;
import flambe.sound.Sound;
import flambe.asset.AssetPack;
import flambe.System;
import scenes.NDiAbstractScene;
import managers.NDiSceneManager;
import managers.NDiResourcesManager;
import globals.NDiGameConstants;
import scenes.components.NDiButton;
import haxe.Timer;

class NDiSplashNickelodeonScene extends NDiAbstractScene
{

	private var backgroundSplashNickelodeon:ImageSprite;
	private var logo:ImageSprite;
	private var rootEntity:Entity;
	//private var font1:Font;
	
	public function new() 
	{
		super();
		this.rootEntity = new Entity();
		this.rootEntity.add(new Script());
	}
	
	private function loadMainMenuScene() {
		NDiSceneManager.getInstance().changeScene(NDI_TYPE_SCENE_MAINMENU);
	}
	
	private function addBackground()
	{
		var backgroundTexture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.SPLASHNICK_BACKGROUND);
		this.backgroundSplashNickelodeon = new ImageSprite(backgroundTexture);
		this.backgroundSplashNickelodeon.centerAnchor();
		this.backgroundSplashNickelodeon.y._ = NDiGameConstants.GAME_HEIGHT * 0.5;
		this.backgroundSplashNickelodeon.x._ = NDiGameConstants.GAME_WIDTH * 0.5;
		this.rootEntity.addChild(new Entity().add(this.backgroundSplashNickelodeon));
		
	}
	
	override public function onAdded():Void
    {
		super.onAdded();
		this.owner.addChild(this.rootEntity);
		//this.font1 = NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.FONT_CALIBRI);
		
		/*Add Background*/
		this.addBackground();
		//addText("Placeholder Splash Nickelodeon",500,250);
		
		haxe.Timer.delay(loadMainMenuScene, NDiGameConstants.SPLASH_DURATION);
	}
	
}