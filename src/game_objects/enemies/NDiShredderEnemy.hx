package game_objects.enemies;
import flambe.swf.Library;
import managers.NDiEnemyManager;

/**
 * ...
 * @author Edwin
 */
class NDiShredderEnemy extends NDiEnemy
{
	private var sizeSmoke:Int;

	public function new(index:Int)
	{
		super(index);
	}
	
	override public function setConfigEnemy(config:Map<String, Dynamic>):Void
	{
		this.sizeSmoke = config.get("param1");
	}
	
	/*OVERRIDES*/
	override public function receiveDamage(matchingFrequency:Map<String, Int>):Float
	{
		return super.receiveDamage(matchingFrequency);
	}
	
	override public function specialAttack()
	{
		this.parentManager.getParentGamePlay().sendSmokeToPlayer(this.sizeSmoke);
	}
	
	override public function onAdded():Void
    {
		super.onAdded();
		this.specialAttack();
	}
	
	override public function onRemoved():Void
	{
		this.parentManager.getParentGamePlay().sendSmokeToPlayer(0, true);
		super.onRemoved();
	}
	
}