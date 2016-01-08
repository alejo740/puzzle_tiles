package scenes.components;

import flambe.display.FillSprite;
import flambe.display.Font;
import flambe.display.ImageSprite;
import flambe.display.Sprite;
import flambe.display.TextSprite;
import flambe.display.Texture;
import flambe.Entity;
import flambe.input.PointerEvent;
import flambe.scene.Scene;
import flambe.System;
import globals.NDiGameConstants;
import managers.NDiAudioManager;
import managers.NDiResourcesManager;
import managers.NDiSceneManager;
import managers.NDiLocalizationManager;
import scenes.components.NDiButton;
import scenes.NDiAbstractScene;
import scenes.NDiGamePlayScene;
import scenes.popups.NDiPopupExit;
import scenes.popups.NDiPopupHelp;
import util.NDiSaveData;
import data.NDiLocalizationData;

/**
 * ...
 * @author Edwin
 */
class NDiPause extends NDiAbstractScene
{
	private var currentButtonPressed:NDiButton;	
	private var parentGamePlayScene:NDiGamePlayScene;
	
	private var buttonPlay:NDiButton;
	private var buttonHome:NDiButton;
	private var buttonHelp:NDiButton;
	private var buttonMusic:NDiButton;
	private var buttonSounds:NDiButton;
	
	private var buttonPlayTexture:Texture;
	private var buttonHomeTexture:Texture;
	private var buttonHelpTexture:Texture;
	private var buttonSoundOnTexture:Texture;
	private var buttonSoundOffTexture:Texture;
	
	private var popupExit:NDiPopupExit;
	private var popupHelp:NDiPopupHelp;
	private var bgAlpha:Sprite;
	private var background:ImageSprite;
	private var data0:NDiLocalizationData;
	private var scoreLabel:TextSprite;	
	private var data1:NDiLocalizationData;
	private var scoreTitleLabel:TextSprite;
	private var data2:NDiLocalizationData;
	private var titlePauseLabel:TextSprite;
	private var data3:NDiLocalizationData;
	private var textResumeButton:TextSprite;
	private var data4:NDiLocalizationData;
	private var textHelpButton:TextSprite;
	private var data5:NDiLocalizationData;
	private var textSoundButton:TextSprite;
	private var data6:NDiLocalizationData;
	private var textHomeButton:TextSprite;
	
	public function new(parent:NDiGamePlayScene) 
	{
		super(false);
		this.parentGamePlayScene = parent;
		
		this.buttonPlayTexture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.GAMEPLAY_PAUSEMENU_BUTTON_RESUME);
		this.buttonPlay = new NDiButton(this.buttonPlayTexture);
		this.buttonPlay.centerAnchor();
		this.buttonPlay.pointerDown.connect(this.handlePointerDown);
		this.buttonPlay.pointerUp.connect(this.handlePointerUp);
		System.pointer.up.connect(this.handlePointerUpGlobal);		
		
		
		this.buttonHelpTexture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.GAMEPLAY_PAUSEMENU_BUTTON_HELP);
		this.buttonHelp = new NDiButton(this.buttonHelpTexture);
		this.buttonHelp.centerAnchor();
		this.buttonHelp.pointerDown.connect(this.handlePointerDown);		
		this.buttonHelp.pointerUp.connect(this.handlePointerUp);
		System.pointer.up.connect(this.handlePointerUpGlobal);
		
		
		this.buttonSoundOnTexture  = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.GAMEPLAY_PAUSEMENU_BUTTON_SOUND_ON);
		this.buttonSoundOffTexture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.GAMEPLAY_PAUSEMENU_BUTTON_SOUND_OFF);
		this.buttonSounds = new NDiButton(this.buttonSoundOnTexture);
		this.buttonSounds.centerAnchor();
		this.buttonSounds.pointerDown.connect(this.handlePointerDown);
		//this.buttonSounds.pointerMove.connect(this.handlePointerMove);
		this.buttonSounds.pointerUp.connect(this.handlePointerUp);
		System.pointer.up.connect(this.handlePointerUpGlobal);
		
		
		this.buttonHomeTexture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.GAMEPLAY_PAUSEMENU_BUTTON_QUIT);		
		this.buttonHome = new NDiButton(this.buttonHomeTexture);
		this.buttonHome.centerAnchor();
		this.buttonHome.pointerDown.connect(this.handlePointerDown);		
		this.buttonHome.pointerUp.connect(this.handlePointerUp);
		System.pointer.up.connect(this.handlePointerUpGlobal);
		
		this.bgAlpha = new FillSprite(0x3D214F, NDiGameConstants.GAME_WIDTH * 1.25, NDiGameConstants.GAME_HEIGHT * 1.25);
		
		var backgroundTexture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.GAMEPLAY_PAUSEMENU_BACKGROUND);
		this.background = new ImageSprite(backgroundTexture);
		
		this.data0 = NDiLocalizationManager.getInstance().getLocalizationData("gameplay|pause|score");		
		var font0:Font = NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, this.data0.fontName);
		this.scoreLabel = new TextSprite(font0, "");
		
		this.data1 = NDiLocalizationManager.getInstance().getLocalizationData("gameplay|pause|top_score");
		var font1:Font = NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, this.data1.fontName);
		this.scoreTitleLabel = new TextSprite(font1, "");
		this.scoreTitleLabel.disablePointer();
		
		this.data2 = NDiLocalizationManager.getInstance().getLocalizationData("gameplay|pause|title_pause");		
		var font2:Font = NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, this.data2.fontName);
		this.titlePauseLabel = new TextSprite(font2, "");
		
		this.data3 = NDiLocalizationManager.getInstance().getLocalizationData("gameplay|pause|resume_button");
		var font3:Font = NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, this.data3.fontName);
		this.textResumeButton = new TextSprite(font3, "");
		this.textResumeButton.disablePointer();
		
		this.data4 = NDiLocalizationManager.getInstance().getLocalizationData("gameplay|pause|help_button");
		var font4:Font = NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, this.data4.fontName);
		this.textHelpButton = new TextSprite(font4, "");
		this.textHelpButton.disablePointer();
		
		this.data5 = NDiLocalizationManager.getInstance().getLocalizationData("gameplay|pause|sound_button");
		var font5:Font = NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, this.data5.fontName);
		this.textSoundButton = new TextSprite(font5, "");
		this.textSoundButton.disablePointer();
		
		this.data6 = NDiLocalizationManager.getInstance().getLocalizationData("gameplay|pause|quit_button");
		var font6:Font = NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, this.data6.fontName);
		this.textHomeButton = new TextSprite(font6, "");
		this.textHomeButton.disablePointer();
		
		this.popupHelp = new NDiPopupHelp();
		
		this.popupExit = new NDiPopupExit(NDiTypeScene.NDI_TYPE_SCENE_MAINMENU, true);
	}
	
	private function addTitleText()
	{
		this.titlePauseLabel.align = TextAlign.Center;
		this.titlePauseLabel.x._ =  633 + this.data2.offsetX;
		this.titlePauseLabel.y._ =  117 + this.data2.offsetY;
		this.titlePauseLabel.text = this.data2.content;		
		this.titlePauseLabel.setScale(this.data2.fontScale);
		this.owner.addChild(new Entity().add(this.titlePauseLabel));
		
		//NDiResourcesManager.getInstance().addGenericText(data.content, 633 + data.offsetX, 117 + data.offsetY, data.fontScale, data.fontName, TextAlign.Center, this.owner);
	}
	
	private function addTextScore()
	{		
		this.scoreLabel.align = TextAlign.Right;		
		this.scoreLabel.x._ = ((NDiGameConstants.GAME_WIDTH * 0.5) + 185) + this.data0.offsetX;
		this.scoreLabel.y._ = ((NDiGameConstants.GAME_HEIGHT * 0.5) - 103) + this.data0.offsetY;
		
		var topScore:Int = NDiSaveData.getInstance().getData(NDiVarsToSave.SCORE.getName());
		this.scoreLabel.text = ""+topScore;
		this.scoreLabel.setScale(this.data0.fontScale);
		this.owner.addChild(new Entity().add(this.scoreLabel));
		
		//this.scoreTitleLabel
		this.scoreTitleLabel.align = TextAlign.Center;
		this.scoreTitleLabel.x._ =  497 + this.data1.offsetX;
		this.scoreTitleLabel.y._ =  182 + this.data1.offsetY;
		this.scoreTitleLabel.text = this.data1.content;		
		this.scoreTitleLabel.setScale(this.data1.fontScale);
		this.owner.addChild(new Entity().add(this.scoreTitleLabel));
	}
	
	
	
	
	
	
	/*COMMENTED IN CASE WE WANT TO RE-ADD THE BUTTON LATER*/
	/*
	private function addButtonMusic()
	{	
		this.buttonMusic = new NDiButton(this.butt);
		this.buttonMusic.centerAnchor();
		this.buttonMusic.x._ = (NDiGameConstants.GAME_WIDTH * 0.5) + (buttonMusic.getNaturalWidth()*0.5)*1.25;
		this.buttonMusic.y._ = (NDiGameConstants.GAME_HEIGHT * 0.5);
		this.buttonMusic.nameButton = "MUSIC_BUTTON";
		this.buttonMusic.pointerDown.connect(this.handlePointerDown);
		//this.buttonMusic.pointerMove.connect(this.handlePointerMove);
		this.buttonMusic.pointerUp.connect(this.handlePointerUp);
		System.pointer.up.connect(this.handlePointerUpGlobal);
		this.owner.addChild(new Entity().add(this.buttonMusic));
	}
	*/
	private function addButtonPlay()
	{
		this.buttonPlay.nameButton = "PLAY_BUTTON";
		this.buttonPlay.x._ = (NDiGameConstants.GAME_WIDTH * 0.5)+15;
		this.buttonPlay.y._ = (NDiGameConstants.GAME_HEIGHT * 0.5)+(buttonPlay.getNaturalHeight()*0.5)*0.15;
		this.owner.addChild(new Entity().add(this.buttonPlay));
		
		
		this.textResumeButton.align = TextAlign.Center;
		this.textResumeButton.x._ =  48 + this.data3.offsetX;
		this.textResumeButton.y._ =  100 + this.data3.offsetY;
		this.textResumeButton.text = this.data3.content;		
		this.textResumeButton.setScale(this.data3.fontScale);
		this.buttonPlay.owner.addChild(new Entity().add(this.textResumeButton));		
	}
	
	private function addButtonHelp()
	{	
		this.buttonHelp.nameButton = "HELP_BUTTON";
		this.buttonHelp.x._ = (NDiGameConstants.GAME_WIDTH * 0.5)+135;
		this.buttonHelp.y._ = (NDiGameConstants.GAME_HEIGHT * 0.5) -(buttonHelp.getNaturalHeight() * 0.5) * 0.1;
		this.owner.addChild(new Entity().add(this.buttonHelp));
		
		//NDiResourcesManager.getInstance().addGenericText(data.content, 48 + data.offsetX, 100 + data.offsetY, data.fontScale, data.fontName, TextAlign.Center, this.buttonHelp.owner);
		this.textHelpButton.align = TextAlign.Center;
		this.textHelpButton.x._ =  48 + this.data4.offsetX;
		this.textHelpButton.y._ =  100 + this.data4.offsetY;
		this.textHelpButton.text = this.data4.content;		
		this.textHelpButton.setScale(this.data4.fontScale);
		this.buttonHelp.owner.addChild(new Entity().add(this.textHelpButton));
	}
	
	private function addButtonSounds()
	{
		this.buttonSounds.nameButton = "SOUNDS_BUTTON";
		this.buttonSounds.x._ = (NDiGameConstants.GAME_WIDTH * 0.5)-22;
		this.buttonSounds.y._ = (NDiGameConstants.GAME_HEIGHT * 0.5) + (buttonPlay.getNaturalHeight()*0.5)*1.75;		
		
		/*SET THE CORRECT IMAGE FOR THE SOUND BUTTON*/
		if (NDiSaveData.getInstance().getData(NDiVarsToSave.MUTE_MUSIC.getName()) )
		//&& NDiSaveData.getInstance().getData(NDiVarsToSave.MUTE_MUSIC.getName()) )
		{
			this.buttonSounds.texture = this.buttonSoundOnTexture;
		}
		else 
		{
			this.buttonSounds.texture = this.buttonSoundOffTexture;
		}
		
		this.owner.addChild(new Entity().add(this.buttonSounds));
		
		
		//var data:NDiLocalizationData=NDiLocalizationManager.getInstance().getLocalizationData("gameplay|pause|sound_button");		
		//NDiResourcesManager.getInstance().addGenericText(data.content,48+data.offsetX,100+data.offsetY, data.fontScale, data.fontName, TextAlign.Center, this.buttonSounds.owner);
		this.textSoundButton.align = TextAlign.Center;
		this.textSoundButton.x._ =  48 + this.data5.offsetX;
		this.textSoundButton.y._ =  100 + this.data5.offsetY;
		this.textSoundButton.text = this.data5.content;		
		this.textSoundButton.setScale(this.data5.fontScale);		
		this.buttonSounds.owner.addChild(new Entity().add(this.textSoundButton));
	}
	
	private function addButtonHome()
	{
		this.buttonHome.nameButton = "HOME_BUTTON";
		this.buttonHome.x._ = (NDiGameConstants.GAME_WIDTH * 0.5)+85;
		this.buttonHome.y._ = (NDiGameConstants.GAME_HEIGHT * 0.5) +(buttonHome.getNaturalHeight() * 0.5) * 1.40;		
		this.owner.addChild(new Entity().add(this.buttonHome));
		
		
		//var data:NDiLocalizationData=NDiLocalizationManager.getInstance().getLocalizationData("gameplay|pause|quit_button");
		//NDiResourcesManager.getInstance().addGenericText(data.content, 48 + data.offsetX, 100 + data.offsetY, data.fontScale, data.fontName, TextAlign.Center, this.buttonHome.owner);
		this.textHomeButton.align = TextAlign.Center;
		this.textHomeButton.x._ =  48 + this.data6.offsetX;
		this.textHomeButton.y._ =  100 + this.data6.offsetY;
		this.textHomeButton.text = this.data6.content;		
		this.textHomeButton.setScale(this.data6.fontScale);
		this.buttonHome.owner.addChild(new Entity().add(this.textHomeButton));
	}
	
	
	
	private function addFrame()
	{
		
		this.background.centerAnchor();
		this.background.y._ = NDiGameConstants.GAME_HEIGHT * 0.5;
		this.background.x._ = NDiGameConstants.GAME_WIDTH * 0.5+50;
		this.owner.addChild(new Entity().add(this.background));	
	}
	
	/**
	 * Function to put background into scene
	 */
	private function addBackground()
	{
		
		this.bgAlpha.centerAnchor();
		this.bgAlpha.x._ = (NDiGameConstants.GAME_WIDTH * 0.5);
		this.bgAlpha.y._ = (NDiGameConstants.GAME_HEIGHT * 0.5);
		
		this.bgAlpha.alpha._ = 0.5;
		this.owner.addChild(new Entity().add(this.bgAlpha));
		
	}
	
	private function handlePointerDown(event:PointerEvent):Void
	{
		var tmpButton:NDiButton = cast(event.hit, NDiButton);
			tmpButton.isSelected = true;
			tmpButton.animationPressed();
			this.currentButtonPressed = tmpButton;
		
	}
	
	private function handlePointerMove(event:PointerEvent):Void
	{
		var tmpButton:NDiButton = cast(event.hit, NDiButton);
		if (tmpButton.isSelected)
		{
			
		}
	}
	
	private function goToHome()
	{
		this.owner.addChild(this.popupExit.addToEntity());
	}
	
	private function showHelp()
	{
		//this.popupHelp.transform.visible = true;
		this.owner.addChild(this.popupHelp.addToEntity());
	}
	
	private function handlePointerUp(event:PointerEvent):Void 
	{
		var tmpButton:NDiButton = cast(event.hit, NDiButton);
		if (tmpButton.isSelected)
		{
			if (tmpButton.nameButton == "PLAY_BUTTON")
			{
				this.parentGamePlayScene.gamePause(false);
			}
			else if (tmpButton.nameButton == "HOME_BUTTON")
			{
				this.goToHome();
			}
			else if (tmpButton.nameButton == "HELP_BUTTON")
			{
				this.showHelp();
			}
			/*COMMENTED IN CASE WE WANT TO RE-ADD THE BUTTON LATER*/
			/*
			else if (tmpButton.nameButton == "MUSIC_BUTTON")
			{
				NDiAudioManager.getInstance().setEnabledSoundBackground();
			}
			*/
			/*THE SOUND BUTTON NOW SERVES TO TURN OFF/ON BOTH THE SFX AND THE MUSIC AS THE GDD AND THE ARTE REFERENCE SHOW*/
			else if (tmpButton.nameButton == "SOUNDS_BUTTON") 
			{
				NDiAudioManager.getInstance().setEnabledSoundEffects();
				NDiAudioManager.getInstance().setEnabledSoundBackground();
				
				/*SET THE CORRECT IMAGE FOR THE SOUND BUTTON*/
				if (NDiSaveData.getInstance().getData(NDiVarsToSave.MUTE_MUSIC.getName()) && 
					NDiSaveData.getInstance().getData(NDiVarsToSave.MUTE_MUSIC.getName()) )
				{
					this.buttonSounds.texture = this.buttonSoundOnTexture;
				}
				else 
				{
					this.buttonSounds.texture = this.buttonSoundOffTexture;
				}
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
		
		this.addBackground();
		this.addFrame();
		this.addTextScore();
		
		this.addTitleText();
		this.addButtonPlay();
		this.addButtonHelp();
		this.addButtonSounds();
		this.addButtonHome();		
		//this.addButtonMusic();
		
		//this.owner.addChild(this.popupHelp.addToEntity());
		//this.popupHelp.transform.visible = false;
	}
	
}