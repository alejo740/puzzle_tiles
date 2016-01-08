package managers;

import flambe.animation.Ease;
import flambe.Component;
import flambe.display.ImageSprite;
import flambe.display.Sprite;
import flambe.display.Texture;
import flambe.Entity;
import flambe.script.CallFunction;
import flambe.script.Delay;
import flambe.script.Script;
import flambe.script.Sequence;
import flambe.swf.Library;
import flambe.swf.MoviePlayer;
import flambe.swf.MovieSprite;
import flambe.System;
import game_objects.enemies.NDiEnemy;
import game_objects.NDiWeed;
import game_objects.turtles.NDiTurtle;
import globals.NDiGameConstants;
import globals.NDiGameGlobals;
import scenes.components.NDiAnimationMovie;
import scenes.components.NDiAttackAnimationPlayer;
import scenes.NDiGamePlayScene;
import util.NDiRandomUtils;

/**
 * NDiTeravision
 * @author Edwin Cobos
 */
class NDiPlayerManager extends Component
{
	private var score:Float;
	private var life:Float;
	private var player:Array<NDiTurtle>;
	private var distanceTurtles:Float;
	private var parentGamePlayScene:NDiGamePlayScene;
	private var currentBlockedTurtle:Array<NDiTurtle>;
	private var currentWeed:Array<NDiWeed>;
	private var currentIndexWeed:Array<Int>;
	private var weedLib:Library;
	public var firstTurtleAttack:Bool;
	
	public var transform:Sprite;
	public var entity:Entity;

	public function new(parent:NDiGamePlayScene)
	{
		this.score = 0;
		this.distanceTurtles = 109;
		this.life = 100;
		this.transform = new Sprite();
		this.player = new Array<NDiTurtle>();		
		this.parentGamePlayScene = parent;		
		this.currentWeed = new Array<NDiWeed>();
		this.currentBlockedTurtle = new Array<NDiTurtle>();
		this.currentIndexWeed = new Array<Int>();
		this.firstTurtleAttack = false;
	}
	
	private function addTurtles():Void
	{
		var spriteTurtles:Array<String> = NDiGameConstants.ARRAY_ANIMATION_PREFIX_TURTLES;
		var libraryAnimations:Library = NDiResourcesManager.getInstance().loadSetAnimations(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.PACK_ANIMATIONS_TURTLES);
		for (index in 0...spriteTurtles.length)
		{
			var newTurtle:NDiTurtle = new NDiTurtle(libraryAnimations);
			newTurtle.type = NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[index + 1];
			this.player[index] = newTurtle;
			this.owner.addChild(new Entity().add(this.player[index]));
			this.player[index].owner.add(new Script());
			//this.player[index].loop(spriteTurtles[index] + "_idle");
			this.player[index].indexTurtle = index;
			this.player[index].turtleName = spriteTurtles[index];
			this.player[index].animationIdle();
			newTurtle.transform.x._ = NDiGameConstants.ARRAY_X_POSITION_TURTLES[index];
			var difHeight:Float = Math.abs(System.stage.height - (NDiGameConstants.GAME_HEIGHT * NDiGameGlobals.getInstance().currentScaleGame))*0.5;
			newTurtle.transform.y._ = (NDiGameConstants.GAME_HEIGHT - 80) + difHeight;			
		}
	}
	

	
	
	
	public function setDamage(value:Float)
	{
		if (value < 0)
		{
			var index:Int = Math.floor(NDiRandomUtils.getRandomFloat(0, this.player.length));
			this.player[index].animationDamage();
		}
		
		this.life += value;
		
		if (this.life < 0){
			this.life = 0;
		}else if (this.life > 100)
		{
			this.life = 100;
		}
	}
	
	public function destroyBlock()
	{
		//if (this.currentWeed != null)
		for(i in 0...this.currentWeed.length)
		{
			//this.currentBlockedTurtle.isBlocked = false;			
			if (this.currentWeed[i].owner != null)
				this.currentWeed[i].animationDisappear();
				
			this.currentWeed[i] = null;
		}
		for(i in 0...this.currentBlockedTurtle.length)
		{
			this.currentBlockedTurtle[i].isBlocked = false;
		}
		this.currentBlockedTurtle.splice(0, this.currentBlockedTurtle.length);
		this.currentWeed.splice(0, this.currentWeed.length);
	}
	
	private function getUniqueTurtle():Int
	{
		var tmpIndex:Int = Math.floor(NDiRandomUtils.getRandomFloat(0, 4));
		var finalIndex:Int = tmpIndex;
		for (i in 0...this.currentIndexWeed.length)
		{
			if (this.currentIndexWeed[i] == tmpIndex)
			{
				finalIndex = this.getUniqueTurtle();
				break;
			}
		}
		return finalIndex;
	}
	
	public function createBlocks(totalBlocks:Int, lifeWeed:Int)
	{
		this.destroyBlock();
		
		//var arrayIndex:Array<Int> = new Array<Int>();
		for (i in 0...totalBlocks)
		{			
			this.currentIndexWeed[i] = this.getUniqueTurtle();
		}
		this.changeBlockPlayers(this.currentIndexWeed, lifeWeed);
	}
	
	public function changeBlockPlayers(playersToBlock:Array<Int>, lifeWeed:Int)
	{
		for (i in 0...playersToBlock.length)
		{
			this.blockPlayer(NDiGameConstants.ARRAY_TYPE_TURTLES[playersToBlock[i]], lifeWeed);
		}
	}
	
	private function blockPlayer(playerToBlock:NDiTypeToken, lifeWeed:Int)
	{
		
		for (index in 0...this.player.length)
		{
			if (this.player[index].type == playerToBlock)
			{
				this.currentBlockedTurtle.push(this.player[index]);
				this.player[index].isBlocked = true;
				//NDiResourcesManager.getInstance().l//..loadA(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.BLOCKED_VINE);
				//var tmpVine:ImageSprite = new ImageSprite(vineTexture);
				var tmpVine:NDiWeed = new NDiWeed(this.weedLib, lifeWeed, this.player[index]);
				//tmpVine.centerAnchor();
				tmpVine.transform.x._ = 0;
				tmpVine.transform.y._ = 30;
				this.currentWeed.push(tmpVine);
				this.player[index].owner.addChild(new Entity().add(tmpVine));
				
				//this.owner.addChild(new Entity().add(tmpVine));
				tmpVine.animationIdle();
				tmpVine.animationCreate();
				trace("BLOCKED");
				break;
			}
		}
	}
	
	public function attackToWeeds(matchingFrequency:Map<String, Int>)
	{
		//trace("turnSpecialAttack "+matchingFrequency);
		var it:Iterator<String> = matchingFrequency.keys();
		for (i in it)
		{
			//trace(i);
			if (matchingFrequency.get(i) > 0)
			{
				for (p in 0...this.currentIndexWeed.length)
				{
					if (i == NDiGameConstants.ARRAY_TYPE_TURTLES[this.currentIndexWeed[p]].getName())
					{
						if (this.currentWeed[p].life > 0)
							this.currentWeed[p].receiveDamage(matchingFrequency.get(i));
					}
				}
			}
		}
	}
	
	public function setScore(matchingFrequency:Map<String, Int>):Void
	{
		
		var valueScore:Float = ( (NDiGameConstants.SCORE_VALUE_COLOR * 2) +
		((matchingFrequency.get(NDiGameConstants.TOTAL_TOKENS_TYPE) - 2 ) * 15) ) +
		(matchingFrequency.get(NDiTypeToken.NDI_TYPE_TURTLE_PIZZA.getName()) * NDiGameConstants.SCORE_VALUE_PIZZA) +
		(matchingFrequency.get(NDiTypeToken.NDI_TYPE_TURTLE_SPLINTER.getName()) * NDiGameConstants.SCORE_VALUE_SPLINTER);
		
		this.score += valueScore;
		
	}
	
	public function checkTurtleBlocked(matchingFrequency:Map<String, Int>):Bool
	{
		var blockedAlone:Bool = false;
		for (index in 0...this.player.length)
		{
			var tmpTurtle:NDiTurtle = this.player[index];
			var freq:Int = matchingFrequency.get(tmpTurtle.type.getName());
			if (freq > 0)
			{
				if (tmpTurtle.isBlocked)
				{
					blockedAlone = true;
				}else {
					blockedAlone = false;
				}
			}
		}
		
		return blockedAlone;
	}
	
	public function selectTurtleToAttack(matchingFrequency:Map<String, Int>):Int
	{
		var libraryAnimations:Library = NDiResourcesManager.getInstance().loadSetAnimations(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.PACK_ANIMATIONS_ATTACK_TURTLES);
		var arrayTurtlesToAttack:Array<NDiTurtle> = new Array<NDiTurtle>();
		
		var arrayFrequencyMatch:Map<String, Int> = new Map<String, Int>();
		
		var countedTurtles:Int = 0;
		for (p in 0...NDiGameConstants.ARRAY_APPEAR_ORDER_ANIMATIONS.length)
		{
			//trace("ORDERRRRR");
			var itMacth:Iterator<String> = matchingFrequency.keys();
			for (key in itMacth)
			{
				var value:Int = matchingFrequency.get(key);
				if (value > 0)
				{
					//trace(NDiGameConstants.ARRAY_APPEAR_ORDER_ANIMATIONS[p].getName()+" :++valeu++: " + key);
					if (NDiGameConstants.ARRAY_APPEAR_ORDER_ANIMATIONS[p].getName() == key)
					{						
						for (q in 0...this.player.length)
						{
							if (this.player[q].type.getName() == key && !this.player[q].isBlocked)
							{
								arrayTurtlesToAttack.push(this.player[q]);
								arrayFrequencyMatch.set(this.player[q].type.getName(), matchingFrequency.get(this.player[q].type.getName()));
								break;
							}else if (this.player[q].isBlocked)
							{
								trace("BloCked...");
							}
						}
						break;
					}
				}
			}
		}
		
		countedTurtles = arrayTurtlesToAttack.length - 1;
		this.firstTurtleAttack = false;
		var countAnimationsAttacks:Int = 0;		
		for (p in 0...arrayTurtlesToAttack.length)
		{
			
			//trace("PUSH ATTACKSSSS " + arrayTurtlesToAttack[p].turtleName);
			var f0:CallFunction = new CallFunction(function() {
				arrayTurtlesToAttack[p].animationJump();
				//trace("PUSH JUMP " + arrayTurtlesToAttack[p].turtleName);
				if (p == 0)
				{
					NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.SOUND_TMNT_JUMP);
				}
				var f1:CallFunction = new CallFunction(function() {					
					
					var tmp:NDiTurtle = arrayTurtlesToAttack[countAnimationsAttacks];
						tmp.transform.visible = false;
						tmp.loop("empty_animation");
						//trace(tmp.turtleName);
						var newAttack:NDiAttackAnimationPlayer = new NDiAttackAnimationPlayer(libraryAnimations, tmp, this);
						newAttack.attackName = tmp.turtleName;//NDiGameConstants.ARRAY_ANIMATION_PREFIX_TURTLES[tmp.indexTurtle];						
						//trace(arrayTurtlesToAttack.length);
						var freq:Int = arrayFrequencyMatch.get(tmp.type.getName());						
						newAttack.frequencyMatch 	= freq;
						newAttack.totalTurtles 		= arrayTurtlesToAttack.length;
						
						newAttack.transform.x._ 	= NDiGameConstants.ARRAY_POSITIONS_ANIMATIONS_ATTACK[tmp.indexTurtle].x;
						newAttack.transform.y._ 	= NDiGameConstants.ARRAY_POSITIONS_ANIMATIONS_ATTACK[tmp.indexTurtle].y;
						//this.owner.addChild(new Entity().add(newAttack));
						new Entity().add(newAttack);
						this.parentGamePlayScene.sendAttackAnimationToHUD(newAttack.owner);						
						if (countAnimationsAttacks == 0)
						{
							if (arrayTurtlesToAttack.length == 4)
							{
								NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.SOUND_TMNT_ATTACK2);
							}else{
								NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.SOUND_TMNT_ATTACK);
							}
						}
						newAttack.animationIdle(countAnimationsAttacks, countedTurtles--);
						countAnimationsAttacks++;
				});
				
				var seq1:Sequence = new Sequence([new Delay(0.245), f1]);
				arrayTurtlesToAttack[p].owner.get(Script).run(seq1);
			});
			
			//var seq0:Sequence = new Sequence([new Delay(p * 0.09), f0]);
			var seq0:Sequence = new Sequence([new Delay(0), f0]);
			this.owner.get(Script).run(seq0);		
			
		}
		
		return countedTurtles+1;
	}
	
	public function addHealthParticles(matchingFrequency:Map<String, Int>)
	{
		var lib:Library = NDiResourcesManager.getInstance().loadSetAnimations(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.HEALTH_PARTICLES_PACK);
		var particles:NDiAnimationMovie = new NDiAnimationMovie(lib, NDiGameConstants.HEALTH_PARTICLES_ANIMATION);		
		particles.transform.x._ = 0;
		particles.transform.y._ = NDiGameConstants.GAME_HEIGHT;
		this.owner.addChild(new Entity().add(particles));
		particles.animationIdle(false, 0.9166, "", this.endingHealthParticles, matchingFrequency);
		NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.SOUND_TMNT_HEALTH);
	}
	
	private function endingHealthParticles(matchingFrequency:Map<String, Int>):Void
	{
		//this.parentGamePlayScene.checkTurnToAttackPlayer(matchingFrequency);
		//this.parentGamePlayScene.setPauseTimerToAttackPaused(false);
	}
	
	public function getScore():Float
	{
		return this.score;
	}
	
	public function getLife():Float
	{
		return this.life;
	}
	
	public function setLife(value:Float):Void
	{
		this.life = value;
	}
	
	public function getParentManager():NDiGamePlayScene
	{
		return this.parentGamePlayScene;
	}
	
	public function getPercentLife():Float
	{
		return (this.life / 100);
	}
	
	override public function onAdded():Void
    {
		this.weedLib = NDiResourcesManager.getInstance().loadSetAnimations(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.WEED_ANIMATION_PACK);
		this.owner.add(this.transform);
		this.owner.add(new Script());
		//this.transform.x._ = (NDiGameConstants.GAME_WIDTH * 0.5);
		//this.transform.y._ = System.stage.height;
		this.addTurtles();
		trace("INIT PLAYER MANAGER");
	}
	
	public function addToEntity():Entity
	{
		this.entity = new Entity();
		this.entity.add(this);
		return this.entity;
	}
	
}