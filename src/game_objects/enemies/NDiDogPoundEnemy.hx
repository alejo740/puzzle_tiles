package game_objects.enemies;
import flambe.Component;
import flambe.Entity;
import flambe.swf.Library;
import globals.NDiGameConstants;
import managers.NDiAudioManager;
import managers.NDiEnemyManager;

/**
 * NDiTeravision
 * @author Edwin Cobos
 */
class NDiDogPoundEnemy extends NDiEnemy
{
	
	public function new(index:Int)
	{
		super(index);
	}
	
	/*OVERRIDES*/
	override public function receiveDamage(matchingFrequency:Map<String, Int>):Float
	{
		return super.receiveDamage(matchingFrequency);
	}
	
	override public function specialAttack()
	{
		this.parentManager.getParentGamePlay().doShufflePuzzle();
		NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.SOUND_ENEMY_SPECIALATTACK_FOLDER + "" + this.enemyName + "" + NDiGameConstants.SOUND_ENEMY_SPECIALATTACK_POSTFIX);
	}
	
	override public function onUpdate(dt:Float):Void
	{
		super.onUpdate(dt);
	}
	
	override public function onAdded():Void
    {
		super.onAdded();
		this.specialAttack();
	}
	
}