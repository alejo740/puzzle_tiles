package scenes.popups;

import data.NDiLocalizationData;
import flambe.Component;
import flambe.display.Font;
import flambe.display.Sprite;
import flambe.display.TextSprite;
import flambe.display.Texture;
import flambe.Entity;
import flambe.input.PointerEvent;
import flambe.System;
import globals.NDiGameConstants;
import managers.NDiLocalizationManager;
import managers.NDiResourcesManager;
import scenes.components.NDiButton;
import scenes.NDiAbstractScene;
import scenes.NDiTutorialScene;

/**
 * ...
 * @author Edwin Cobos
 */
class NDiTutorialDialog extends Component
{
	private var frame:NDiButton;
	private var skipButton:NDiButton;
	private var frameText:TextSprite;	
	private var currentButtonPressed:NDiButton;	
	private var handlePointerUpFunction:PointerEvent->Void;
	private var handlePointerUpGlobalFunction:PointerEvent->Void;
	private var handlePointerDownFunction:PointerEvent->Void;
	private var parentScene:NDiTutorialScene;
	
	public var transform:Sprite;
	

	public function new(parent:NDiTutorialScene, upFunction:PointerEvent->Void = null, upGlobalFunction:PointerEvent->Void = null, downFunction:PointerEvent->Void = null) 
	{
		
		this.transform = new Sprite();
		if (upFunction == null)
			this.handlePointerUpFunction = this.handlePointerUp;
		else
			this.handlePointerUpFunction = upFunction;
		
		if (upGlobalFunction == null)
			this.handlePointerUpGlobalFunction = this.handlePointerUpGlobal;
		else
			this.handlePointerUpGlobalFunction = upGlobalFunction;
			
		if (downFunction == null)
			this.handlePointerDownFunction = this.handlePointerDown;
		else
			this.handlePointerDownFunction = downFunction;
		
		this.parentScene = parent;
	}
	
	private function addText()
	{
		var data:NDiLocalizationData = NDiLocalizationManager.getInstance().getLocalizationData(NDiGameConstants.ARRAY_TUTORIAL_TEXTS[this.parentScene.currentStep]);
		var font:Font = NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, data.fontName);
		this.frameText = new TextSprite(font, "");
		this.frameText.text = data.content;
		this.frameText.x._ = ((NDiGameConstants.GAME_WIDTH * 0.25) - 135) + data.offsetX;
		this.frameText.y._ = ((NDiGameConstants.GAME_HEIGHT * 0.5) - 85) + data.offsetY;
		this.frameText.align = TextAlign.Left;
		this.frameText.setScale(data.fontScale);
		this.owner.addChild(new Entity().add(this.frameText));
	}
	
	private function addSkipButton():Void
	{
		var tmpButton:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/buttons/popupExit/btn_cancel");
		this.skipButton = new NDiButton(tmpButton);
		this.skipButton.centerAnchor();
		this.skipButton.nameButton = "SKIP_BUTTON";
		this.skipButton.x._ = (NDiGameConstants.GAME_WIDTH * 0.25) + 140;
		this.skipButton.y._ = (NDiGameConstants.GAME_HEIGHT * 0.5) + 90;
		this.skipButton.pointerDown.connect(this.handlePointerDownFunction);
		this.skipButton.pointerUp.connect(this.handlePointerUpFunction);
		System.pointer.up.connect(this.handlePointerUpGlobalFunction);
		this.owner.addChild(new Entity().add(this.skipButton));
		
		var data:NDiLocalizationData = NDiLocalizationManager.getInstance().getLocalizationData("tutorial|skip_button");
		var textTmp:TextSprite = NDiResourcesManager.addGenericText(data.content, 
		(this.skipButton.getNaturalWidth()*0.5) + data.offsetX, 
		15 + data.offsetY, 
		data.fontScale,
		data.fontName, 
		TextAlign.Center);
		this.skipButton.owner.addChild(new Entity().add(textTmp));
	}
	
	private function addBackground()
	{
		var tmpBg:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/panels/tutorial/tutorial_dialogbox");
		this.frame = new NDiButton(tmpBg);
		this.frame.centerAnchor();
		this.frame.disablePointer();
		this.frame.x._ = NDiGameConstants.GAME_WIDTH * 0.25;
		this.frame.y._ = NDiGameConstants.GAME_HEIGHT * 0.5;
		this.owner.addChild(new Entity().add(this.frame));
	}
	
	public function changeText()
	{
		this.frameText.owner.dispose();
		this.addText();
	}
	
	private function handlePointerUp(event:PointerEvent):Void 
	{
		var tmpButton:NDiButton = cast(event.hit, NDiButton);
		if (tmpButton.isSelected)
		{
			if (tmpButton.nameButton == "SKIP_BUTTON")
			{
				//this.changeStep();
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
		super.onAdded();
		this.owner.add(this.transform);		
		this.addBackground();
		this.addText();
		this.addSkipButton();
	}
	
}