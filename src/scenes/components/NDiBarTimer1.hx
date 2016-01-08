package scenes.components;

import flambe.Component;
import flambe.display.ImageSprite;
import flambe.display.Sprite;
import flambe.display.Texture;
import flambe.Entity;
import globals.NDiGameConstants;
import managers.NDiResourcesManager;

/**
 * ...
 * @author Edwin
 */
class NDiBarTimer1 extends Component
{
	private var bar:ImageSprite;
	private var barBg:ImageSprite;
	private var barIcon:ImageSprite;
	
	public var transform:Sprite;
	
	public function new() 
	{
		var barTexture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/hud/barenemy_timer_bar");
		var barBgTexture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/hud/barenemy_timer_bg");
		var barIconTexture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/hud/barenemy_timer_icon");
		this.bar = new ImageSprite(barTexture);
		this.barBg = new ImageSprite(barBgTexture);		
		this.barIcon = new ImageSprite(barIconTexture);
		this.transform = new Sprite();
	}
	
	public function updateBar(value:Float)
	{
		//this.bar.scaleY.animateTo(value, 0.2);
		this.bar.scaleY._ = value;
	}
	
	private function addIcon()
	{		
		this.barIcon.centerAnchor();
		this.barIcon.x._ = 3;
		this.barIcon.y._ = -207;
		this.owner.addChild(new Entity().add(this.barIcon));
	}
	
	private function addBar()
	{
		/*BACKGROUND*/		
		//this.barBg.y._ = -11;
		this.barBg.anchorX._ = this.barBg.getNaturalWidth() * 0.5;
		this.barBg.anchorY._ = this.barBg.getNaturalHeight();
		this.owner.addChild(new Entity().add(this.barBg));
		
		/*MAIN BAR*/		
		this.bar.anchorX._ = this.bar.getNaturalWidth() * 0.5;
		this.bar.anchorY._ = this.bar.getNaturalHeight();
		this.bar.x._ = 3;
		this.bar.y._ = -47;
		this.owner.addChild(new Entity().add(this.bar));		
	}
	
	override public function onAdded():Void
    {
		this.owner.add(transform);
		this.addBar();
		this.addIcon();
	}
	
}