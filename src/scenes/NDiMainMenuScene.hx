package scenes;

import flambe.display.FillSprite;
import flambe.display.ImageSprite;
import flambe.display.Sprite;
import flambe.display.TextSprite;
import flambe.display.Texture;
import flambe.Entity;
import flambe.display.Font;
import flambe.input.PointerEvent;
import flambe.script.CallFunction;
import flambe.script.Delay;
import flambe.script.Script;
import flambe.script.Sequence;
import flambe.script.Repeat;
import flambe.animation.Ease;
import flambe.script.AnimateTo;
import flambe.sound.Sound;
import flambe.asset.AssetPack;
import flambe.System;
import managers.NDiAudioManager;
import managers.NDiLocalizationManager;
import scenes.NDiAbstractScene;
import managers.NDiSceneManager;
import managers.NDiResourcesManager;
import globals.NDiGameConstants;
import scenes.components.NDiButton;
import util.NDiSaveData;
import data.NDiLocalizationData;

class NDiMainMenuScene extends NDiAbstractScene
{

	private var mainText:TextSprite;
	private var backgroundMainMenu:ImageSprite;
	private var playButton:ImageSprite;
	private var rootEntity:Entity;
	//private var font1:Font;
	private var buttonSoundOnTexture:Texture;
	private var buttonSoundOffTexture:Texture;
	private var btnSound:NDiButton;
	private var script:Script;
	
	public function new() 
	{
		/*RESET SCORE FOR DEBUG, DELETE LATER
		NDiSaveData.getInstance().setData(NDiVarsToSave.SCORE.getName(), 0);
		NDiSaveData.getInstance().setData(NDiVarsToSave.SCORE_2.getName(), 0);
		NDiSaveData.getInstance().setData(NDiVarsToSave.SCORE_3.getName(), 0);
		*/
		
		super();
		this.rootEntity = new Entity();
		this.script = new Script();	
		this.rootEntity.add(this.script);
		
	}
	
	private function addBackground()
	{
		var backgroundTexture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.MAINMENU_BACKGROUND);
		this.backgroundMainMenu = new ImageSprite(backgroundTexture);
		this.backgroundMainMenu.centerAnchor();
		this.backgroundMainMenu.y._ = NDiGameConstants.GAME_HEIGHT * 0.5;
		this.backgroundMainMenu.x._ = NDiGameConstants.GAME_WIDTH * 0.5;
		this.rootEntity.addChild(new Entity().add(this.backgroundMainMenu));
		
		
		/* Play // removed
		var playTexture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.MAINMENU_BUTTON_PLAY);
		this.playButton = new ImageSprite(playTexture);
		this.playButton.centerAnchor();
		this.playButton.y._ = NDiGameConstants.GAME_HEIGHT * 0.8;
		this.playButton.x._ = NDiGameConstants.GAME_WIDTH * 0.5;
		this.playButton.pointerDown.connect(function(event:PointerEvent) {
				NDiSceneManager.getInstance().changeScene(NDI_TYPE_SCENE_INTRO);
			});
		this.rootEntity.addChild(new Entity().add(this.playButton));
		*/
	}
	
	private function addInvisibleButton() 
	{
		var invButton:Sprite = new FillSprite(0x222222, System.stage.width, System.stage.height);
		invButton.centerAnchor();
		invButton.x._ = (NDiGameConstants.GAME_WIDTH * 0.5);
		invButton.y._ = (NDiGameConstants.GAME_HEIGHT * 0.5);
		invButton.alpha._ = 0.0;
		invButton.pointerDown.connect(function(event:PointerEvent) {
				NDiSceneManager.getInstance().changeScene(NDI_TYPE_SCENE_INTRO);
		});
		this.owner.addChild(new Entity().add(invButton));
	}
	
	private function addText( message:String= "Tap to start",  posX:Float =500,  posY:Float =500, scale:Float= 1, fontName:String)
	{
		var font:Font = NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, fontName);
		mainText = new TextSprite(font, "");
		mainText.text = message;		
		mainText.align = TextAlign.Center;
		mainText.x._ = posX;
		mainText.y._ = posY;
		mainText.setScale(scale);
		
		
		this.owner.addChild(new Entity().add(mainText));
		
		this.script.run(
			
			new Repeat(new Sequence([
				new AnimateTo(this.mainText.alpha, 0.3, 0.5),
				new AnimateTo(this.mainText.alpha, 1.0, 0.5),
				new Delay(1),
			]))
			
		);
	}
	
	private function addCreditButton()
	{
		var btnCreditsTexture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.MAINMENU_BUTTON_CREDITS);
		var btnCredits:NDiButton = new NDiButton(btnCreditsTexture);
		btnCredits.centerAnchor();
		btnCredits.x._ = NDiGameConstants.GAME_WIDTH - (btnCredits.getNaturalWidth() * 0.5);
		btnCredits.y._ = (btnCredits.getNaturalHeight() * 0.5);
		btnCredits.pointerDown.connect(function(event:PointerEvent) {
				NDiSceneManager.getInstance().changeScene(NDI_TYPE_SCENE_CREDITS);
			});
		
		this.owner.addChild(new Entity().add(btnCredits));
	}
	
	private function switchSound()
	{
		NDiAudioManager.getInstance().setEnabledSoundEffects();
		NDiAudioManager.getInstance().setEnabledSoundBackground();
				
		/*SET THE CORRECT IMAGE FOR THE SOUND BUTTON*/
		if (NDiSaveData.getInstance().getData(NDiVarsToSave.MUTE_MUSIC.getName()) && 
			NDiSaveData.getInstance().getData(NDiVarsToSave.MUTE_MUSIC.getName()) )
		{
			this.btnSound.texture = this.buttonSoundOnTexture;
		}
		else 
		{
			this.btnSound.texture = this.buttonSoundOffTexture;
		}
	}
	
	private function addSoundButton()
	{
		var btnSoundTexture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.MAINMENU_BUTTON_SOUND);
		this.btnSound = new NDiButton(btnSoundTexture);
		this.btnSound.centerAnchor();
		this.btnSound.x._ = NDiGameConstants.GAME_WIDTH - (btnSound.getNaturalWidth() * 0.5);
		this.btnSound.y._ = (btnSound.getNaturalHeight() * 0.5) - 15;
		this.btnSound.pointerDown.connect(function(event:PointerEvent) {
				this.switchSound();
			});
		
		/*SET THE CORRECT IMAGE FOR THE SOUND BUTTON*/
		if (NDiSaveData.getInstance().getData(NDiVarsToSave.MUTE_MUSIC.getName()) && 
			NDiSaveData.getInstance().getData(NDiVarsToSave.MUTE_MUSIC.getName()) )
		{
			this.btnSound.texture = this.buttonSoundOnTexture;
		}
		else 
		{
			this.btnSound.texture = this.buttonSoundOffTexture;
		}	
			
		this.owner.addChild(new Entity().add(this.btnSound));
	}
	
	override public function onAdded():Void
    {
		super.onAdded();
		this.owner.addChild(this.rootEntity);
		//this.font1 = NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.FONT_CALIBRI);
		
		/*Add Background*/
		this.addBackground();
		
		this.buttonSoundOnTexture  = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.MAINMENU_BUTTON_SOUND);
		this.buttonSoundOffTexture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.MAINMENU_BUTTON_SOUNDOFF);
		
		
		var data:NDiLocalizationData;
		
		#if air
			data = NDiLocalizationManager.getInstance().getLocalizationData("mainmenu|start_message_non_flash");
		#elseif flash
			data = NDiLocalizationManager.getInstance().getLocalizationData("mainmenu|start_message_flash");		
		#elseif html
			data = NDiLocalizationManager.getInstance().getLocalizationData("mainmenu|start_message_flash");
		#end
		
		this.addText(data.content, (NDiGameConstants.GAME_WIDTH * 0.5) + data.offsetX, (NDiGameConstants.GAME_HEIGHT * 0.85) + data.offsetY, data.fontScale, data.fontName);
		
		this.addInvisibleButton();
		
		this.addSoundButton();
		
		
		NDiAudioManager.getInstance().enabledSoundBackground = NDiSaveData.getInstance().getData(NDiVarsToSave.MUTE_MUSIC.getName());
		NDiAudioManager.getInstance().enabledSoundEffects = NDiSaveData.getInstance().getData(NDiVarsToSave.MUTE_SOUNDS.getName());
		NDiAudioManager.getInstance().playSoundBackground(NDiGameConstants.MUSIC_TMNT);
	}
	
}