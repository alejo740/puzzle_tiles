package game_objects;
import flambe.swf.Library;
import game_objects.turtles.NDiTurtle;
import globals.NDiGameConstants;
import scenes.components.NDiAnimationMovie;

/**
 * ...
 * @author Edwin
 */
class NDiWeed extends NDiAnimationMovie
{
	public var life:Float;
	public var totalLife:Float;
	public var parentTurtle:NDiTurtle;
	public function new(lib:Library, valueLife:Int, turtle:NDiTurtle) 
	{
		super(lib, NDiGameConstants.WEED_ANIMATION_PREFIX);
		this.life = this.totalLife = valueLife;
		this.parentTurtle = turtle;
	}
	
	public function receiveDamage(valueDamage:Int)
	{
		trace(life);
		this.life -= valueDamage;
		this.life = this.life < 0 ? 0 : this.life;
		var alphaValue:Float = this.life / this.totalLife;
		this.transform.alpha.animateTo(alphaValue, 0.3);
		
		if (this.life == 0)
		{
			this.delete();
			this.parentTurtle.isBlocked = false;
		}
	}
	
}