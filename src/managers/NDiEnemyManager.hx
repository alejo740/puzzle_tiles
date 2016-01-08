package managers;

import factories.NDiEnemyFactory;
import flambe.Component;
import flambe.display.FillSprite;
import flambe.display.Font;
import flambe.display.ImageSprite;
import flambe.display.Sprite;
import flambe.display.TextSprite;
import flambe.display.Texture;
import flambe.Entity;
import flambe.input.PointerEvent;
import flambe.script.CallFunction;
import flambe.script.Delay;
import flambe.script.Script;
import flambe.script.Sequence;
import flambe.sound.Sound;
import flambe.swf.Library;
import flambe.swf.MoviePlayer;
import flambe.System;
import game_objects.enemies.NDiEnemy;
import game_objects.enemies.NDiMouserEnemy;
import globals.NDiGameConstants;
import globals.NDiGameGlobals;
import scenes.components.NDiAnimationMovie;
import scenes.components.NDiButton;
import scenes.components.NDiImage;
import scenes.NDiGamePlayScene;
import util.NDiRandomUtils;

/**
 * NDiTeravision
 * @author Edwin Cobos
 */
class NDiEnemyManager extends Component
{
	private var currentEnemy:NDiEnemy;	
	private var parentGamePlayScene:NDiGamePlayScene;
	private var libraryAnimations:Library;
	
	//private var totalTurnsToAttack:Int;
	//private var currentTurnToAttack:Int;
	private var totalTimeToAttack:Float;
	private var elapsedTimeToAttack:Float;
	public var isTimerToAttackPaused:Bool;
	
	
	private var countDefeatedEnemies:Int;
	private var rangeEnemies:Array<NDiTypeEnemy>;
	private var configVars:Map<String, Dynamic>;
	private var valueAttack:Float;
	
	
	public var indexEnemy:Int;
	public var isChanging:Bool;
	public var isAttacking:Bool;
	public var transform:Sprite;
	public var entity:Entity;
	
	public function new(parent:NDiGamePlayScene) 
	{
		this.parentGamePlayScene = parent;
		this.indexEnemy = -1;
		this.transform = new Sprite();
		this.isChanging = false;
		this.isAttacking = false;
		
		//this.totalTurnsToAttack = 3;
		//this.currentTurnToAttack = 3;
		this.elapsedTimeToAttack = 0;
		this.totalTimeToAttack = 10;
		this.isTimerToAttackPaused = false;
		
		this.countDefeatedEnemies = 0;
		this.rangeEnemies = new Array<NDiTypeEnemy>();
		this.valueAttack = 0;
		
	}
	
	
	
	private function loadEnemy()
	{
		trace("### ROUND: " + this.parentGamePlayScene.getRound());
		trace("### RANGE: " + this.parentGamePlayScene.getRange());
		
		/*AddCharacter*/
		//var spriteEnemies:Array<String> = NDiGameConstants.ARRAY_ANIMATION_PREFIX_ENEMIES;
		this.currentEnemy = NDiEnemyFactory.createEnemy(indexEnemy);
		
		if (this.currentEnemy == null)
		{
			trace("::::Problem to load enemy " + NDiGameConstants.ARRAY_ENUM_TYPE_ENEMIES[indexEnemy + 1]);
			return;
		}
				
		this.currentEnemy.transform.x._ = NDiGameConstants.GAME_WIDTH * 0.25;
		this.currentEnemy.transform.y._ = NDiGameConstants.GAME_HEIGHT * 0.5;
		
		this.configEnemyVars();		
		this.entity.addChild(this.currentEnemy.addToEntity());		
		this.currentEnemy.animationIdle();
		NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.SOUND_ENEMY_APPEAR);
		this.currentEnemy.animationAppear();
		
		var f1:CallFunction = new CallFunction(function() {
			this.parentGamePlayScene.sendBlockToPuzzle();
		});
		var seq1:Sequence = new Sequence([new Delay(0.99), f1]);
		this.currentEnemy.owner.get(Script).run(seq1);
		//
	}
	
	public function configEnemyVars()
	{
		this.currentEnemy.type = NDiGameConstants.ARRAY_ENUM_TYPE_ENEMIES[indexEnemy + 1];
		this.currentEnemy.parentManager = this;
		
		var currentRound:Int = this.getParentGamePlay().getRound();
		var currentRange:Int = this.getParentGamePlay().getRange();
		this.configVars = NDiGameConstants.CONFIG_VARS_ENEMY_ARRAY[currentRange].get(this.currentEnemy.type);
		
		this.valueAttack = configVars.get("damage");
		//this.currentTurnToAttack = this.totalTurnsToAttack = configVars.get("turns");
		this.elapsedTimeToAttack = 0;
		this.totalTimeToAttack = configVars.get("time");
		this.currentEnemy.life = this.currentEnemy.totalLife = configVars.get("hitPoints");
		this.currentEnemy.setConfigEnemy(this.configVars);
	}
	
	public function receiveDamage(matchingFrequency:Map<String, Int>)
	{
		this.currentEnemy.receiveDamage( matchingFrequency );
		
		if (Math.floor(this.currentEnemy.life) < 1){
			this.currentEnemy.life = 0;
			this.changeEnemy();
		}
	}
	
	public function getLife():Float
	{
		return this.currentEnemy.life;
	}
	public function getTotalLife():Float
	{
		return this.currentEnemy.totalLife;
	}
	
	/*
	public function getTurnsToAttack():Int
	{
		return this.currentTurnToAttack;
	}
	*/
	public function getElapsedTimeToAttack():Float
	{
		return this.elapsedTimeToAttack;
	}
	
	public function getPercentTimeToAttack():Float
	{
		return this.elapsedTimeToAttack / this.totalTimeToAttack;
	}
	
	public function getNumOfDefeatedEnemies():Int
	{
		return this.countDefeatedEnemies;
	}
	
	private function selectEnemy(next:Bool)
	{	
		var round:Int = this.parentGamePlayScene.getRound();
		
		if (next)
		{
			this.parentGamePlayScene.nextRound();
		}else
		{
			this.parentGamePlayScene.previousRound();
		}
		
		if (this.parentGamePlayScene.getRound() < 0)
		{
			this.parentGamePlayScene.nextRound();
		}
		
		this.selectUniqueRandomEnemy();
		
	}
	
	private function selectUniqueRandomEnemy():Void
	{		
		var indexSelected:Int = 0;
		
		do {
			indexSelected = this.selectRandomEnemy();
		}while (this.indexEnemy == indexSelected);
		trace("--+--# "+indexSelected);
		this.indexEnemy = indexSelected;
	}
	
	private function selectRandomEnemy():Int
	{
		//var percentRandom:Float = NDiRandomUtils.getRandomFloat(0, 1);
		var percentRandom:Float = Math.random();
		//trace("### --- "+percentRandom);
		var currentRange:Int = this.parentGamePlayScene.getRange();
		trace("ss -> " + currentRange);
		var percents:Map < NDiTypeEnemy, Float > = NDiGameConstants.PERCENT_WEIGHT_ENEMY_ARRAY[currentRange];
		var indexSelected:Int = 0;
		
		var it:Iterator<NDiTypeEnemy> = percents.keys();
		var keySelected:NDiTypeEnemy = null;
		for (key in it)
		{
			var p:Float = percents.get(key);
			//trace("Key " + key);
			if (percentRandom < p)
			{
				trace("### --- " + percentRandom);
				trace("### +++ " + p);
				keySelected = key;
				break;
			}
		}
		
		for (i in 1...NDiGameConstants.ARRAY_ENUM_TYPE_ENEMIES.length)
		{			
			if (NDiGameConstants.ARRAY_ENUM_TYPE_ENEMIES[i] == keySelected)
			{
				indexSelected = i-1;
				break;
			}
		}
		/*
		for (i in 1...NDiGameConstants.ARRAY_ENUM_TYPE_ENEMIES.length)
		{
			var p:Float = percents.get(NDiGameConstants.ARRAY_ENUM_TYPE_ENEMIES[i]);
			trace("### --- " + NDiGameConstants.ARRAY_ENUM_TYPE_ENEMIES[i]);
			if (percentRandom < p)
			{
				
				trace("### --- " + percentRandom);
				trace("### +++ " + p);				
				indexSelected = i-1;
				break;
			}
		}
		*/
		//this.indexEnemy = indexSelected;
		return indexSelected;
	}
	
	public function changeEnemy(next:Bool = true)
	{
		trace("CHANGE ENEMY");
		this.parentGamePlayScene.sendBlockToPuzzle(true, NDiTypePopupPuzzle.NDI_POPUP_NEW_ENEMY);
		//NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.SOUND_ENEMY_EXPLOSION);
		NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.SOUND_PATH_ENEMY_EXPLOSION+this.currentEnemy.enemyName+"_explosion");
		this.currentEnemy.animationDeath();
		this.isChanging = true;
		var f1:CallFunction = new CallFunction(function() {
			this.currentEnemy.delete();
			this.currentEnemy = null;
			
			this.countDefeatedEnemies++;
			
			var f2:CallFunction = new CallFunction(function() {
				this.selectEnemy(next);
				this.loadEnemy();			
				//this.currentTurnToAttack = this.totalTurnsToAttack;
				this.elapsedTimeToAttack = 0;			
				this.parentGamePlayScene.updateHUDEnemyLife();
				//this.parentGamePlayScene.updateHUDTurnsToAttack();
				this.parentGamePlayScene.initHUDEnemy(NDiGameConstants.ARRAY_ENUM_TYPE_ENEMIES[indexEnemy + 1]);
				this.isChanging = false;
			});
			var seq2:Sequence = new Sequence([new Delay(0.5), f2]);
			this.owner.get(Script).run(seq2);
			
		});
		var seq1:Sequence = new Sequence([new Delay(0.99), f1]);
		this.currentEnemy.owner.get(Script).run(seq1);
	}
	
	/*
	public function updateTurnsToAttack():Void
	{
		this.currentTurnToAttack -= 1;		
	}
	*/
	
	public function updateTimerToAttack(dt:Float)
	{
		
		if (this.isTimerToAttackPaused)
			return;
			
		this.elapsedTimeToAttack += dt;		
		if (this.elapsedTimeToAttack > this.totalTimeToAttack)
		{			
			this.currentEnemy.animationAttack();			
			this.createComboAttack(this.currentEnemy);
			this.elapsedTimeToAttack = 0;
		}
		this.parentGamePlayScene.updateHUDTimeToAttack();
	}
	
	//TO REMOVE
	public function _timeToAttackPlayer(matchingFrequency:Map<String, Int>)
	{
		/*
		this.updateTurnsToAttack();
		if (this.getTurnsToAttack() <= 0)
		{
			//trace("ATTACKKKKKKKKK OUCH!!!");
			this.currentEnemy.animationAttack();			
			this.createComboAttack(this.currentEnemy);
		}		
		this.parentGamePlayScene.updateHUDTurnsToAttack();
		*/
	}
	
	public function createComboAttack(enemy:NDiEnemy)
	{
		//trace("COMBOOOOOOOOOOOOOOOOO ATTACK++++===");
		this.parentGamePlayScene.puzzleInvalidMatch();
		this.parentGamePlayScene.sendBlockToPuzzle(true, NDiTypePopupPuzzle.NDI_POPUP_ENEMY_ATTACK);
		var attackLenghtTime:Float = enemy.attackLenghtTime;
		var lib:Library = enemy.libraryAnimations;
		var enemyName:String = enemy.enemyName;
		
		var f1:CallFunction = new CallFunction(function() {			
			var comboAttack:NDiAnimationMovie = new NDiAnimationMovie(this.currentEnemy.libraryAnimations, this.currentEnemy.enemyName);
			comboAttack.transform.x._ = (NDiGameConstants.GAME_WIDTH * 0.25) + NDiGameConstants.COMBOATTACK_POSITIONS_OFFSET.get(this.currentEnemy.type).x;
			comboAttack.transform.y._ = (NDiGameConstants.GAME_HEIGHT * 0.5) + NDiGameConstants.COMBOATTACK_POSITIONS_OFFSET.get(this.currentEnemy.type).y;
			new Entity().add(comboAttack);			
			
			this.parentGamePlayScene.sendComboAttackToPlayer(comboAttack);			
			comboAttack.animationIdle(false, this.currentEnemy.attackLenghtTime, "_comboAttack", this.endingComboAttack);
			this.playSoundsAttack();
			
			/*ATTACK TO PLAYER*/
			this.currentEnemy.specialAttack();
			//var valueAttack:Float = NDiRandomUtils.getRandomFloat(5, 10);
			this.parentGamePlayScene.attackToPlayer(-this.valueAttack);
			
			//this.currentTurnToAttack = this.totalTurnsToAttack;
			//this.elapsedTimeToAttack = this.totalTimeToAttack;
			
			//this.parentGamePlayScene.updateHUDTurnsToAttack();
		});
		
		var seq1 = new Sequence([new Delay(0.7), f1]);
		enemy.owner.get(Script).run(seq1);
	}	
	
	private function endingComboAttack(param:Dynamic)
	{
		this.parentGamePlayScene.sendBlockToPuzzle();
	}
	
	public function playSoundsAttack()
	{
		//trace(this.currentEnemy.enemyName);
		NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.SOUND_ENEMY_COMBOATTACK_FOLDER+""+this.currentEnemy.enemyName+""+NDiGameConstants.SOUND_ENEMY_COMBOATTACK_POSTFIX);
	}
	
	/*
	private function timerFunctionToAttack(dt:Float):Void
	{
		this.elapsedTime += dt;
		this.isAttacking = false;
		if (this.elapsedTime >= this.timeAttack )
		{
			this.elapsedTime = 0;
			var newTimeAttack:Float = NDiRandomUtils.getRandomFloat(1, 5);
			this.timeAttack = newTimeAttack;
			this.isAttacking = true;
			//trace("SHUT TIME"+this.timeAttack);
		}
		this.parentGamePlayScene.TimeToAttackPlayer(this.elapsedTime, this.timeAttack, this.isAttacking);
	}
	*/
	/*
	private function addTransitionShine()
	{	
		var libraryAnimations:Library = NDiResourcesManager.getInstance().loadSetAnimations(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/animations/shine1");
		this.transitionShine = new MoviePlayer(libraryAnimations);
		this.owner.addChild(new Entity().add(this.transitionShine));
		var transformShine:Sprite = new Sprite();
		this.transitionShine.owner.add(transformShine);
		transformShine.x._ = this.currentEnemy.transform.x._;
		transformShine.y._ = this.currentEnemy.transform.y._;
		this.transitionShine.loop("shineAnm");
		this.isChanging = true;
		///Sequence to delete Shine
		this.transitionShine.owner.add(new Script()); //Needed to run sequence
		var fn1:CallFunction = new CallFunction(function() {
				this.transitionShine.owner.dispose();
				this.isChanging = false;
				
				//this.parentGamePlayScene.timeToAttackPlayer();
				this.currentTurnToAttack = this.totalTurnsToAttack;
				this.parentGamePlayScene.updateHUDTurnsToAttack();				
				trace("DELETE SHINE ANIMATION "+ this.currentTurnToAttack);
			});
		var seq:Sequence = new Sequence([new Delay(1.75), fn1]);
		this.transitionShine.owner.get(Script).run(seq);
		trace("Add SHINE --- ");
	}
	*/	
	public function getParentGamePlay():NDiGamePlayScene
	{
		return this.parentGamePlayScene;
	}
	
	public function getCurrentEnemy():NDiEnemy
	{
		return this.currentEnemy;
	}
	
	public function getPercentLife():Float
	{
		return (this.currentEnemy.life / this.currentEnemy.totalLife);
	}
	
	public function addDebug()
	{
		var scale:Float = 6.5;
		var posx:Float = 344;
		/*LEFT*/
		//var btnLeftTexture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/buttons/btn_arrow_left");
		
		var btnLeft:FillSprite = new FillSprite(0xCCCCCC, 1, 1);//new NDiButton(btnLeftTexture);
		
		btnLeft.centerAnchor();
		btnLeft.x._ = ((0) - 15) + posx;
		btnLeft.y._ = (btnLeft.getNaturalHeight() * 0.5) + 55;
		btnLeft.alpha._ = 0.2;
		btnLeft.setScale(scale);
		
		btnLeft.pointerDown.connect(function(event:PointerEvent) {
				if (this.isChanging)
					return;
				//this.changeEnemy(-1);
				this.changeEnemy(false);
			});
		
		this.owner.addChild(new Entity().add(btnLeft));
		
		/*RIGHT*/
		//var btnRightTexture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/buttons/btn_arrow_left");
		var btnRight:FillSprite = new FillSprite(0xCCCCCC, 1, 1);
		
		btnRight.centerAnchor();
		btnRight.x._ = ((0) + 30) + posx;		
		btnRight.y._ = (btnRight.getNaturalHeight() * 0.5) + 55;
		btnRight.alpha._ = 0.2;
		btnRight.setScale(scale);		
		btnRight.pointerDown.connect(function(event:PointerEvent) {
				if (this.isChanging)
					return;
				//this.changeEnemy(1);
				this.changeEnemy(true);
			});
		
		this.owner.addChild(new Entity().add(btnRight));
		
		/*TITLE*/
		/*
		var font1:Font = NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.FONT_CALIBRI);
		var Title1:TextSprite = new TextSprite(font1, "Change Enemy");
		Title1.disablePointer();
		Title1.x._ = ((NDiGameConstants.GAME_WIDTH *0.5))+240;
		Title1.y._ = 1;
		Title1.align = TextAlign.Center;		
		Title1.setScale(0.6);
		this.owner.addChild(new Entity().add(Title1));
		
		if (!NDiGameGlobals.getInstance().isRightHanded)
		{
			Title1.x._ = 0;
			btnRight.x._ = (btnRight.getNaturalWidth() * scale);
			btnLeft.x._ = -(btnLeft.getNaturalWidth() * scale);
		}
		*/
	}
	
	override public function onAdded():Void
    {
		trace("INIT ENEMY MANAGER");
		/*INITIAL LOAD*/
		//this.libraryAnimations = NDiResourcesManager.getInstance().loadSetAnimations(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.PACK_ANIMATIONS_ENEMIES);
		this.owner.add(new Script());
		this.owner.add(this.transform);
		
		this.selectEnemy(false);
		this.loadEnemy();		
	}
	
	override public function onRemoved():Void
	{
	}

	override public function onUpdate(dt:Float):Void
	{
		/*Temporal*/
		/*
		if (this.parentGamePlayScene.isGameOver || this.isChanging)
			return;
		*/
			
		this.updateTimerToAttack(dt);
	}
	
	public function addToEntity():Entity
	{
		this.entity = new Entity();
		this.entity.add(this);
		return this.entity;
	}
}