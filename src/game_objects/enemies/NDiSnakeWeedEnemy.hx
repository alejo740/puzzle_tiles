package game_objects.enemies;
import flambe.script.CallFunction;
import flambe.script.Delay;
import flambe.script.Script;
import flambe.script.Sequence;
import flambe.swf.Library;
import flambe.util.Random;
import globals.NDiGameConstants;
import globals.NDiGameConstants.NDiTypeToken;
import managers.NDiAudioManager;
import managers.NDiEnemyManager;
import util.NDiRandomUtils;

/**
 * NdiTeravision
 * @author Edwin Cobos
 */
class NDiSnakeWeedEnemy extends NDiEnemy
{
	private var countTurtleAttacks:Array<Int>;
	private var totalTurtlesToBlock:Int;
	private var totalTurnsToDestroy:Int;
	
	public function new(index:Int)
	{
		super(index);
		this.totalTurtlesToBlock = 0;
		this.totalTurnsToDestroy = 0;
	}
	
	override public function setConfigEnemy(config:Map<String, Dynamic>):Void
	{
		this.totalTurtlesToBlock = config.get("param1");
		this.totalTurnsToDestroy = config.get("param2");
		this.transform.y._ -= 30;
	}
	
	override public function receiveDamage(matchingFrequency:Map<String, Int>):Float
	{
		///super.receiveDamage(matchingFrequency);
		
		var valueDamage:Float = 0;
		var itTurtle:Array<NDiTypeToken> = NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN;
		for (key in itTurtle)
		{
			var numTokens:Int = matchingFrequency.get(key.getName());
			if (numTokens > 0)
			{
				var newValueDamage:Float = (NDiGameConstants.ATTACK_DMG + 
				(numTokens - 2)) *
				(numTokens * 0.5);
				if (key != NDiTypeToken.NDI_TYPE_TURTLE_PIZZA && key != NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER)
				{
					valueDamage += newValueDamage;
				}
			}
		}
		trace(valueDamage);
		
		this.life -= valueDamage;
		
		if (this.life > 0) {			
			this.animationHit();
		}
		return valueDamage;
	}

	
	
	override public function specialAttack()
	{		
		this.parentManager.getParentGamePlay().sendBlockToPlayer(this.totalTurtlesToBlock, this.totalTurnsToDestroy);
	}
	
	override public function turnSpecialAttack(matchingFrequency:Map<String, Int>)
	{		
		this.parentManager.getParentGamePlay().sendAttackToWeeds(matchingFrequency);
	}
	
	override public function onAddedFunction():Void
    {
		this.specialAttack();
	}
	
	override public function onUpdate(dt:Float):Void
	{
		super.onUpdate(dt);
	}
	
	override public function onRemoved():Void
	{
		this.parentManager.getParentGamePlay().sendBlockToPlayer(0, 0, true);
		super.onRemoved();
	}
	
}