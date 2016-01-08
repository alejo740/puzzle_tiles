package scenes.popups;
import flambe.Component;
import flambe.display.FillSprite;
import flambe.display.Font;
import flambe.display.Font.TextAlign;
import flambe.display.ImageSprite;
import flambe.display.Sprite;
import flambe.display.TextSprite;
import flambe.display.Texture;
import flambe.Entity;
import flambe.input.PointerEvent;
import flambe.scene.Scene;
import flambe.System;
import globals.NDiGameConstants;
import managers.NDiResourcesManager;
import managers.NDiSceneManager;
import managers.NDiLocalizationManager;
import scenes.components.NDiButton;
import scenes.NDiGamePlayScene;
import data.NDiLocalizationData;
/**
 * ...
 * @author Edwin
 */
class NDiPopupExit extends Component
{
	private var buttonYES:NDiButton;
	private var buttonNO:NDiButton;
	private var bg:ImageSprite;
	//private var font1:Font;
	private var nextScene:NDiTypeScene;
	private var onRoot:Bool;
	private var bgAlpha:Sprite;
	private var labelText:TextSprite;
	private var textYES:TextSprite;
	private var textNO:TextSprite;
	
	public var transform:Sprite;
	
	public function new(scene:NDiTypeScene, isOnRoot:Bool = false) 
	{
		this.onRoot = isOnRoot;
		this.nextScene = scene;
		this.transform = new Sprite();
		//this.font1 = NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.FONT_CALIBRI);
		
		var btnTextureYes:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.POPUP_EXIT_BUTTON_YES);
		this.buttonYES = new NDiButton(btnTextureYes);
		this.buttonYES.centerAnchor();
		this.buttonYES.nameButton = "buttonYES";
		this.buttonYES.x._ = -80;
		this.buttonYES.y._ = 70;
		this.buttonYES.pointerUp.connect(this.handlePointerDown);
		
		var btnTextureNo:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.POPUP_EXIT_BUTTON_NO);
		this.buttonNO = new NDiButton(btnTextureNo);		
		this.buttonNO.centerAnchor();
		this.buttonNO.nameButton = "buttonNO";
		this.buttonNO.x._ = 80;
		this.buttonNO.y._ = 70;		
		this.buttonNO.pointerUp.connect(this.handlePointerDown);
		
		var bgTexture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.POPUP_EXIT_BACKGROUND);
		this.bg = new ImageSprite(bgTexture);
		this.bg.centerAnchor();
		
		this.bgAlpha = new FillSprite(0x261432, System.stage.width, System.stage.height);
		this.bgAlpha.centerAnchor();
		this.bgAlpha.alpha._ = 0.5;
		
		var data1:NDiLocalizationData=NDiLocalizationManager.getInstance().getLocalizationData("gameplay|pause|popupExit|areyoursure_label");		
		//var font1:Font = NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, data1.fontName);
		//this.labelText = new TextSprite(font1, data1.content);
		this.labelText = NDiResourcesManager.addGenericText(data1.content, 
		NDiGameConstants.GAME_WIDTH * 0.03  + data1.offsetX,
		NDiGameConstants.GAME_HEIGHT * -0.15 + data1.offsetY,
		data1.fontScale,
		data1.fontName,
		TextAlign.Center);
		
		var dataYes:NDiLocalizationData = NDiLocalizationManager.getInstance().getLocalizationData("gameplay|pause|popupExit|accept_button");
		this.textYES = NDiResourcesManager.addGenericText(dataYes.content, 
		buttonYES.x._ +dataYes.offsetX, 
		(buttonYES.y._ -19) +dataYes.offsetY,
		dataYes.fontScale, dataYes.fontName, TextAlign.Center);
		
		var dataNo:NDiLocalizationData = NDiLocalizationManager.getInstance().getLocalizationData("gameplay|pause|popupExit|cancel_button");
		this.textNO = NDiResourcesManager.addGenericText(dataNo.content,
		(buttonNO.x._) +dataNo.offsetX,
		(buttonNO.y._ - 19) +dataNo.offsetY, 
		dataNo.fontScale, dataNo.fontName, TextAlign.Center);
	}
	
	private function addButtons()
	{
		this.owner.addChild(new Entity().add(this.buttonYES));
		
		this.owner.addChild(new Entity().add(this.buttonNO));
		
		this.owner.addChild(new Entity().add(this.textYES));
		
		this.owner.addChild(new Entity().add(this.textNO));		
	}
	
	private function addBackground()
	{
		this.owner.addChild(new Entity().add(this.bgAlpha));
		this.owner.addChild(new Entity().add(this.bg));
	}
	
	private function handlePointerDown(event:PointerEvent):Void
	{
		var tmpButton:NDiButton = cast(event.hit, NDiButton);
		
		if (tmpButton.nameButton == "buttonYES")
		{
			if (this.onRoot == false)
			{
				NDiSceneManager.getInstance().changeScene(this.nextScene);
			}else
			{
				NDiSceneManager.getInstance().director.popScene();
				NDiSceneManager.getInstance().changeScene(this.nextScene);
			}
		}
		else if (tmpButton.nameButton == "buttonNO")
		{
			this.owner.dispose();
		}
		
	}
	
	private function addTextQuestion()
	{
		
		/*
		label.align = TextAlign.Center;
		label.setScale(data.fontScale);
		
		label.x._ = NDiGameConstants.GAME_WIDTH * 0.03  + data.offsetX;
		label.y._ = NDiGameConstants.GAME_HEIGHT * -0.15 + data.offsetY;
		*/
		this.owner.addChild(new Entity().add(this.labelText));
	}
	
	override public function onAdded():Void
    {
		this.owner.add(this.transform);
		
		this.transform.x._ = NDiGameConstants.GAME_WIDTH * 0.5;
		this.transform.y._ = NDiGameConstants.GAME_HEIGHT * 0.5;
		
		this.addBackground();
		
		this.addTextQuestion();
		
		this.addButtons();
	}
	
	public function addToEntity():Entity
	{
		new Entity().add(this);		
		return this.owner;
	}
	
}