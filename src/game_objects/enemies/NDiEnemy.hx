package game_objects.enemies;
import flambe.Component;
import flambe.display.Sprite;
import flambe.Entity;
import flambe.script.CallFunction;
import flambe.script.Delay;
import flambe.script.Script;
import flambe.script.Sequence;
import flambe.swf.Library;
import flambe.swf.MoviePlayer;
import flambe.System;
import globals.NDiGameConstants;
import managers.NDiAudioManager;
import managers.NDiEnemyManager;
import managers.NDiResourcesManager;

/**
 * ...
 * @author Edwin Cobos
 */
class NDiEnemy extends MoviePlayer
{
	//private var character:MoviePlayer;
	public var entity:Entity;
	public var life:Float;
	public var totalLife:Float;
	public var transform:Sprite;
	public var type:NDiTypeEnemy;
	public var indexEnemy:Int;
	public var parentManager:NDiEnemyManager;
	public var enemyName:String;
	public var libraryAnimations:Library;
	public var attackLenghtTime:Float;
	public var turnsToAttack:Int;
	public var totalTurnsToAttack:Int;
	
	public function new(index:Int)
	{
		this.indexEnemy = index;
		this.libraryAnimations = NDiResourcesManager.getInstance().loadSetAnimations(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.ARRAY_PACK_ANIMATIONS_ENEMIES[this.indexEnemy]);
		super(this.libraryAnimations);
		
		this.enemyName = NDiGameConstants.ARRAY_ANIMATION_PREFIX_ENEMIES[this.indexEnemy];
		
		this.life = 100;
		this.totalLife = 100;
		this.transform = new Sprite();
		this.type = NDiTypeEnemy.NDI_TYPE_ENEMY_NONE;
		this.attackLenghtTime = 1;
		this.turnsToAttack = 0;
		this.totalTurnsToAttack = 0;
	}
	
	public function animationIdle()
	{
		this.loop(this.enemyName + "_idle");
	}
	
	public function animationHit()
	{		
		this.play(this.enemyName + "_hitReceive");
		//NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.SOUND_ENEMIE_HITRECEIVE);
	}
	
	public function animationAppear()
	{
		this.play(this.enemyName + "_appear");
	}
	
	public function animationDeath()
	{
		this.play(this.enemyName + "_death");
	}
	
	public function animationAttack()
	{
		this.play(this.enemyName + "_attack");
	}
	
	public function turnSpecialAttack(matchingFrequency:Map<String, Int>)
	{		
		this.turnsToAttack++;
	}
	
	
	public function receiveDamage(matchingFrequency:Map<String, Int>):Float
	{
		//trace(matchingFrequency);
		var valueAttack:Float = 0;
		var itTurtle:Iterator<String> = matchingFrequency.keys();
		for (key in itTurtle)
		{
			if (key != NDiGameConstants.TOTAL_TURTLES_TYPE)
			{
				//trace("KKK -> " + key);
				var numTokens:Int = matchingFrequency.get(key);
				var coef:Float = NDiGameConstants.ATTACK_COEF;
				var newValueAttack:Float = NDiGameConstants.ATTACK_DMG * 
				(1 + (numTokens - 1) * coef) * matchingFrequency.get(NDiGameConstants.TOTAL_TURTLES_TYPE);
				newValueAttack = Math.abs(newValueAttack);
				valueAttack += newValueAttack;
			}
		}
		/*
		var itTurtle:Array<NDiTypeToken> = NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN;
		for (key in itTurtle)
		{
			var numTokens:Int = matchingFrequency.get(key.getName());
			if (numTokens > 0)
			{
				if (key != NDiTypeToken.NDI_TYPE_TURTLE_PIZZA && key != NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER)
				{
					trace(numTokens);
					var coef:Float = 3;
					var newValueAttack:Float = NDiGameConstants.ATTACK_DMG * 
					(1 + (numTokens - 1) * coef);
					newValueAttack = Math.abs(newValueAttack);
					trace(newValueAttack);
					trace("----");
					valueAttack += newValueAttack;
				}
			}
		}*/
		
		trace("==## DAMAGE: " + valueAttack);
		
		if (valueAttack <= 0)
			return valueAttack;
			
		this.life -= valueAttack;
		
		
		if (this.life > 0) {
			this.animationHit();
		}
		
		return valueAttack;
	}
	
	public function specialAttack():Void { }
	
	public function setConfigEnemy(config:Map < String, Dynamic > ):Void { }
	
	public function onAddedFunction():Void { }	
	
	override public function onAdded():Void
    {
		super.onAdded();
		this.owner.add(new Script());
		this.entity.add(this.transform);
		var f1:CallFunction = new CallFunction(function() {
			this.onAddedFunction();
		});
		var seq1:Sequence = new Sequence([new Delay(0.2), f1]);
		this.owner.get(Script).run(seq1);
	}

	
	public function addToEntity():Entity
	{
		this.entity = new Entity();
		this.entity.add(this);
		return this.entity;
	}
	
	public function delete():Void
	{
		this.entity.dispose();
	}
	
	
}