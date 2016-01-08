package managers;
import scenes.NDiGamePlayScene;

/**
 * ...
 * @author Edwin
 */
class NDiTutorialEnemyManager extends NDiEnemyManager
{
	public var activeTimer:Bool;
	public function new(parent:NDiGamePlayScene) 
	{
		super(parent);
		this.activeTimer = false;
	}
	
	override public function updateTimerToAttack(dt:Float)
	{
		if (this.activeTimer)
		{
			super.updateTimerToAttack(dt);
		}
	}
}