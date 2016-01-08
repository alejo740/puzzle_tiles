package scenes.components;
import math.NDiVector2D;
import flambe.animation.Ease;
import flambe.display.FillSprite;
import flambe.display.ImageSprite;
import flambe.display.Sprite;
import flambe.display.Texture;
import flambe.Entity;
import flambe.script.Delay;
import globals.NDiGameConstants.NDiTypeToken;

/**
 * ...
 * @author Edwin Cobos
 */
class NDiTokenStatic extends ImageSprite
{
	public var entity:Entity;	
	
	public var tokenName:String;
	public var isSelected:Bool;
	public var gridPosition:NDiVector2D;
	public var type:NDiTypeToken;
	public var tokenColor:Int;
	public var indexToken:Int;
	
	public function new(texture:Texture):Void
	{
		super(texture);
		this.isSelected = false;
		this.tokenName = super.name;
		this.gridPosition = new NDiVector2D(0, 0);
		this.indexToken = -1;
	}
	
	public function animationOff():Void
	{
		this.alpha.animateTo(0.1, 0.3, Ease.linear);
		this.scaleX.animateTo(0.1, 0.5, Ease.bounceOut);
		this.scaleY.animateTo(0.1, 0.5, Ease.bounceOut);		
	}
	
	public function animationSelectedOn():Void
	{
		this.alpha.animateTo(0.5, 0.3, Ease.linear);
		this.scaleX.animateTo(0.8, 0.5, Ease.bounceOut);
		this.scaleY.animateTo(0.8, 0.5, Ease.bounceOut);
	}
	
	public function animationSelectedOff():Void
	{
		this.alpha.animateTo(1, 0.3, Ease.linear);
		this.scaleX.animateTo(1, 0.5, Ease.bounceOut);
		this.scaleY.animateTo(1, 0.5, Ease.bounceOut);
	}
	
	override public function onAdded():Void
    {
		/*Code here*/
		
		/**/
		super.onAdded();
	}
	
	public function delete():Void
	{		
		this.owner.dispose();
	}
	
	public function addToEntity():Entity
	{
		this.entity = new Entity();
		this.entity.add(this);
		return this.entity;
	}
}