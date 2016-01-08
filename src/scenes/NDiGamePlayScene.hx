package scenes;

import flambe.display.FillSprite;
import flambe.display.ImageSprite;
import flambe.display.Sprite;
import flambe.display.Texture;
import flambe.Entity;
import flambe.input.PointerEvent;
import flambe.scene.Scene;
import flambe.script.CallFunction;
import flambe.script.Delay;
import flambe.script.Script;
import flambe.script.Sequence;
import flambe.sound.Sound;
import flambe.swf.Library;
import flambe.System;
import game_objects.enemies.NDiEnemy;
import globals.NDiGameConstants;
import globals.NDiGameGlobals;
import managers.NDiAudioManager;
import managers.NDiEnemyManager;
import managers.NDiHud;
import managers.NDiPlayerManager;
import managers.NDiResourcesManager;
import managers.NDiSceneManager;
import managers.NDiTokenManager;
import scenes.components.NDiAnimationMovie;
import scenes.components.NDiGameOver;
import scenes.components.NDiPause;
import util.NDiRandomUtils;
import util.NDiSaveData;

/**
 * NDiTeravision
 * @author Edwin Cobos
 */
class NDiGamePlayScene extends NDiAbstractScene
{
	private var puzzleBoard:NDiTokenManager;
	private var rootEntity:Entity;
	private var enemyManager:NDiEnemyManager;
	private var hud:NDiHud;
	private var playerManager:NDiPlayerManager;
	private var leftEntity:Entity;
	private var rightEntity:Entity;
	private var pauseScene:NDiPause;
	private var currentRound:Int;
	private var currentRange:Int;
	
	private var backgroundGamePlay:ImageSprite;
	private var gameOverDisplay:NDiGameOver;

	public var isGameOver:Bool;
	public var isGamePause:Bool;
	public var checkPushPizzas:Bool;
	
	
	public function new() 
	{		
		super();
		this.rootEntity = new Entity();
		this.leftEntity = new Entity();
		this.rightEntity = new Entity();
		this.puzzleBoard = new NDiTokenManager(this);
		this.enemyManager = new NDiEnemyManager(this);
		this.hud = new NDiHud(this);
		this.playerManager = new NDiPlayerManager(this);
		this.isGameOver = false;
		this.isGamePause = false;
		this.rootEntity.add(new Script());
		this.pauseScene = new NDiPause(this);
		this.currentRound = 0;
		this.currentRange = 0;
		this.checkPushPizzas = false;
		
		
		this.initAssets();
		
	}
	
	private function initAssets()
	{
		var backgroundTexture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/backgrounds/background1");
		this.backgroundGamePlay = new ImageSprite(backgroundTexture);
		
		this.gameOverDisplay = new NDiGameOver();
	}
	
	/**
	 * Function to launch and manage the sequence of animations of turtle attacks
	 * @param	matchingFrequency
	 * @param	Int
	 */
	public function attackSystem(matchingFrequency:Map<String, Int>):Void
	{
		trace("ATTACK TO ENEMYYYYYYYY");
		
		this.playerManager.setScore(matchingFrequency);
		this.hud.updateScore(this.playerManager.getScore());
		
		//THIS LINE MAKES THE MAGIC
		var numTurtlesToAttack:Int = this.playerManager.selectTurtleToAttack(matchingFrequency); 
		
		var pizzaMatches:Int = matchingFrequency.get(NDiTypeToken.NDI_TYPE_TURTLE_PIZZA.getName());
	
		var f0:CallFunction = new CallFunction(function() {
			if (pizzaMatches > 0)
			{
				this.playerManager.addHealthParticles(matchingFrequency);				
				this.PizzaBonus(pizzaMatches);
			}else {
				//this.checkTurnToAttackPlayer(matchingFrequency);
				///this.setPauseTimerToAttackPaused(false);
			}
		});
		this.enemyManager.getCurrentEnemy().turnSpecialAttack(matchingFrequency);
		var seq0:Sequence = new Sequence([new Delay(numTurtlesToAttack * 1.08), f0]);
		this.playerManager.owner.get(Script).run(seq0);
	}
	
	/**
	 * Function to give life to turtles when the player catches pizzas
	 * @param	pizzaMatches
	 */
	private function PizzaBonus(pizzaMatches:Int)
	{
		var lifeConstant:Float = 15;
		var value:Float = (pizzaMatches * lifeConstant) + (pizzaMatches - 1) * (lifeConstant * 0.5);
		trace("### PIZZAS: " + value);
		this.attackToPlayer(value);
	}
	
	
	/**
	 * Function to execute the enemy attack routine when timer is off
	 * @param	value
	 */
	public function attackToPlayer(value:Float)
	{
		trace("Attack Value" + value);		
		if (value < 0)
		{
			this.hud.showPlayerEffectDamage();
		}
		this.playerManager.setDamage(value);
		var currentLifePlayer:Float = this.playerManager.getLife();
		this.hud.updatePlayerLife(currentLifePlayer);
		if (currentLifePlayer < 1)
		{
			this.gameOver();
		}
	}
	
	/**
	 * Function to execute the player attack to enemy and update the HUD
	 * @param	matchingFrequency
	 * @param	Int
	 */
	public function attackToEnemie(matchingFrequency:Map<String, Int>):Void
	{
		this.enemyManager.receiveDamage(matchingFrequency);
		this.updateHUDEnemyLife();
	}
	
	/**
	 * Function to initialize the name of enemy when it appears in HUD
	 * @param	enemy
	 */
	public function initHUDEnemy(enemy:NDiTypeEnemy) {
		this.hud.setEnemy(enemy);
	}
	
	/**
	 * Function to update the enemy life of enemy in HUD
	 */
	public function updateHUDEnemyLife()
	{
		this.hud.updateEnemyLife(this.enemyManager.getLife(), this.enemyManager.getTotalLife());
	}
	
	/**
	 * Function to update de timer attack in HUD
	 */
	public function updateHUDTimeToAttack()
	{
		this.hud.updateTimerToAttack(this.enemyManager.getPercentTimeToAttack());
	}
	
	/**
	 * Function to execute the routine of Shuffle in the puzzle
	 */
	public function doShufflePuzzle()
	{
		this.puzzleBoard.shuffle();
	}
	
	/**
	 * Function to cancel the current match selected by player
	 */
	public function puzzleInvalidMatch()
	{
		this.puzzleBoard.unSelectTokens();
		this.puzzleBoard.unSelectLines();
	}
	
	
	public function checkPopupTurtleAttack(thereTurtles:Bool, matchingFrequency:Map<String, Int>)
	{
		if (thereTurtles)
		{
			if (!this.playerManager.checkTurtleBlocked(matchingFrequency))
			{
				this.sendBlockToPuzzle(true, NDI_POPUP_TURTLE_ATTACK);
			}
		}
	}
	
	/**
	 * Function to block the puzzle with cobwebs
	 * @param	block
	 * @param	popupType
	 */
	public function sendBlockToPuzzle(block:Bool=false, popupType:NDiTypePopupPuzzle = null)
	{
		if (this.getStateEnemyChange())
			return;
			
		if (block)
		{
			this.setPauseTimerToAttackPaused(true);
			this.puzzleBoard.blockPuzzle(popupType);
		}else {			
			this.puzzleBoard.unBlockPuzzle();
			var f1:CallFunction = new CallFunction(function() {
				this.setPauseTimerToAttackPaused(false);
			});
			var seq1:Sequence = new Sequence([new Delay(0.3), f1]);
			this.puzzleBoard.owner.get(Script).run(seq1);
		}
	}
	
	public function sendAttackAnimationToHUD(attackEntity:Entity)
	{
		this.hud.owner.addChild(attackEntity);
	}
	
	public function sendComboAttackToPlayer(comboAttack:NDiAnimationMovie)
	{
		this.playerManager.owner.addChild(comboAttack.owner);
	}
	
	public function sendCobwebsToPuzzle(destroy:Bool, value:Int = 0)
	{
		if (!destroy)
			this.puzzleBoard.createRandomCobwebs(value);
		else
			this.puzzleBoard.destroyCobwebs();
	}
	
	public function sendObstaclesToPuzzle(destroy:Bool = false)
	{
		if (!destroy)
			this.puzzleBoard.createRandomObstacles();
		else
			this.puzzleBoard.destroyObstacles();
	}
	
	public function sendAttackToWeeds(matchingFrequency:Map<String, Int>)
	{		
		this.playerManager.attackToWeeds(matchingFrequency);
	}
	public function sendBlockToPlayer(totalBlocks:Int, lifeWeed:Int, destroy:Bool = false)
	{
		if(!destroy)
			this.playerManager.createBlocks(totalBlocks, lifeWeed);
		else
			this.playerManager.destroyBlock();
	}
	
	public function sendSmokeToPlayer(sizeSmoke:Int, destroy:Bool = false)
	{
		if (!destroy)
		{
			this.puzzleBoard.hideTokens(sizeSmoke);
		}else {
			this.puzzleBoard.goBackStateTokenHiden();
		}
	}
	
	/**
	 * Function to get the current level of life of enemy (in percentage)
	 * @return
	 */
	public function getEnemyPercentLife():Float
	{
		return this.enemyManager.getPercentLife();
	}
	
	/**
	 * Function to get the current level of life of player's (in percentage)
	 * @return
	 */
	public function getPlayerPercentLife():Float
	{
		return this.playerManager.getPercentLife();
	}
	
	/**
	 * Function to get the current transition state of change enemies.
	 * @return
	 */
	public function getStateEnemyChange():Bool
	{
		return this.enemyManager.isChanging;
	}
	
	/**
	 * Function to enable/disable the attack timer of enemy
	 * @param	value
	 */
	public function setPauseTimerToAttackPaused(value:Bool)
	{
		this.enemyManager.isTimerToAttackPaused = value;
	}
	
	/**
	 * Function to execute the Game Over routine
	 */
	public function gameOver()
	{
		if (!this.isGameOver)
		{
			trace("GAME OVER");
			
			//this.rootEntity.addChild(new Entity().add(newGameOverDisplay));
			this.gameOverDisplay.setValues(this.playerManager.getScore(), this.enemyManager.getNumOfDefeatedEnemies());
			new Entity().add(this.gameOverDisplay);
			NDiSceneManager.getInstance().director.pushScene(this.gameOverDisplay.owner);
			this.isGameOver = true;
		}
	}
	
	/**
	 * Function to enable/disable game pause.
	 * @param	active
	 */
	public function gamePause(active:Bool = true)
	{
		if (active)
		{
			this.isGamePause = true;
			new Entity().add(this.pauseScene);
			NDiSceneManager.getInstance().director.pushScene(this.pauseScene.owner);
		}else {
			NDiSceneManager.getInstance().director.popScene();
			this.isGamePause = false;
			//NDiSceneManager.getInstance().director.unwindToScene(this.owner);
		}
	}
	
	
	/**
	 * Function to check if is time to push a constant number of Pizzas every # of rounds
	 */
	private function checkPizzaRound()
	{
		this.checkPushPizzas = false;
		if ((this.currentRound+1)%5 == 0)
		{
			this.checkPushPizzas = true;
		}
	}
	
	
	
	/**
	 * Group of functions to change and know the state of Round and its Range
	 */
	
	 public function nextRound()
	{
		this.currentRound++;
		this.currentRange = NDiResourcesManager.getInstance().getRangeOfRound(this.currentRound);
		this.checkPizzaRound();
	}
	public function previousRound()
	{
		this.currentRound--;
		this.currentRange = NDiResourcesManager.getInstance().getRangeOfRound(this.currentRound);
		this.checkPizzaRound();
	}
	public function getRound():Int
	{
		return this.currentRound;
	}
	public function getRange():Int
	{
		return this.currentRange;
	}
	
	
	/**
	 * Function to create the main zones of display
	 */
	private function addSystemDominantHanded()
	{
		/*Left*/		
		var transformLeft:Sprite = new Sprite();
		this.leftEntity.add(transformLeft);
		this.rootEntity.addChild(this.leftEntity);
		
		/*Right*/		
		var transformRight:Sprite = new Sprite();
		this.rightEntity.add(transformRight);
		this.rootEntity.addChild(this.rightEntity);
		
		if (NDiGameGlobals.getInstance().isRightHanded)
		{
			transformRight.x._ = NDiGameConstants.GAME_WIDTH / 2;
			transformRight.y._ = 0;
			transformLeft.x._ = 0;
			transformLeft.y._ = 0;
		}else {
			transformLeft.x._ = NDiGameConstants.GAME_WIDTH / 2;
			transformLeft.y._ = 0;
			transformRight.x._ = 0;
			transformRight.y._ = 0;
		}
	}
	
	/**
	 * Function to setup debug system
	 */
	private function addDebugSystem()
	{
		if (NDiGameGlobals.getInstance().bCycleEnemies)
			this.enemyManager.addDebug();
	}
	
	override public function onAdded():Void
    {
		super.onAdded();
		this.owner.addChild(this.rootEntity);
		
		/*Add Background*/
		this.addBackground();
		
		/*Add Handed Config*/
		this.addSystemDominantHanded();
		
		
		
		
		/*Add Puzzle Board*/
		this.rightEntity.addChild(this.puzzleBoard.addToEntity());
		
		/*Add Enemy*/
		this.leftEntity.addChild(this.enemyManager.addToEntity());				
		
		/*Add Player*/
		this.leftEntity.addChild(this.playerManager.addToEntity());
		
		
		
		
		
		/*Add HUD*/
		this.rootEntity.addChild(this.hud.addToEntity());
		
		this.initHud();
		
		var seq:Sequence = new Sequence([new Delay(5), new CallFunction(function() {
			//TO DO SOMETHING AT BEGIN
			})]);
		this.rootEntity.get(Script).run(seq);
		
		this.addDebugSystem();
	}
	
	private function initHud()
	{
		this.hud.updateTimerToAttack(this.enemyManager.getPercentTimeToAttack());
		
		this.hud.updateEnemyLife(this.enemyManager.getLife(), this.enemyManager.getTotalLife());
		this.hud.updatePlayerLife(this.playerManager.getLife());
		
		this.initHUDEnemy(NDiGameConstants.ARRAY_ENUM_TYPE_ENEMIES[this.enemyManager.indexEnemy + 1]);
	}
	
	private function addBackground()
	{
		
		this.backgroundGamePlay.centerAnchor();
		this.backgroundGamePlay.y._ = NDiGameConstants.GAME_HEIGHT * 0.5;
		this.backgroundGamePlay.x._ = NDiGameConstants.GAME_WIDTH * 0.5;
		this.rootEntity.addChild(new Entity().add(this.backgroundGamePlay));
		
	}
	
	override public function onEnterForeground(e:Dynamic)
	{
		super.onEnterForeground(e);
		
		if (!this.isGamePause && !this.isGameOver)
		{
			this.gamePause();
		}
	}
	
	override public function onEnterBackground(e:Dynamic)
	{
		super.onEnterBackground(e);
	}
	
	override public function onRemoved():Void
	{
	}

	override public function onUpdate(dt:Float):Void
	{
		super.onUpdate(dt);		
	}	
}