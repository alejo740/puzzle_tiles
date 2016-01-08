package game_objects.enemies;
import flambe.swf.Library;
import globals.NDiGameConstants;
import managers.NDiEnemyManager;
import util.NDiRandomUtils;

/**
 * ...
 * @author Edwin
 */
class NDiFootSoldierEnemy extends NDiEnemy
{
	
	private var isHide:Bool;
	private var elapsedTime:Float;
	private var timeToHide:Float;
	private var timeToUnhide:Float;

	public function new(index:Int)
	{
		super(index);
		this.isHide = true;
		this.elapsedTime = 0;
		this.timeToHide = 5;
		this.timeToUnhide = 6;
		
	}
	
	private function hideEnemy(hide:Bool)
	{
		if (hide)
		{
			this.transform.alpha.animateTo(0.2, 0.5);
		}else{
			this.transform.alpha.animateTo(1, 0.5);
		}
	}
	
	private function timerToHide(dt:Float):Void
	{
		//trace("FOOT SOLDIER ENEMY - UPDATE");
		this.elapsedTime += dt;
		if (this.isHide)
		{
			if (this.elapsedTime >= this.timeToUnhide)
			{
				this.isHide = false;
				this.elapsedTime = 0;
				var newTimerToHide:Float = NDiRandomUtils.getRandomFloat(1, 8);
				this.timeToHide = newTimerToHide;
				this.hideEnemy(this.isHide);
			}
		}else {
			if (this.elapsedTime >= this.timeToHide)
			{
				this.isHide = true;
				this.elapsedTime = 0;				
				this.hideEnemy(this.isHide);
			}	
		}
		
	}
	
	override public function receiveDamage(matchingFrequency:Map<String, Int>):Float
	{
		if (this.isHide)
			return 0;
			
		return super.receiveDamage(matchingFrequency);
	}
	
	override public function onAdded():Void
    {
		super.onAdded();
		this.hideEnemy(this.isHide);
	}
	
	override public function onUpdate(dt:Float):Void
	{
		super.onUpdate(dt);
		this.timerToHide(dt);
	}
	
	
	
}