package game_objects.enemies;
import flambe.swf.Library;
import globals.NDiGameConstants;
import managers.NDiAudioManager;
import managers.NDiEnemyManager;

/**
 * ...
 * @author Edwin
 */
class NDiKrangEnemy extends NDiEnemy
{

	public function new(index:Int)
	{
		super(index);
	}
	
	override public function receiveDamage(matchingFrequency:Map<String, Int>):Float
	{
		return super.receiveDamage(matchingFrequency);
	}
	
	override public function specialAttack()
	{
		this.parentManager.getParentGamePlay().sendObstaclesToPuzzle();
		//NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.SOUND_ENEMIE_HITRECEIVE);
		NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.SOUND_ENEMY_SPECIALATTACK_FOLDER+""+this.enemyName+""+NDiGameConstants.SOUND_ENEMY_SPECIALATTACK_POSTFIX);
		
	}
	
	override public function onAdded():Void
    {
		super.onAdded();
		this.specialAttack();
	}
	
	override public function onRemoved():Void
	{
		this.parentManager.getParentGamePlay().sendObstaclesToPuzzle(true);
		super.onRemoved();
	}
}