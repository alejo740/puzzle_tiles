package game_objects.enemies;
import flambe.display.Font;
import flambe.display.TextSprite;
import flambe.Entity;
import flambe.script.CallFunction;
import flambe.script.Delay;
import flambe.script.Script;
import flambe.script.Sequence;
import flambe.swf.Library;
import format.swf.Data.BlendMode;
import globals.NDiGameConstants;
import globals.NDiGameConstants.NDiTypeToken;
import managers.NDiAudioManager;
import managers.NDiEnemyManager;
import managers.NDiResourcesManager;
import util.NDiRandomUtils;

/**
 * ...
 * @author Edwin
 */
class NDiFootBotEnemy extends NDiEnemy
{
	private var currentColor:Int;
	private var currentTypeTurtle:NDiTypeToken;	
	private var textColor:TextSprite;
	private var enemyNameVariable:String;

	public function new(index:Int)
	{
		super(index);
		this.currentColor = -1;
		this.currentTypeTurtle = NDiTypeToken.NDI_TYPE_TURTLE_NONE;
		this.enemyNameVariable = this.enemyName;
		this.life = this.totalLife = 100;
	}
	
	
	private function changeColor()
	{
		var newIndex:Int = Math.floor(NDiRandomUtils.getRandomFloat(0, 4));
		while (newIndex == this.currentColor)
		{
			newIndex = Math.floor(NDiRandomUtils.getRandomFloat(0, 4));
		}
		this.currentColor = newIndex;
		if (newIndex == 0)
		{
			this.enemyNameVariable = this.enemyName + "_B";
			//this.textColor.text = "BLUE";
			this.currentTypeTurtle = NDiTypeToken.NDI_TYPE_TURTLE_LEONARDO;
		}
		else if (newIndex == 1)
		{
			this.enemyNameVariable = this.enemyName + "_O";
			//this.textColor.text = "ORANGE";
			this.currentTypeTurtle = NDiTypeToken.NDI_TYPE_TURTLE_MICHELANGELO;
		}
		else if (newIndex == 2)
		{
			this.enemyNameVariable = this.enemyName + "_P";
			//this.textColor.text = "PURPLE";
			this.currentTypeTurtle = NDiTypeToken.NDI_TYPE_TURTLE_DONATELLO;
		}
		else if (newIndex == 3)
		{
			this.enemyNameVariable = this.enemyName + "_R";
			//this.textColor.text = "RED";
			this.currentTypeTurtle = NDiTypeToken.NDI_TYPE_TURTLE_RAPHAEL;
		}
		this.animationIdle();
	}
	
	private function addTextColor()
	{
		/*
		var font:Font = NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.FONT_CALIBRI);
		textColor = new TextSprite(font, "");
		textColor.align = TextAlign.Center;
		textColor.x._ = 0;// NDiGameConstants.GAME_WIDTH / 2;
		textColor.y._ = 0;
		textColor.centerAnchor();
		this.owner.addChild(new Entity().add(textColor) );
		*/
	}
	
	
	
	/*OVERRIDES*/
	
	override public function animationIdle()
	{
		this.loop(this.enemyNameVariable + "_idle");
	}
	
	override public function animationHit()
	{
		this.play(this.enemyNameVariable + "_hitReceive");
		//NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.SOUND_ENEMIE_HITRECEIVE);
	}
	
	override public function animationAppear()
	{
		this.play(this.enemyNameVariable + "_appear");
	}
	
	override public function animationDeath()
	{
		this.play(this.enemyNameVariable + "_death");
	}
	
	override public function animationAttack()
	{
		this.play(this.enemyNameVariable + "_attack");
	}
	
	override public function receiveDamage(matchingFrequency:Map<String, Int>):Float
	{
		//super.receiveDamage(value);
		var valueAttack:Float = 0;
		var valueAttack:Float = 0;
		var itTurtle:Iterator<String> = matchingFrequency.keys();
		for (key in itTurtle)
		{
			if (key != NDiGameConstants.TOTAL_TURTLES_TYPE)
			{
				var numTokens:Int = matchingFrequency.get(key);
				var coef:Float = NDiGameConstants.ATTACK_COEF;
				var newValueAttack:Float = NDiGameConstants.ATTACK_DMG * 
				(1 + (numTokens - 1) * coef) * matchingFrequency.get(NDiGameConstants.TOTAL_TURTLES_TYPE);
				newValueAttack = Math.abs(newValueAttack);
				//valueAttack += newValueAttack;
				if (key == this.currentTypeTurtle.getName())
				{
					trace("ATTACK NORMAL");
					valueAttack += newValueAttack;
				}else {
					trace("ATTACK REDUCE");
					valueAttack += newValueAttack * (0.3333333);
				}
				
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
					var newValueAttack:Float = NDiGameConstants.ATTACK_DMG * 
					(1 + (numTokens - 2) * 2);
					newValueAttack = Math.abs(newValueAttack);
					if (key == this.currentTypeTurtle)
					{
						valueAttack += newValueAttack;
					}else {
						valueAttack += newValueAttack * (0.3333333);
					}
				}
			}
		}
		*/
		
		//trace("==## DAMAGE: " + valueAttack);
		
		if (valueAttack <= 0)
			return valueAttack;
		
		this.life -= valueAttack;
		
		if (this.life > 0) {			
			this.animationHit();
			//NDiAudioManager.getInstance().playSoundEffect("sounds/default_attack");			
		}		
		return valueAttack;
	}
	
	
	override public function turnSpecialAttack(matchingFrequency:Map<String, Int>)
	{
		
		super.turnSpecialAttack(matchingFrequency);
		
		if (this.turnsToAttack == this.totalTurnsToAttack)
		{
			this.changeColor();
			this.turnsToAttack = 0;
		}
		
	}
	
	override public function setConfigEnemy(config:Map<String, Dynamic>):Void
	{
		this.totalTurnsToAttack = config.get("param1");
	}
	
	override public function onAdded():Void
    {
		super.onAdded();
		//this.addTextColor();
		this.changeColor();
		
	}
	
	override public function onUpdate(dt:Float):Void
	{
		if (this.parentManager.getParentGamePlay().isGameOver || this.parentManager.isChanging)
			return;
			
		super.onUpdate(dt);
	}
	
}