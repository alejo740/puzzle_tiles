package util;
import flambe.display.Texture;
import flambe.Entity;
import globals.NDiGameConstants;
import managers.NDiResourcesManager;
import math.NDiVector2D;
import scenes.components.NDiImage;

/**
 * ...
 * @author Edwin
 */
class NDiMatchLine extends NDiFillLine
{
	public var joinL:NDiImage;
	public var joinR:NDiImage;
	public var joinTexture:Texture;
	
	public function new(point0:NDiVector2D, point1:NDiVector2D, thickness:Float):Void
	{		
		super(point0, point1, thickness);
		this.joinTexture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/decorations/dot_match");		
		this.joinL = new NDiImage(this.joinTexture);
		this.joinR = new NDiImage(this.joinTexture);
		this.joinL.image.disablePointer();
		this.joinR.image.disablePointer();
		//this.joinL.transform.alpha._ = 0.4;
		//this.joinR.transform.alpha._ = 0.4;
	}
	
	override public function onAdded():Void
    {
		super.onAdded();
		this.owner.addChild(new Entity().add(this.joinL));
		this.owner.addChild(new Entity().add(this.joinR));
		
		this.joinL.transform.x._ = this.startingPoint.x;
		this.joinL.transform.y._ = this.startingPoint.y;
		
		this.joinR.transform.x._ = this.endingPoint.x;
		this.joinR.transform.y._ = this.endingPoint.y;
	}
	
}