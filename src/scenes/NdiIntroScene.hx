package scenes;

import data.NDiLocalizationData;
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
import managers.NDiLocalizationManager;
import scenes.NDiAbstractScene;
import managers.NDiSceneManager;
import managers.NDiResourcesManager;
import globals.NDiGameConstants;
import scenes.components.NDiButton;
import util.NDiSaveData;

class NDiIntroScene extends NDiAbstractScene
{
	private var backgroundMainMenu:ImageSprite;	
	
	private var rootEntity:Entity;
	//private var font1:Font;
	
	public function new() 
	{
		super();
		this.rootEntity = new Entity();
		this.rootEntity.add(new Script());
	}
	
	private function addBackground()
	{
		var backgroundTexture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/backgrounds/story");
		this.backgroundMainMenu = new ImageSprite(backgroundTexture);
		this.backgroundMainMenu.centerAnchor();
		this.backgroundMainMenu.y._ = NDiGameConstants.GAME_HEIGHT * 0.5;
		this.backgroundMainMenu.x._ = NDiGameConstants.GAME_WIDTH * 0.5;
		this.rootEntity.addChild(new Entity().add(this.backgroundMainMenu));
	}
	
	private function addTexts()
	{
		var data:NDiLocalizationData = NDiLocalizationManager.getInstance().getLocalizationData("history|text1");		
		var text1:TextSprite = NDiResourcesManager.addGenericText(data.content,
		175 + data.offsetX,
		13 + data.offsetY, 
		data.fontScale,
		data.fontName, 
		TextAlign.Left);
		new Entity().add(text1);
		
		
		data = NDiLocalizationManager.getInstance().getLocalizationData("history|text2");
		var text2:TextSprite = NDiResourcesManager.addGenericText(data.content,
		365 + data.offsetX,
		465 + data.offsetY, 
		data.fontScale,
		data.fontName, 
		TextAlign.Left);
		new Entity().add(text2);
		
		this.owner.addChild(text1.owner);
		this.owner.addChild(text2.owner);
	}
	/*
	private function addText( message:String= "",  posX:Int =480,  posY:Int =250)
	{
		mainText = new TextSprite(this.font1, "");
		mainText.text = message;
		mainText.align = TextAlign.Center;
		mainText.x._ = posX;
		mainText.y._ = posY;
		this.owner.addChild(new Entity().add(mainText));
	}
	*/
	private function addInvisibleButton() 
	{
		var invButton:Sprite = new FillSprite(0x222222, System.stage.width, System.stage.height);
		invButton.centerAnchor();
		invButton.x._ = (NDiGameConstants.GAME_WIDTH * 0.5);
		invButton.y._ = (NDiGameConstants.GAME_HEIGHT * 0.5);
		invButton.alpha._ = 0.0;
		invButton.pointerDown.connect(function(event:PointerEvent) {
				//NDiSceneManager.getInstance().changeScene(NDI_TYPE_SCENE_GAMEPLAY);
				NDiSceneManager.getInstance().changeScene(NDI_TYPE_SCENE_TUTORIAL);
		});
		this.owner.addChild(new Entity().add(invButton));
	}
	
	override public function onAdded():Void
    {
		super.onAdded();
		this.owner.addChild(this.rootEntity);
		//this.font1 = NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.FONT_CALIBRI);
		
		/*Add Background*/
		this.addBackground();
		this.addTexts();
		//this.addText("Game Intro\n\nHere we give instructions and explain the game objective.\n\nTop score:"+NDiSaveData.getInstance().getData(NDiVarsToSave.SCORE.getName())+"\n\n\nTap to start");
		this.addInvisibleButton() ;
		
	}
	
}