package scenes.components;

import data.NDiLocalizationData;
import flambe.Component;
import flambe.display.Font;
import flambe.display.ImageSprite;
import flambe.display.Sprite;
import flambe.display.TextSprite;
import flambe.display.Texture;
import flambe.Entity;
import flambe.System;
import globals.NDiGameConstants;
import managers.NDiAudioManager;
import managers.NDiLocalizationManager;
import managers.NDiResourcesManager;

/**
 * ...
 * @author Edwin
 */
class NDiBar2 extends Component
{
	private var countEnemyLife:TextSprite;
	private var isDeathHint:Bool;
	private var timeFadeHint:Float;
	private var elapsedTimeToHintSound:Float;
	private var totalTimeToHintSound:Float;
	
	public var bar:ImageSprite;
	public var barBg:ImageSprite;
	public var entity:Entity;	
	public var transform:Sprite;
	
	public function new() 
	{
		this.transform = new Sprite();
		this.isDeathHint = false;
		this.timeFadeHint = 0;		
		this.totalTimeToHintSound = this.elapsedTimeToHintSound = 10;
	}
	
	private function addBar() 
	{
		
		/*BACKGROUND*/
		var barLifeBgTexture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.PLAYERLIFEBAR_BACKGROUND);
		this.barBg = new ImageSprite(barLifeBgTexture);
		this.barBg.y._ = -11;
		this.barBg.x._ = -this.barBg.getNaturalWidth() * 0.5;
		this.entity.addChild(new Entity().add(this.barBg));
		
		/*MAIN BAR*/
		var barLifeTexture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.PLAYERLIFEBAR);
		this.bar = new ImageSprite(barLifeTexture);		
		this.entity.addChild(new Entity().add(this.bar));
		
		/*ICON*/
		var lifeIconTexture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.PLAYERLIFE_ICON);
		var lifeIcon:ImageSprite = new ImageSprite(lifeIconTexture);
		 lifeIcon.centerAnchor();		 
		 lifeIcon.y._ = 50;		 
		 lifeIcon.x._ = -((NDiGameConstants.GAME_WIDTH * 0.25) - 60);
		 
		 this.entity.addChild(new Entity().add(lifeIcon));
		
		var difY:Float = Math.abs(this.barBg.getNaturalHeight() - this.bar.getNaturalHeight()) / 2;
		this.bar.y._ = difY - 1;
		
		this.bar.x._ = ( -this.bar.getNaturalWidth() * 0.5) + NDiGameConstants.GAME_WIDTH * 0.01;
		
	}
	
	private function addTextBar() 
	{
		var data:NDiLocalizationData = NDiLocalizationManager.getInstance().getLocalizationData("gameplay|hud|player|hp");
		
		var font:Font = NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, data.fontName);
		
		this.countEnemyLife = new TextSprite(font, "");
		this.countEnemyLife.align = TextAlign.Center;
		this.countEnemyLife.x._ = 0 + data.offsetX;
		this.countEnemyLife.y._ = (this.barBg.getNaturalHeight() * 0.325) + data.offsetY;
		this.countEnemyLife.setScale(data.fontScale);
		
		this.entity.addChild(new Entity().add(countEnemyLife));		
	}
	
	public function updateBar(value:Float, valueText:String)
	{
		//this.bar.setScaleXY(value, this.bar.scaleY._);
		this.bar.scaleX.animateTo(value, 0.2);
		this.countEnemyLife.text = valueText;
		if (value < 0.2)
		{
			this.isDeathHint = true;
		}else {
			if (this.isDeathHint)
			{
				this.setActiveDeathHint(false);
				this.bar.alpha._ = 1;
				this.elapsedTimeToHintSound = 0;
			}
		}
	}
	
	public function setActiveDeathHint(active:Bool = true)
	{
		this.isDeathHint = active;
	}
	
	public function playSoundLowHealth()
	{
		NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.SOUND_TMNT_LOW_HEALTH);		
	}
	
	private function updatePlayerDeathHint(dt:Float)
	{
		if (this.isDeathHint)
		{
			var deltaAlpha:Float = (0.3 * Math.sin(this.timeFadeHint * 6)) + 0.7;
			this.bar.alpha._ = deltaAlpha;
			this.timeFadeHint += dt;
			
			
			if (this.elapsedTimeToHintSound >= this.totalTimeToHintSound)
			{
				this.playSoundLowHealth();
				this.elapsedTimeToHintSound = 0;
			}
			this.elapsedTimeToHintSound+=dt;
		}
	}
	
	override public function onAdded():Void
    {
		this.owner.add(transform);
		this.addBar();
		this.addTextBar();
		this.owner.addChild(entity);
		
	}
	
	override public function onRemoved():Void
	{
	}

	override public function onUpdate(dt:Float):Void
	{
		this.updatePlayerDeathHint(dt);
	}
	
	public function addToEntity():Entity
	{
		this.entity = new Entity();
		this.entity.add(this);
		return this.entity;
	}
	
}