package scenes.components;

import flambe.Component;
import flambe.display.FillSprite;
import flambe.display.Font;
import flambe.display.ImageSprite;
import flambe.display.Sprite;
import flambe.display.TextSprite;
import flambe.display.Texture;
import flambe.Entity;
import flambe.input.PointerEvent;
import flambe.System;
import globals.NDiGameConstants;
import globals.NDiGameGlobals;
import managers.NDiResourcesManager;
import managers.NDiSceneManager;
import managers.NDiLocalizationManager;
import scenes.NDiAbstractScene;
import scenes.popups.NDiPopupExit;
import util.NDiSaveData;
import data.NDiLocalizationData;

/**
 * NDiTeravision
 * @author Edwin Cobos
 */
class NDiGameOver extends NDiAbstractScene
{
	private var currentButtonPressed:NDiButton;
	private var buttonReplay:NDiButton;
	private var buttonQuit:NDiButton;
	private var scoreValue:Float;
	private var topScoreValue:Float;
	private var topScoreValue_2:Float;
	private var topScoreValue_3:Float;
	private var isHighScore:Bool;
	private var numDefeatedEnemies:Int;
	private var popupExit:NDiPopupExit;
	
	private var background:ImageSprite;
	private var textTitle:TextSprite;
	
	
	private var labelYourScore:TextSprite;
	private var scoreLabel:TextSprite;
	private var enemiesLabel:TextSprite;
	private var numEnemiesLabel:TextSprite;
	private var topScoreTitle:TextSprite;
	private var topScore1Label:TextSprite;
	private var topScore2Label:TextSprite;
	private var topScore3Label:TextSprite;
	
	private var topScoreBackground:ImageSprite;
	private var topScore1number:TextSprite;
	private var topScore2number:TextSprite;
	private var topScore3number:TextSprite;
	private var highScoreFrame:ImageSprite;
	private var highScoreText:TextSprite;
	private var buttonReplayText:TextSprite;
	

	public function new() 
	{
		super(true);
		this.isHighScore = false;
		this.transform = new Sprite();
		this.initAssets();		
	}
	
	private function initAssets()
	{
		var backgroundTexture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.GAMEPLAY_RESULTS_BACKGROUND);
		this.background = new ImageSprite(backgroundTexture);
		background.centerAnchor();
		background.y._ = NDiGameConstants.GAME_HEIGHT * 0.5;
		background.x._ = NDiGameConstants.GAME_WIDTH * 0.5;
		
		var data1:NDiLocalizationData=NDiLocalizationManager.getInstance().getLocalizationData("gameplay|results|title");
		this.textTitle = NDiResourcesManager.addGenericText(data1.content, 55 + data1.offsetX, 34 + data1.offsetY, data1.fontScale, data1.fontName, TextAlign.Left);
		
		var data2:NDiLocalizationData = NDiLocalizationManager.getInstance().getLocalizationData("gameplay|results|your_score_label");
		this.labelYourScore = NDiResourcesManager.addGenericText(data2.content, 13 + data2.offsetX,(NDiGameConstants.GAME_HEIGHT * 0.25) + 12 +data2.offsetY, data2.fontScale, data2.fontName, TextAlign.Left);
		
		var data3:NDiLocalizationData = NDiLocalizationManager.getInstance().getLocalizationData("gameplay|results|score");		
		this.scoreLabel = NDiResourcesManager.addGenericText(data3.content, ((NDiGameConstants.GAME_WIDTH * 0.25) + 40) + data3.offsetX, ((NDiGameConstants.GAME_HEIGHT * 0.25) + 20) + data3.offsetY, data3.fontScale, data3.fontName, TextAlign.Right);
		
		var data4:NDiLocalizationData = NDiLocalizationManager.getInstance().getLocalizationData("gameplay|results|enemies_defeated_label");
		this.enemiesLabel = NDiResourcesManager.addGenericText(data4.content, (13) +data4.offsetX, (NDiGameConstants.GAME_HEIGHT * 0.25) + 72 +data4.offsetY, data4.fontScale, data4.fontName, TextAlign.Left);
		
		var data5:NDiLocalizationData = NDiLocalizationManager.getInstance().getLocalizationData("gameplay|results|enemies_defeated");		
		this.numEnemiesLabel = NDiResourcesManager.addGenericText(data5.content, (NDiGameConstants.GAME_WIDTH * 0.25+40) + data5.offsetX, ((NDiGameConstants.GAME_HEIGHT * 0.25) + 80) + data5.offsetY, data5.fontScale, data5.fontName, TextAlign.Right);
		
		var data6:NDiLocalizationData = NDiLocalizationManager.getInstance().getLocalizationData("gameplay|results|your_topscores_label");		
		this.topScoreTitle = NDiResourcesManager.addGenericText(data6.content, 
		NDiGameConstants.GAME_WIDTH * 0.27  +data6.offsetX,
		NDiGameConstants.GAME_HEIGHT * 0.48 +data6.offsetY,
		data6.fontScale, data6.fontName, TextAlign.Center);
		
		
		var data7:NDiLocalizationData = NDiLocalizationManager.getInstance().getLocalizationData("gameplay|results|topscores_number_label_1");
		this.topScore1Label = NDiResourcesManager.addGenericText(
		data7.content, 
		((NDiGameConstants.GAME_WIDTH * 0.23) - 2) + data7.offsetX,
		((NDiGameConstants.GAME_HEIGHT * 0.55) - 4) + data7.offsetY,
		data7.fontScale, 
		data7.fontName, 
		TextAlign.Center);
		
		var data8:NDiLocalizationData = NDiLocalizationManager.getInstance().getLocalizationData("gameplay|results|topscores_number_label_2");
		this.topScore2Label = NDiResourcesManager.addGenericText(
		data8.content, 
		((NDiGameConstants.GAME_WIDTH * 0.23) - 2) + data8.offsetX, 
		((NDiGameConstants.GAME_HEIGHT * 0.63) - 5) + data8.offsetY, 
		data8.fontScale, 
		data8.fontName, 
		TextAlign.Center);
		
		var data9:NDiLocalizationData = NDiLocalizationManager.getInstance().getLocalizationData("gameplay|results|topscores_number_label_3");
		this.topScore3Label = NDiResourcesManager.addGenericText(
		data9.content, 
		((NDiGameConstants.GAME_WIDTH * 0.23) - 2) + data9.offsetX, 
		((NDiGameConstants.GAME_HEIGHT * 0.70) - 1) + data9.offsetY, 
		data9.fontScale, 
		data9.fontName, 
		TextAlign.Center);
		
		var data10:NDiLocalizationData = NDiLocalizationManager.getInstance().getLocalizationData("gameplay|results|topscores_1");
		this.topScore1number = NDiResourcesManager.addGenericText(
		data10.content,
		((NDiGameConstants.GAME_WIDTH * 0.3) + 1) + data10.offsetX, 
		((NDiGameConstants.GAME_HEIGHT * 0.55) - 4) + data10.offsetY,
		data10.fontScale, 
		data10.fontName, 
		TextAlign.Center);
		
		var data11:NDiLocalizationData = NDiLocalizationManager.getInstance().getLocalizationData("gameplay|results|topscores_2");
		this.topScore2number = NDiResourcesManager.addGenericText(
		data11.content,
		((NDiGameConstants.GAME_WIDTH * 0.3) + 1) + data11.offsetX, 
		((NDiGameConstants.GAME_HEIGHT * 0.63) - 5) + data11.offsetY, 
		data11.fontScale, 
		data11.fontName, 
		TextAlign.Center);
		
		var data12:NDiLocalizationData = NDiLocalizationManager.getInstance().getLocalizationData("gameplay|results|topscores_3");
		this.topScore3number = NDiResourcesManager.addGenericText(
		data12.content, 
		((NDiGameConstants.GAME_WIDTH * 0.3) + 1) + data12.offsetX, 
		((NDiGameConstants.GAME_HEIGHT * 0.70) - 1) + data12.offsetY, 
		data12.fontScale, 
		data12.fontName, 
		TextAlign.Center);
		
		var backgroundTexture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.GAMEPLAY_RESULTS_HIGHSCORE_FRAME);
		this.highScoreFrame = new ImageSprite(backgroundTexture);
		this.highScoreFrame.centerAnchor();
		this.highScoreFrame.y._ = NDiGameConstants.GAME_HEIGHT * 0.3;
		this.highScoreFrame.x._ = NDiGameConstants.GAME_WIDTH * 0.4;
		
		var data13:NDiLocalizationData = NDiLocalizationManager.getInstance().getLocalizationData("gameplay|results|new_highscore_label");
		this.highScoreText = NDiResourcesManager.addGenericText(data13.content,
		(95) + data13.offsetX,
		(60) + data13.offsetY, 
		data13.fontScale, 
		data13.fontName, 
		TextAlign.Center);
		
		var btnTexture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.GAMEPLAY_RESULTS_BUTTON_REPLAY);
		this.buttonReplay = new NDiButton(btnTexture);
		this.buttonReplay.centerAnchor();
		this.buttonReplay.x._ = (NDiGameConstants.GAME_WIDTH * 0.25) - 85;
		this.buttonReplay.y._ = (NDiGameConstants.GAME_HEIGHT * 0.85) + 40;
		this.buttonReplay.nameButton = "REPLAY_BUTTON";
		this.buttonReplay.pointerDown.connect(this.handlePointerDown);
		this.buttonReplay.pointerMove.connect(this.handlePointerMove);
		this.buttonReplay.pointerUp.connect(this.handlePointerUp);
		System.pointer.up.connect(this.handlePointerUpGlobal);
		
		var data14:NDiLocalizationData = NDiLocalizationManager.getInstance().getLocalizationData("gameplay|results|play_again_button");
		this.buttonReplayText = NDiResourcesManager.addGenericText(data14.content, 79 + data14.offsetX, 27 + data14.offsetY, data14.fontScale, data14.fontName, TextAlign.Left);
		
		
		var topScoreBackgroundTexture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.GAMEPLAY_RESULTS_TOP_SCORES);
		this.topScoreBackground = new NDiButton(topScoreBackgroundTexture);
		this.topScoreBackground.centerAnchor();
		this.topScoreBackground.x._ = (NDiGameConstants.GAME_WIDTH * 0.25) + 15;
		this.topScoreBackground.y._ = (NDiGameConstants.GAME_HEIGHT * 0.5) + 84;
		//this.topScoreBackground.alpha._ = 0.75;
	}
	
	public function setValues(scoreValue:Float, numEnemies:Int)
	{
		this.scoreValue = scoreValue;
		this.numDefeatedEnemies = numEnemies;
		this.recordScore(scoreValue);
	}
	
	private function recordScore(scoreValue:Float)
	{
		
		
		this.topScoreValue   = NDiSaveData.getInstance().getData(NDiVarsToSave.SCORE.getName());
		this.topScoreValue_2 = NDiSaveData.getInstance().getData(NDiVarsToSave.SCORE_2.getName());
		this.topScoreValue_3 = NDiSaveData.getInstance().getData(NDiVarsToSave.SCORE_3.getName());
		
		trace("/// 1: "+topScoreValue);
		trace("/// 2: "+topScoreValue_2);
		trace("/// 3: "+topScoreValue_3);
		
		if (scoreValue > this.topScoreValue) //BEST SCORE
		{
			trace("//// 1st");
			/*MOVE DOWN OLD SCORE VALUES*/
			NDiSaveData.getInstance().setData(NDiVarsToSave.SCORE_3.getName(), this.topScoreValue_2  );
			NDiSaveData.getInstance().setData(NDiVarsToSave.SCORE_2.getName(), this.topScoreValue    );
			
			NDiSaveData.getInstance().setData(NDiVarsToSave.SCORE.getName(), scoreValue);
			isHighScore = true;
			
			this.topScoreValue   = NDiSaveData.getInstance().getData(NDiVarsToSave.SCORE.getName());
			this.topScoreValue_2 = NDiSaveData.getInstance().getData(NDiVarsToSave.SCORE_2.getName());
			this.topScoreValue_3 = NDiSaveData.getInstance().getData(NDiVarsToSave.SCORE_3.getName());
			
			trace("/// 1: "+topScoreValue);
			trace("/// 2: "+topScoreValue_2);
			trace("/// 3: "+topScoreValue_3);
			return;
		}
		else if (scoreValue > this.topScoreValue_2) //SECOND BEST SCORE
		{
			trace("//// 2st");
			/*MOVE DOWN OLD SCORE VALUES*/
			NDiSaveData.getInstance().setData(NDiVarsToSave.SCORE_3.getName(), this.topScoreValue_2  );
			
			NDiSaveData.getInstance().setData(NDiVarsToSave.SCORE_2.getName(), scoreValue);
			
			this.topScoreValue   = NDiSaveData.getInstance().getData(NDiVarsToSave.SCORE.getName());
			this.topScoreValue_2 = NDiSaveData.getInstance().getData(NDiVarsToSave.SCORE_2.getName());
			this.topScoreValue_3 = NDiSaveData.getInstance().getData(NDiVarsToSave.SCORE_3.getName());
			
			trace("/// 1: "+topScoreValue);
			trace("/// 2: "+topScoreValue_2);
			trace("/// 3: "+topScoreValue_3);
			return;
		}
		else if (scoreValue > this.topScoreValue_3) //THIRD BEST SCORE
		{
			trace("//// 3st");
			NDiSaveData.getInstance().setData(NDiVarsToSave.SCORE_3.getName(), scoreValue);
			
			this.topScoreValue   = NDiSaveData.getInstance().getData(NDiVarsToSave.SCORE.getName());
			this.topScoreValue_2 = NDiSaveData.getInstance().getData(NDiVarsToSave.SCORE_2.getName());
			this.topScoreValue_3 = NDiSaveData.getInstance().getData(NDiVarsToSave.SCORE_3.getName());
			
			trace("/// 1: "+topScoreValue);
			trace("/// 2: "+topScoreValue_2);
			trace("/// 3: "+topScoreValue_3);
			return;
		}
		
		
	}
	
	
	
	
	
	private function addTextTopScores()
	{
		if (!NDiGameGlobals.getInstance().bHighScores)
		{
			return;
		}
		
		this.owner.addChild(new Entity().add(this.topScoreBackground));
		
		//numEnemiesLabel.text += this.topScoreValue;
		this.owner.addChild(new Entity().add(this.topScoreTitle));
		
		// Three top score values
		this.topScoreValue   = NDiSaveData.getInstance().getData(NDiVarsToSave.SCORE.getName());
		this.topScoreValue_2 = NDiSaveData.getInstance().getData(NDiVarsToSave.SCORE_2.getName());
		this.topScoreValue_3 = NDiSaveData.getInstance().getData(NDiVarsToSave.SCORE_3.getName());
		
		/*LABEL NUMBER*/
		
		this.owner.addChild(new Entity().add(this.topScore1Label));		
		this.owner.addChild(new Entity().add(this.topScore2Label));		
		this.owner.addChild(new Entity().add(this.topScore3Label));
		
		
		/*SCORE*/
		
		this.topScore1number.text = "" + this.topScoreValue;
		this.owner.addChild(new Entity().add(this.topScore1number));
		
		this.topScore2number.text = "" + this.topScoreValue_2;
		this.owner.addChild(new Entity().add(topScore2number));
		
		
		this.topScore3number.text = "" + this.topScoreValue_3;
		this.owner.addChild(new Entity().add(this.topScore3number));
	}
	
	private function addTextNumEnemies()
	{
		
		this.owner.addChild(new Entity().add(this.enemiesLabel));
		
		
		numEnemiesLabel.text = "" + this.numDefeatedEnemies;		
		this.owner.addChild(new Entity().add(numEnemiesLabel));
	}
	
	private function addTextScore()
	{
		this.owner.addChild(new Entity().add(this.labelYourScore));
		
		this.scoreLabel.text = "" + this.scoreValue;
		this.owner.addChild(new Entity().add(this.scoreLabel));
	}
	
	private function addButtonReplay()
	{
		this.owner.addChild(new Entity().add(this.buttonReplay));
		
		
		this.buttonReplay.owner.addChild(new Entity().add(this.buttonReplayText));
	}
	
	private function addButtonQuit()
	{
		var btnTexture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.GAMEPLAY_RESULTS_BUTTON_QUIT);
		buttonQuit = new NDiButton(btnTexture);
		buttonQuit.centerAnchor();
		buttonQuit.x._ = (NDiGameConstants.GAME_WIDTH * 0.25) - 124;
		buttonQuit.y._ = NDiGameConstants.GAME_HEIGHT * 0.85+40;
		buttonQuit.nameButton = "QUIT_BUTTON";
		buttonQuit.pointerDown.connect(this.handlePointerDown);
		buttonQuit.pointerMove.connect(this.handlePointerMove);
		buttonQuit.pointerUp.connect(this.handlePointerUp);
		System.pointer.up.connect(this.handlePointerUpGlobal);
		this.owner.addChild(new Entity().add(buttonQuit));
		
		var data:NDiLocalizationData=NDiLocalizationManager.getInstance().getLocalizationData("gameplay|results|quit_button");
		var textTmp:TextSprite = NDiResourcesManager.addGenericText(data.content, 75 + data.offsetX, 25 + data.offsetY, data.fontScale, data.fontName, TextAlign.Left);
		buttonQuit.owner.addChild(new Entity().add(textTmp));
	}
	
	private function addHighScores()
	{
		
		if (this.isHighScore)
		{
			//Let's add the art for new high score
			
			
			this.owner.addChild(new Entity().add(this.highScoreFrame));
			
			
			
			this.highScoreFrame.owner.addChild(new Entity().add(this.highScoreText));
			
		}
	}
	
	private function addTitle()
	{
		
		this.owner.addChild(new Entity().add(this.textTitle));
	}
	
	private function addPopupExit()
	{
		this.popupExit = new NDiPopupExit(NDiTypeScene.NDI_TYPE_SCENE_MAINMENU);		
		this.owner.addChild(this.popupExit.addToEntity());
		this.popupExit.transform.x._ = NDiGameConstants.GAME_WIDTH * 0.5;
		this.popupExit.transform.y._ = NDiGameConstants.GAME_HEIGHT * 0.5;
		
	}
	
	/*LISTENERS*/
	private function handlePointerDown(event:PointerEvent):Void
	{
		var tmpButton:NDiButton = cast(event.hit, NDiButton);
			tmpButton.isSelected = true;
			tmpButton.animationPressed();
			this.currentButtonPressed = tmpButton;
			trace("DOWNNNN");
		
	}
	
	private function handlePointerMove(event:PointerEvent):Void
	{
		var tmpButton:NDiButton = cast(event.hit, NDiButton);
		if (tmpButton.isSelected)
		{
			trace("MOVEeee");
		}
	}
	
	private function handlePointerUp(event:PointerEvent):Void 
	{
		var tmpButton:NDiButton = cast(event.hit, NDiButton);
		if (tmpButton.isSelected)
		{
			if (tmpButton.nameButton == "REPLAY_BUTTON")
			{
				NDiSceneManager.getInstance().director.popScene();
				NDiSceneManager.getInstance().changeScene(NDiTypeScene.NDI_TYPE_SCENE_GAMEPLAY);
			}else if (tmpButton.nameButton == "QUIT_BUTTON")
			{
				this.addPopupExit();
			}
		}
	}
	private function handlePointerUpGlobal(event:PointerEvent):Void 
	{
		if (this.currentButtonPressed != null)
		{
			this.currentButtonPressed.animationRelease();
			this.currentButtonPressed = null;
		}
	}
	
	override public function onAdded():Void
    { 	
		
		super.onAdded();
		this.owner.add(this.transform);
		
		/*Add Bg*/
		//var background:Sprite = new FillSprite(0x222222, System.stage.width, System.stage.height);
		
		this.owner.addChild(new Entity().add(background));
		
		this.addTitle();
		
		/*Add Score*/
		this.addTextScore();
		
		this.addTextNumEnemies();
		
		this.addTextTopScores();
		
		this.addHighScores();
		
		
		/*Add Buttons*/
		this.addButtonReplay();
		//this.addButtonQuit();
		
	}
	
	public function delete():Void
	{
		this.owner.dispose();
	}
	
}