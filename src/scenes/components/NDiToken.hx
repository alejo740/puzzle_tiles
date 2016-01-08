package scenes.components;
import math.NDiVector2D;
import flambe.animation.Ease;
import flambe.display.FillSprite;
import flambe.display.Sprite;
import flambe.Entity;
import flambe.script.Delay;
import flambe.swf.Library;
import flambe.swf.MoviePlayer;
import globals.NDiGameConstants;
import globals.NDiGameConstants.NDiTypeToken;

/**
 * ...
 * @author Edwin Cobos
 */
class NDiToken extends MoviePlayer
{
	public var entity:Entity;	
	public var transform:Sprite;
	
	public var indexTypeToken:Int;
	public var tokenName:String;
	public var isSelected:Bool;
	public var isDead:Bool;
	public var isHide:Bool;
	public var gridPosition:NDiVector2D;
	public var type:NDiTypeToken;
	public var tokenColor:Int;
	public var isBlocked:Bool;
	
	public function new(lib:Library):Void
	{
		super(lib);
		this.transform = new Sprite();
		this.isSelected = false;
		this.tokenName = super.name;
		this.gridPosition = new NDiVector2D(0, 0);
		this.isDead = false;
		this.isHide = false;
		this.indexTypeToken = 0;
		this.isBlocked = false;
		//this.transform.centerAnchor();
	}
	
	public function animationOff():Void
	{
		/*
		this.transform.alpha.animateTo(0.1, 0.3, Ease.linear);
		this.transform.scaleX.animateTo(0.1, 0.5, Ease.bounceOut);
		this.transform.scaleY.animateTo(0.1, 0.5, Ease.bounceOut);		
		*/
		this.hide(false);
		this.transform.alpha._ = 1;
		this.isDead = true;
		this.play(this.tokenName + "disappear");
	}
	
	
	public function hide(value:Bool = true)
	{
		if (value)
		{
			this.tokenName = NDiGameConstants.ARRAY_PREFIX_ANIMATION_TOKEN[NDiGameConstants.ARRAY_PREFIX_ANIMATION_TOKEN.length - 1];
			//this.loop(this.tokenName+"idle");
		}else {
			this.tokenName = NDiGameConstants.ARRAY_PREFIX_ANIMATION_TOKEN[this.indexTypeToken];
		}
		this.isHide = value;
		this.animationIdle();
	}
	
	public function animationIdle():Void
	{
		this.loop(this.tokenName + "idle");
	}
	
	public function animationTimeOut():Void
	{
		this.play(this.tokenName + "timeout");
	}
	
	
	public function animationSelectedOn():Void
	{
		//this.transform.alpha.animateTo(0.5, 0.3, Ease.linear);
		this.transform.scaleX.animateTo(0.8, 0.5, Ease.bounceOut);
		this.transform.scaleY.animateTo(0.8, 0.5, Ease.bounceOut);
	}
	
	public function animationSelectedOff():Void
	{
		//this.transform.alpha.animateTo(1, 0.3, Ease.linear);
		this.transform.scaleX.animateTo(1, 0.5, Ease.bounceOut);
		this.transform.scaleY.animateTo(1, 0.5, Ease.bounceOut);
	}
	
	override public function onAdded():Void
    {
		super.onAdded();
		this.entity.add(this.transform);
	}
	
	public function delete():Void
	{		
		this.entity.dispose();
	}
	
	public function addToEntity():Entity
	{
		this.entity = new Entity();
		this.entity.add(this);
		return this.entity;
	}
}