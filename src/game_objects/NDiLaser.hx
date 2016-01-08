package game_objects;
import math.NDiVector2D;
import flambe.display.ImageSprite;
import flambe.display.Texture;
import flambe.Entity;
import globals.NDiGameConstants;
import managers.NDiResourcesManager;
import util.NDiPatternLine;

/**
 * NDiTeravision
 * @author Edwin Cobos
 */
class NDiLaser extends NDiPatternLine
{
	public var thickness:Float;
	private var edgeLeft:ImageSprite;
	private var edgeRight:ImageSprite;
	public var gridPosition:Array<NDiVector2D>;
	public var direction:String;
	
	public function new(point0:NDiVector2D, point1:NDiVector2D):Void
	{
		this.thickness = 13;
		this.gridPosition = new Array<NDiVector2D>();
		var laserTexture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/panels/laser/laser");		
		var edgeTexture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/panels/laser/laser_edge");
		
		this.edgeLeft = new ImageSprite(edgeTexture);		
		this.edgeRight = new ImageSprite(edgeTexture);		
		
		super(point0, point1, this.thickness, laserTexture);
		
	}
	
	override private function updateLine()
	{
		super.updateLine();
		
		this.edgeLeft.x._ = this.startingPoint.x;
		this.edgeLeft.y._ = this.startingPoint.y;
		this.edgeRight.x._ = this.endingPoint.x;
		this.edgeRight.y._ = this.endingPoint.y;
		
		this.edgeLeft.rotation._ = this.line.rotation._;
		this.edgeRight.rotation._ = this.line.rotation._;
	}
	
	override public function onAdded():Void
    {
		this.edgeLeft.centerAnchor();
		this.edgeRight.centerAnchor();
		//this.edgeLeft.setAnchor(edgeLeft.getNaturalWidth() , edgeLeft.getNaturalHeight() * 0.5);
		//this.edgeRight.setAnchor(edgeRight.getNaturalWidth(), edgeRight.getNaturalHeight() * 0.5);
		
		this.edgeLeft.x._ = this.startingPoint.x;
		this.edgeLeft.y._ = this.startingPoint.y;
		
		this.edgeRight.x._ = this.endingPoint.x;
		this.edgeRight.y._ = this.endingPoint.y;
		this.edgeRight.scaleX._ = -1;
		
		super.onAdded();
		this.entity.addChild(new Entity().add(this.edgeLeft));
		this.entity.addChild(new Entity().add(this.edgeRight));		
		
		//this.transform.alpha._ = 0.5;
	}
	
}