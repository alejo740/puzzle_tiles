package game_objects.enemies;
import flambe.swf.Library;
import managers.NDiEnemyManager;

/**
 * ...
 * @author Edwin
 */
class NDiSpiderBytezEnemy extends NDiEnemy
{
	private var totalCobwebs:Int;

	public function new(index:Int)
	{
		super(index);
		this.totalCobwebs = 0;
	}
	
	override public function setConfigEnemy(config:Map<String, Dynamic>):Void
	{
		this.totalCobwebs = config.get("param1");
		this.transform.y._ -= 30;
	}
	
	override public function receiveDamage(matchingFrequency:Map<String, Int>):Float
	{
		return super.receiveDamage(matchingFrequency);
	}
	
	override public function specialAttack()
	{
		this.parentManager.getParentGamePlay().sendCobwebsToPuzzle(false, this.totalCobwebs);
	}
	
	override public function onAdded():Void
    {
		super.onAdded();
		this.specialAttack();
	}
	
	override public function onUpdate(dt:Float):Void
	{
		super.onUpdate(dt);
	}
	
	override public function onRemoved():Void
	{
		this.parentManager.getParentGamePlay().sendCobwebsToPuzzle(true);
		super.onRemoved();
	}
	
}