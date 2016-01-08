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

class NDiSplashNDiScene extends NDiAbstractScene
{

	private var backgroundSplashNDi:ImageSprite;
	private var logo:ImageSprite;
	private var rootEntity:Entity;
	//private var font1:Font;
	
	public function new() 
	{
		super();
		this.rootEntity = new Entity();
		this.rootEntity.add(new Script());

	}
	
	private function loadSplashNickelodeon() {
		NDiSceneManager.getInstance().changeScene(NDI_TYPE_SCENE_SPLASH_NICKELODEON);
	}
	
	private function addBackground()
	{
		var backgroundTexture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.SPLASHNDI_BACKGROUND);
		this.backgroundSplashNDi = new ImageSprite(backgroundTexture);
		this.backgroundSplashNDi.centerAnchor();
		this.backgroundSplashNDi.y._ = NDiGameConstants.GAME_HEIGHT * 0.5;
		this.backgroundSplashNDi.x._ = NDiGameConstants.GAME_WIDTH * 0.5;
		this.rootEntity.addChild(new Entity().add(this.backgroundSplashNDi));
		
	}
	override public function onAdded():Void
    {
		super.onAdded();
		this.owner.addChild(this.rootEntity);
		//this.font1 = NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.FONT_CALIBRI);
		
		/*Add Background*/
		this.addBackground();
		//addText("Placeholder Splash NDi",500,250);
		
		
		haxe.Timer.delay(loadSplashNickelodeon, NDiGameConstants.SPLASH_DURATION);
	}
	
}