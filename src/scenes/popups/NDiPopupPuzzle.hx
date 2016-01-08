package scenes.popups;

import data.NDiLocalizationData;
import flambe.Component;
import flambe.display.FillSprite;
import flambe.display.Font;
import flambe.display.ImageSprite;
import flambe.display.Sprite;
import flambe.display.TextSprite;
import flambe.display.Texture;
import flambe.Entity;
import flambe.script.CallFunction;
import flambe.script.Delay;
import flambe.script.Script;
import flambe.script.Sequence;
import globals.NDiGameConstants;
import managers.NDiLocalizationManager;
import managers.NDiResourcesManager;

/**
 * ...
 * @author Edwin
 */
class NDiPopupPuzzle extends Component
{
	private var bg:ImageSprite;
	private var frame:ImageSprite;
	private var message:TextSprite;
	
	private var data1:NDiLocalizationData;
	private var data2:NDiLocalizationData;
	private var data3:NDiLocalizationData;
	private var font1:Font;
	private var font2:Font;
	private var font3:Font;
	
	public var transform:Sprite;

	public function new() 
	{
		this.transform = new Sprite();
		var bgTexture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/panels/puzzle/popup_background");
		var frameTexture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/panels/puzzle/popup_battle");
		
		this.data1 = NDiLocalizationManager.getInstance().getLocalizationData("gameplay|popup|turtle_attack");
		this.font1 = NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, data1.fontName);
		
		this.data2 = NDiLocalizationManager.getInstance().getLocalizationData("gameplay|popup|enemy_attack");
		this.font2 = NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, data1.fontName);
		
		this.data3 = NDiLocalizationManager.getInstance().getLocalizationData("gameplay|popup|enemy_defeated");
		this.font3 = NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, data1.fontName);
		
		this.message = new TextSprite(font1, "");		
		this.bg = new ImageSprite(bgTexture);
		this.frame = new ImageSprite(frameTexture);
	}
	
	public function changeText(popupType:NDiTypePopupPuzzle)
	{		
		var data:NDiLocalizationData;
		if (popupType == NDiTypePopupPuzzle.NDI_POPUP_TURTLE_ATTACK)
		{
			data = data1;
			this.message.font = font1;
		}else if (popupType == NDiTypePopupPuzzle.NDI_POPUP_ENEMY_ATTACK)
		{
			data = data2;
			this.message.font = font2;
		}else//(popupID == 3) // NEW ENEMY
		{
			data = data3;
			this.message.font = font3;
		}
		this.message.text = data.content;
		this.message.setScale(data.fontScale);		
		this.message.x._ += data.offsetX;
		this.message.y._ += data.offsetY;
	}
	
	public function hide()
	{
		this.toggleHide(0.2, false);
		
	}
	
	public function show()
	{
		this.toggleHide(0.2, true);
	}
	
	private function toggleHide(time:Float, visible:Bool)
	{		
		//this.transform.visible = visible;
		if (visible)
		{
			trace("SHOW");
			this.transform.alpha._ = 0;
			this.transform.scaleX._ = 0;
			this.transform.scaleY._ = 0;
			
			this.transform.alpha.animateTo(1, time);		
			this.transform.scaleX.animateTo(1, time);
			this.transform.scaleY.animateTo(1, time);
			
			/*
			this.transform.alpha._ = 1;
			this.transform.scaleX._ = 1;
			this.transform.scaleY._ = 1;
			*/
			this.transform.visible = visible;
			return;
		}else {			
			trace("HIDE");
			
			this.transform.alpha.animateTo(0, time);		
			this.transform.scaleX.animateTo(0, time);			
			this.transform.scaleY.animateTo(0, time);
			
			/*
			this.transform.alpha._ = 0;
			this.transform.scaleX._ = 0;
			this.transform.scaleY._ = 0;
			*/
		}
		
		
		var f1:CallFunction = new CallFunction(function() {
			this.transform.visible = visible;
		});
		var seq1:Sequence = new Sequence([new Delay(time), f1]);
		this.owner.get(Script).run(seq1);
	}
	
	private function addBackground()
	{
		var fillBg:FillSprite = new FillSprite(0xffffff, 472, 472);
		fillBg.alpha._ = 0.0;
		fillBg.centerAnchor();
		this.owner.addChild(new Entity().add(fillBg));
		
		this.bg.centerAnchor();
		this.bg.x._ = -31;
		this.bg.y._ = -35;
		this.owner.addChild(new Entity().add(this.bg));
	}
	
	private function addFrame()
	{
		this.frame.centerAnchor();
		this.frame.x._ = -25;
		//this.frame.y._ = -25;
		this.owner.addChild(new Entity().add(this.frame));
	}
	
	private function addText()
	{
		this.message.centerAnchor();
		this.message.align = TextAlign.Center;
		this.message.x._ = -25;
		this.message.y._ = -53;
		this.owner.addChild(new Entity().add(this.message));
	}
	
	override public function onAdded():Void
    {
		super.onAdded();		
		this.owner.add(transform);
		this.owner.add(new Script());
		this.addBackground();
		this.addFrame();
		this.addText();
		
		//this.changeText();
		this.toggleHide(0, false);
	}
	
	
}