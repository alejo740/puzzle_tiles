package managers;
import flambe.display.Texture;
import flambe.Entity;
import flambe.script.CallFunction;
import flambe.script.Delay;
import flambe.script.Script;
import flambe.script.Sequence;
import flambe.swf.Library;
import flambe.System;
import globals.NDiGameConstants;
import scenes.components.NDiToken;
import scenes.components.NDiTutorialHighlight;
import scenes.NDiTutorialScene;
import util.NDiLine;

/**
 * NDiTeravision
 * @author Edwin Cobos
 */
class NDiTutorialTokenManager extends NDiTokenManager
{
	public var highLight:NDiTutorialHighlight;
	public var highLightTimer:NDiTutorialHighlight;
	private var h1Texture:Texture;
	private var h2Texture:Texture;
	private var h3Texture:Texture;
	
	public function new(parent:NDiTutorialScene) 
	{
		super(parent);
		this.h1Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/panels/tutorial/tutorial_highlight_twotokens");
		this.h2Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/panels/tutorial/tutorial_highlight_threetokens");
		this.h3Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/panels/tutorial/tutorial_highlight_timer");
		
		this.highLight = new NDiTutorialHighlight(this.h1Texture);
		this.highLightTimer = new NDiTutorialHighlight(this.h3Texture);
	}
	
	override private function predefinedToken(index:Int):Int
	{
		//trace(index);
		
		if (cast(this.parentScene, NDiTutorialScene).currentStep == 0)
		{
			for (i in 0...NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN.length)
			{
				if (NDiGameConstants.ARRAY_TUTORIAL_TOKENS_STEP1[index] == NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[i])
				{
					return (i-1);
				}
			}
		}else{
			for (i in 0...NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN.length)
			{
				if (NDiGameConstants.ARRAY_TUTORIAL_TOKENS_STEP2[index] == NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[i])
				{
					return (i-1);
				}
			}
		}
		return 0;
	}
	
	override private function newToken(posX:Int, posY:Int, probabilities:Map<NDiTypeToken, Float>):NDiToken
	{
		//gridTokens[index] = NDiGameConstants.ARRAY_TUTORIAL_TOKENS[index];
		var index:Int = (posY * gridWidth) + posX;
		
		//var selectedTokenIndex = this.calculateTokenFromHistogram_2(this.frequencyHistogramTokens);
		var selectedTokenIndex:Int = this.predefinedToken(index);
		
		var tmp:Library = NDiResourcesManager.getInstance().loadSetAnimations(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.PACK_ANIMATIONS_TOKENS);
		var newTokenObject = new NDiToken(tmp);		
		newTokenObject.indexTypeToken = selectedTokenIndex;
		newTokenObject.tokenName = NDiGameConstants.ARRAY_PREFIX_ANIMATION_TOKEN[selectedTokenIndex];
		newTokenObject.animationIdle();
		newTokenObject.gridPosition.x = posX;
		newTokenObject.gridPosition.y = posY;
		newTokenObject.type = NDiGameConstants.ARRAY_ENUM_TYPE_TOKEN[selectedTokenIndex + 1];
		newTokenObject.tokenColor = NDiGameConstants.ARRAY_COLOR_TOKEN[selectedTokenIndex];
		
		return newTokenObject;
	}
	
	override private function renewToken():Void //Version 1
	{
		cast(this.parentScene, NDiTutorialScene).currentStep++;
		this.changeHighLight();
		super.renewToken();
		
	}
	
	override public function validatePattern():Void
	{
		var parentSceneTut:NDiTutorialScene = cast(this.parentScene, NDiTutorialScene);
		if (parentSceneTut.currentStep == 0)
		{
			
			if (this.currentPattern.length > 1)
			{
				this.validateTokens();
			}else {
				this.unvalidateTokens();
			}
			
		}
		else if (parentSceneTut.currentStep > 0)
		{
			if (this.currentPattern.length > 2)
			{
				this.validateTokens();
			}else {
				this.unvalidateTokens();
			}
		}
	}
	
	private function validateTokens()
	{
		var parentSceneTut:NDiTutorialScene = cast(this.parentScene, NDiTutorialScene);
		super.validatePattern();
		parentSceneTut.hideDialog(2.8);
		//this.changeHighLight();
		if (parentSceneTut.currentStep == 2)
		{
			var f1:CallFunction = new CallFunction(function() { 
				parentSceneTut.endingTutorial();
			});
			
			var seq1:Sequence = new Sequence([new Delay(3.3), f1]);
			this.owner.get(Script).run(seq1);
		}
	}
	
	private function unvalidateTokens()
	{
		for (p in this.currentPattern)
		{
			var tmp:NDiToken = cast(p, NDiToken);
			tmp.animationSelectedOff();
			tmp.isSelected = false;
		}
		for (p in this.linePattern)
		{
			var tmp:NDiLine = cast(p, NDiLine);				
			p.owner.dispose();
		}
		this.linePattern.splice(0, this.linePattern.length);		
		
		this.currentPattern.splice(0, this.currentPattern.length);//Clean pattern
		this.isJoker = false;
	}
	
	private function addHighLight()
	{
		this.highLight.centerAnchor();
		this.highLight.disablePointer();		
		cast(this.parentScene, NDiTutorialScene).entityHighLights.addChild(new Entity().add(this.highLight));		
		this.changeHighLight();
	}
	
	public function changeHighLight()
	{
		var step:Int = cast(this.parentScene, NDiTutorialScene).currentStep;
		//trace("change "+step);
		if (step == 0)
		{
			this.highLight.texture = this.h1Texture;
			this.highLight.x._ = (NDiGameConstants.GAME_WIDTH * 0.75) - 3;
			this.highLight.y._ = 110;
		}else{
			this.highLight.texture = this.h2Texture;
			this.highLight.x._ = (NDiGameConstants.GAME_WIDTH * 0.75) - 6;
			this.highLight.y._ = 103;
		}
		if (step >= 2) {
			this.highLight.visible = false;
			cast(this.parentScene, NDiTutorialScene).entityHighLights.addChild(new Entity().add(this.highLightTimer));
			this.highLightTimer.x._ = (NDiGameConstants.GAME_WIDTH * 0.5) - 96;
			this.highLightTimer.y._ = 7;
			cast(this.parentScene, NDiTutorialScene).activeTimerEnemy();
		}
	}
	
	override public function shuffle():Void { }
	
	override public function onAdded():Void 
	{
		super.onAdded();
		this.addHighLight();		
	}
	
}