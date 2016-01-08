package managers;

import flambe.Component;
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
import flambe.System;
import globals.NDiGameConstants;
import globals.NDiGameGlobals;
import managers.NDiResourcesManager;
import managers.NDiLocalizationManager;
import scenes.components.NDiBar1;
import scenes.components.NDiBar2;
import scenes.components.NDiBarTimer1;
import scenes.components.NDiButton;
import scenes.components.NDiImage;
import scenes.NDiGamePlayScene;
import util.NDiSaveData;
import data.NDiLocalizationData;

/**
 * NDiTeravision
 * @author Edwin Cobos
 */
class NDiHud extends Component
{
	private var enemyLife:NDiBar1;
	
	private var playerLife:NDiBar2;	
	private var scoreText:TextSprite;
	//private var font1:Font;
	//private var font2:Font;
	private var parentGamePlayScene:NDiGamePlayScene;
	private var redShadeScreen:NDiImage;	
	
	public var transform:Sprite;
	public var entity:Entity;
	public var leftEntity:Entity;
	public var rightEntity:Entity;
	public var timerToAttack:NDiBarTimer1;

	public function new(parent:NDiGamePlayScene) 
	{
		this.parentGamePlayScene= parent;
		this.leftEntity = new Entity();
		this.rightEntity = new Entity();
		this.transform 	= new Sprite();
		this.enemyLife 	= new NDiBar1();
		this.playerLife = new NDiBar2();
		this.timerToAttack = new NDiBarTimer1();
		
		var redShadeScreenTexture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/panels/enemy/tmnt_hitReceiveFrame");
		this.redShadeScreen = new NDiImage(redShadeScreenTexture);
		//this.redShadeScreen.transform.alpha._ = 0.45;
		this.redShadeScreen.transform.x._ = (NDiGameConstants.GAME_WIDTH * 0.5);
		this.redShadeScreen.transform.y._ = (NDiGameConstants.GAME_HEIGHT * 0.5);
		this.redShadeScreen.transform.disablePointer();
	}
	
	public function updateScore(newScore:Float):Void
	{
		scoreText.text = "" + Math.floor(newScore);
	}
	
	public function updateEnemyLife(life:Float, totalLife:Float):Void
	{
		var textLife:String = "HP: " + Math.floor(life);
		var percenLife:Float = life / totalLife;
		//trace("HP%: "+percenLife);
		if (percenLife > 1)
			percenLife = 1;
			
		this.enemyLife.updateBar(percenLife, textLife);
		
	}
	
	public function updateTimerToAttack(time:Float)
	{
		//trace("UPDATE TURN -> "+time);
		//this.enemyLife.setTurnToAttack(cast time);		
		this.timerToAttack.updateBar(time);
	}
	
	public function updatePlayerLife(life:Float):Void
	{
		var percenLife:Float = life / 100;
		if (percenLife > 1)
			percenLife = 1;
		this.playerLife.updateBar(percenLife, "HP: "+Math.floor(life));
	}
	
	public function showPlayerEffectDamage()
	{
		var timeToEffect:Float = 0.15;
		this.effectDamageRedShade(timeToEffect);
		var fn1:CallFunction = new CallFunction(function() { 
			this.effectDamageRedShade(timeToEffect);
		});
		var seq1:Sequence = new Sequence([new Delay((timeToEffect*2)+0.1), fn1]);//Visible Time
		this.redShadeScreen.owner.get(Script).run(seq1);
		
		var fn2:CallFunction = new CallFunction(function() { 
			this.effectDamageRedShade(timeToEffect);
		});
		var seq2:Sequence = new Sequence([new Delay((timeToEffect*4)+0.2), fn2]);//Visible Time
		this.redShadeScreen.owner.get(Script).run(seq2);
	}
	
	public function effectDamageRedShade(timeToEffect:Float)
	{
		//this.redShadeScreen.transform.visible = true;
		this.redShadeScreen.transform.alpha.animateTo(1, timeToEffect);
		var fn1:CallFunction = new CallFunction(function() { 
			//this.redShadeScreen.transform.visible = false;
			this.redShadeScreen.transform.alpha.animateTo(0, timeToEffect);
		});
		var seq1:Sequence = new Sequence([new Delay(timeToEffect), fn1]);//Visible Time
		this.redShadeScreen.owner.get(Script).run(seq1);
	}
	
	private function addScoreText()
	{
		/*SCORE BACKGROUND*/
	/*	var texture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.HUD_SCORE_BACKGROUND);
		var bckg: ImageSprite = new ImageSprite(texture);
		bckg.centerAnchor();
		bckg.y._ = NDiGameConstants.GAME_HEIGHT * 0.1;
		bckg.x._ = NDiGameConstants.GAME_WIDTH * 0.4;
		this.rightEntity.addChild(new Entity().add(bckg));
		*/
		
		/*SCORE BACKGROUND*/
		var texture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.HUD_SCORE_BACKGROUND);
		var bckg: ImageSprite = new ImageSprite(texture);
		bckg.centerAnchor();
		bckg.y._ = bckg.getNaturalHeight() * 0.5;
		bckg.x._ = (NDiGameConstants.GAME_WIDTH * 0.5) - (bckg.getNaturalWidth() * 0.5);
		bckg.disablePointer();
		this.rightEntity.addChild(new Entity().add(bckg));
		
		
		
		var data:NDiLocalizationData = NDiLocalizationManager.getInstance().getLocalizationData("gameplay|hud|label|score_label");
		var font:Font = NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, data.fontName);
		
		var scoreTextLabel:TextSprite = new TextSprite(font, "SCORE");
		scoreTextLabel.align = TextAlign.Center;
		scoreTextLabel.x._ = ((NDiGameConstants.GAME_WIDTH * 0.5) - 145) +data.offsetX;
		scoreTextLabel.y._ = (8) + data.offsetY;
		//scoreTextLabel.rotation._ = 6;
		scoreTextLabel.setScale(data.fontScale);
		
		this.rightEntity.addChild(new Entity().add(scoreTextLabel));
		
		var data1:NDiLocalizationData = NDiLocalizationManager.getInstance().getLocalizationData("gameplay|hud|label|score");
		var font1:Font = NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, data1.fontName);
		scoreText = new TextSprite(font1, "");
		updateScore(0);
		scoreText.setScale(data1.fontScale);
		scoreText.align = TextAlign.Right;
		scoreText.x._ = ((NDiGameConstants.GAME_WIDTH * 0.5) - 9) + data1.offsetX;
		scoreText.y._ = (10) + data1.offsetY;		
		//scoreText.rotation._ = -4;
		
		this.rightEntity.addChild(new Entity().add(scoreText));
	}
	
	/*THIS SETS UP THE ICON AND NAME FOR A GIVEN ENEMY*/
	public function setEnemy(enemy:NDiTypeEnemy) {
		this.enemyLife.setEnemy(enemy);
	}
	
	
	private function addHudEnemy()
	{
		/*Add Enemy Bar*/		
		this.enemyLife.transform.x._ = (NDiGameConstants.GAME_WIDTH * 0.25)+64;
		this.enemyLife.transform.y._ = (NDiGameConstants.GAME_HEIGHT * 0.25) - 145;
		this.enemyLife.transform.disablePointer();
		
		this.leftEntity.addChild(this.enemyLife.addToEntity());		
		//this.leftEntity.addChild(new Entity().add(this.timerEnemy));
		
		this.timerToAttack.transform.x._ = (NDiGameConstants.GAME_WIDTH * 0.5) - 50;
		this.timerToAttack.transform.y._ = (NDiGameConstants.GAME_HEIGHT * 0.5) - 30;
		this.leftEntity.addChild(new Entity().add(this.timerToAttack));
	}
	
	private function addHudPlayer()
	{
		/*Add Player Bar*/		
		this.playerLife.transform.x._ = (NDiGameConstants.GAME_WIDTH / 4);
		var difHeight:Float = Math.abs(System.stage.height - (NDiGameConstants.GAME_HEIGHT * NDiGameGlobals.getInstance().currentScaleGame))*0.5;
		this.playerLife.transform.y._ = (NDiGameConstants.GAME_HEIGHT - 82) + difHeight;
		/*
		var labelPlayerLife:TextSprite = new TextSprite(this.font1, "Life of player's");		
		labelPlayerLife.x._ = (NDiGameConstants.GAME_WIDTH / 4)-90;
		labelPlayerLife.y._ = (NDiGameConstants.GAME_HEIGHT * 0.705);
		labelPlayerLife.align = TextAlign.Center;		
		labelPlayerLife.setScale(0.6);
		*/
		this.leftEntity.addChild(this.playerLife.addToEntity());
		//this.leftEntity.addChild(new Entity().add(labelPlayerLife));			
		
	}
	
	private function addPauseControls()
	{
		var btnPauseTexture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.GAMEPLAY_BUTTON_PAUSE);
		var btnPause:NDiButton = new NDiButton(btnPauseTexture);
		btnPause.centerAnchor();
		btnPause.x._ = (NDiGameConstants.GAME_WIDTH * 0.75);
		btnPause.y._ = (btnPause.getNaturalHeight() / 2);				
		btnPause.pointerDown.connect(function(event:PointerEvent) {
				this.parentGamePlayScene.gamePause();
			});
		
		this.owner.addChild(new Entity().add(btnPause));
		
	}
	
	/**
	 * Function to configure the main zones of display
	 */
	private function addSystemDominantHanded()
	{
		/*Right*/		
		var transformRight:Sprite = new Sprite();
		//transformRight.x._ = NDiGameConstants.GAME_WIDTH / 2;
		//transformRight.y._ = 0;
		this.rightEntity.add(transformRight);
		this.owner.addChild(this.rightEntity);
		
		/*Left*/		
		var transformLeft:Sprite = new Sprite();
		//transformLeft.x._ = 0;
		//transformLeft.y._ = 0;
		this.leftEntity.add(transformLeft);
		this.owner.addChild(this.leftEntity);
		
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
	
	override public function onAdded():Void
    {
		trace("INIT HUD ");
		
		this.owner.add(this.transform);
		//this.font1 = NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.FONT_CALIBRI);
		//this.font2 = NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.FONT_SLANT);
		
		this.addSystemDominantHanded();
		
		/*HUD ENEMY*/
		this.addHudEnemy();
		
		/*Hud Player*/
		this.addHudPlayer();
		
		/*Add Score*/
		this.addScoreText();
		
		/*Add Pause Controls*/
		this.addPauseControls();
		
		this.leftEntity.addChild(new Entity().add(this.redShadeScreen));
		this.redShadeScreen.owner.add(new Script());
		//this.redShadeScreen.transform.visible = false;
		this.redShadeScreen.transform.alpha._ = 0;
	}
	
	override public function onRemoved():Void
	{
	}

	override public function onUpdate(dt:Float):Void
	{		
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