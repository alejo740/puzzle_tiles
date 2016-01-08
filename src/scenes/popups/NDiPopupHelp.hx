package scenes.popups;
import data.NDiLocalizationData;
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
import managers.NDiLocalizationManager;
import managers.NDiResourcesManager;
import managers.NDiSceneManager;
import scenes.components.NDiButton;
import scenes.components.NDiImage;
import scenes.NDiGamePlayScene;

class NDiPopupHelp extends Component
{
	private var title:NDiImage;
	private var frame1:NDiImage;
	private var frame2:NDiImage;
	private var frame3:NDiImage;	
	private var buttonOK:NDiButton;	
	private var currentButtonPressed:NDiButton;
	private var bgAlpha:Sprite;
	private var frameText:TextSprite;
	private var number1:TextSprite;
	private var number2:TextSprite;
	private var number3:TextSprite;
	private var text1:TextSprite;
	private var text2:TextSprite;
	private var text3:TextSprite;
	
	
	public var transform:Sprite;
	
	public function new() 
	{
		this.transform = new Sprite();
		this.bgAlpha = new FillSprite(0x261432, System.stage.width, System.stage.height);
		
		var titleTexture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/titles/textcontainer");
		this.title = new NDiImage(titleTexture);
		
		var data1:NDiLocalizationData = NDiLocalizationManager.getInstance().getLocalizationData("help|title");
		var font1:Font = NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, data1.fontName);
		this.frameText = NDiResourcesManager.addGenericText(data1.content, 
		0 + data1.offsetX,
		-20 + data1.offsetY,
		data1.fontScale,
		data1.fontName,
		TextAlign.Center);
		
		//this.frameText = new TextSprite(font1);
		
		
		this.frame1 = this.createFrame("images/panels/help/slot01HELP");
		this.frame2 = this.createFrame("images/panels/help/slot02HELP");
		this.frame3 = this.createFrame("images/panels/help/slot03HELP");
		
		var dataNumberFrame1:NDiLocalizationData = NDiLocalizationManager.getInstance().getLocalizationData("help|number1");
		this.number1 = this.addNumberTexts(dataNumberFrame1);
		
		var dataNumberFrame2:NDiLocalizationData = NDiLocalizationManager.getInstance().getLocalizationData("help|number2");
		this.number2 = this.addNumberTexts(dataNumberFrame2);
		
		var dataNumberFrame3:NDiLocalizationData = NDiLocalizationManager.getInstance().getLocalizationData("help|number3");
		this.number3 = this.addNumberTexts(dataNumberFrame3);
		
		var dataTextFrame1:NDiLocalizationData = NDiLocalizationManager.getInstance().getLocalizationData("help|number1_text");
		this.text1 = this.addTexts(dataTextFrame1);
		
		var dataTextFrame2:NDiLocalizationData = NDiLocalizationManager.getInstance().getLocalizationData("help|number2_text");
		this.text2 = this.addTexts(dataTextFrame2);
		
		var dataTextFrame3:NDiLocalizationData = NDiLocalizationManager.getInstance().getLocalizationData("help|number3_text");
		this.text3 = this.addTexts(dataTextFrame3);
	}
	
	private function addButtons()
	{
		
		var tmpButton:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/buttons/popupExit/btn_cancel");
		this.buttonOK = new NDiButton(tmpButton);
		this.buttonOK.centerAnchor();
		this.buttonOK.nameButton = "OK_BUTTON";
		this.buttonOK.x._ = ((NDiGameConstants.GAME_WIDTH * 0.5) + 370);
		this.buttonOK.y._ = ((NDiGameConstants.GAME_HEIGHT * 0.5) + 252);
		this.buttonOK.pointerDown.connect(this.handlePointerDown);
		this.buttonOK.pointerUp.connect(this.handlePointerUp);
		System.pointer.up.connect(this.handlePointerUpGlobal);
		this.owner.addChild(new Entity().add(this.buttonOK));
		
		var data:NDiLocalizationData = NDiLocalizationManager.getInstance().getLocalizationData("help|ok_button");
		var textTmp:TextSprite = NDiResourcesManager.addGenericText(data.content, 
		89 + data.offsetX,
		15 + data.offsetY, 
		data.fontScale,
		data.fontName, 
		TextAlign.Center);
		
		this.buttonOK.owner.addChild(new Entity().add(textTmp));
		
	}
	
	private function addBackground()
	{
		
		//bgAlpha.centerAnchor();
		this.bgAlpha.alpha._ = 0.7;
		this.owner.addChild(new Entity().add(this.bgAlpha));
	}
	
	private function addTitle()
	{
		this.title.transform.x._ = NDiGameConstants.GAME_WIDTH * 0.5;
		this.title.transform.y._ = 24;
		this.owner.addChild(new Entity().add(this.title));
		/*
		this.frameText.text = this.data1.content;
		this.frameText.align = TextAlign.Center;
		this.frameText.x._ = 0 + this.data1.offsetX;
		this.frameText.y._ = -20 + this.data1.offsetY;
		this.frameText.setScale(this.data1.fontScale);*/
		
		this.title.owner.addChild(new Entity().add(this.frameText));
	}
	
	private function addTexts(data:NDiLocalizationData):TextSprite
	{
		/*
		var data:NDiLocalizationData = null;
		if (numFrame == 1)
		{
			data = NDiLocalizationManager.getInstance().getLocalizationData("help|number1_text");
		}else if (numFrame == 2)
		{
			data = NDiLocalizationManager.getInstance().getLocalizationData("help|number2_text");
		}else if (numFrame == 3)
		{
			data = NDiLocalizationManager.getInstance().getLocalizationData("help|number3_text");
		}*/
		var font:Font = NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, data.fontName);
		var text:TextSprite = new TextSprite(font);
		text.text = data.content;
		text.align = TextAlign.Left;
		text.x._ = -110 + data.offsetX;
		text.y._ = 50 + data.offsetY;
		
		text.setScale(data.fontScale);
		return text;
	}
	
	private function addNumberTexts(data:NDiLocalizationData):TextSprite
	{
		//var data:NDiLocalizationData = null;
		/*
		if (numFrame == 1)
		{
			data = NDiLocalizationManager.getInstance().getLocalizationData("help|number1");
		}else if (numFrame == 2)
		{
			data = NDiLocalizationManager.getInstance().getLocalizationData("help|number2");
		}else if (numFrame == 3)
		{
			data = NDiLocalizationManager.getInstance().getLocalizationData("help|number3");
		}*/
		var font:Font = NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, data.fontName);
		var number:TextSprite = new TextSprite(font);
		number.text = data.content;
		number.align = TextAlign.Center;
		number.x._ = -100 + data.offsetX;
		number.y._ = -198 + data.offsetY;
		number.setScale(data.fontScale);
		return number;
	}
	
	private function addFrames()
	{
		this.frame1.transform.x._ = (NDiGameConstants.GAME_WIDTH * 0.25)-50;
		this.frame1.transform.y._ = (NDiGameConstants.GAME_HEIGHT * 0.5);
		new Entity().add(this.frame1);
		this.frame1.owner.addChild(new Entity().add(this.number1));
		this.frame1.owner.addChild(new Entity().add(this.text1));
		this.owner.addChild(this.frame1.owner);		
		
		
		this.frame2.transform.x._ = (NDiGameConstants.GAME_WIDTH * 0.5);
		this.frame2.transform.y._ = (NDiGameConstants.GAME_HEIGHT * 0.5);
		new Entity().add(this.frame2);
		this.frame2.owner.addChild(new Entity().add(this.number2));
		this.frame2.owner.addChild(new Entity().add(this.text2));
		this.owner.addChild(this.frame2.owner);
		
		
		this.frame3.transform.x._ = (NDiGameConstants.GAME_WIDTH * 0.75)+50;
		this.frame3.transform.y._ = (NDiGameConstants.GAME_HEIGHT * 0.5);
		new Entity().add(this.frame3);
		this.frame3.owner.addChild(new Entity().add(this.number3));
		this.frame3.owner.addChild(new Entity().add(this.text3));
		this.owner.addChild(this.frame3.owner);
		
	}
	
	private function createFrame(nameFrame:String):NDiImage
	{
		var textImage:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, nameFrame);
		var newImage:NDiImage = new NDiImage(textImage);
		//new Entity().add(newImage);
		//this.owner.addChild();
		
		
		
		return newImage;
	}
	
	
	
	
	
	private function handlePointerUp(event:PointerEvent):Void 
	{
		var tmpButton:NDiButton = cast(event.hit, NDiButton);
		if (tmpButton.isSelected)
		{
			if (tmpButton.nameButton == "OK_BUTTON")
			{
				//this.transform.visible = false;
				this.owner.dispose();
			}
		}
	}
	
	
	
	private function handlePointerUpGlobal(event:PointerEvent):Void 
	{
		if (this.currentButtonPressed != null)
		{
			this.currentButtonPressed.animationRelease();
			this.currentButtonPressed = null;
		}
		//cast(this.parentScene, NDiTutorialScene).currentStep++;
		//this.currentStep++;
	}
	
	private function handlePointerDown(event:PointerEvent):Void
	{
		var tmpButton:NDiButton = cast(event.hit, NDiButton);
			tmpButton.isSelected = true;
			tmpButton.animationPressed();
			this.currentButtonPressed = tmpButton;
		
	}
	
	
	override public function onAdded():Void
    {
		//helpIndex = 0;
		super.onAdded();
		this.owner.add(this.transform);
		
		//this.transform.x._ = NDiGameConstants.GAME_WIDTH * 0.5;
		//this.transform.y._ = NDiGameConstants.GAME_HEIGHT * 0.5;
		
		this.addBackground();
		
		this.addFrames();
		
		this.addTitle();
		
		this.addButtons();
		
		//this.addNavigationControl();
	}
	
	public function addToEntity():Entity
	{
		new Entity().add(this);		
		return this.owner;
	}
	
}