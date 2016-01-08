package scenes.components;

import flambe.Component;
import flambe.display.Font;
import flambe.display.ImageSprite;
import flambe.display.Sprite;
import flambe.display.TextSprite;
import flambe.display.Texture;
import flambe.Entity;
import globals.NDiGameConstants;
import managers.NDiResourcesManager;
import managers.NDiLocalizationManager;
import data.NDiLocalizationData;

/**
 * ...
 * @author Edwin
 */
class NDiBar1 extends Component
{
	private var countEnemyLife:TextSprite;
	private var bar:ImageSprite;
	private var barBg:ImageSprite;
	
	public var entity:Entity;	
	public var transform:Sprite;
	
	private var enemyName:TextSprite;
	private var enemyNameEntity:Entity;
	
	private var timerEnemy:TextSprite;
	private var timeFadeTurn:Float;
	private var isActiveHint:Bool;
	
	private var icon: ImageSprite;
	public var iconEntity:Entity;
	
	public function new() 
	{
		this.transform = new Sprite();
		this.timerEnemy = null;
		this.timeFadeTurn = 0.4;
		this.isActiveHint = false;
	}
	
	public function setTurnToAttack(time:Int)
	{
		this.timerEnemy.text = "" + time;
		if (time <= 1)
		{
			this.setActiveHint();
		}else {
			if (this.isActiveHint)
			{
				this.setActiveHint(false);
				this.timerEnemy.alpha._ = 1;
			}
		}
	}
	
	public function setActiveHint(active:Bool = true)
	{
		this.isActiveHint = active;
	}
	
	private function addBar() 
	{
		/*Background*/
		var barLifeBgTexture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.ENEMYLIFEBAR_BACKGROUND);
		this.barBg = new ImageSprite(barLifeBgTexture);
		this.barBg.x._ = -this.barBg.getNaturalWidth() * 0.5;
		this.entity.addChild(new Entity().add(this.barBg));
		
		/*Main Bar*/
		var barLifeTexture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.ENEMYLIFEBAR);
		this.bar = new ImageSprite(barLifeTexture);		
		this.entity.addChild(new Entity().add(this.bar));
		
		var difY:Float = Math.abs(this.barBg.getNaturalHeight() - this.bar.getNaturalHeight()) * 0.40;
		this.bar.y._ = difY;		
		
		this.bar.x._ = -this.bar.getNaturalWidth() * 0.6;
		
		/*ENEMY ICON BACKGROUND*/
		var texture:Texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.ENEMY_ICON);
		var iconBg:ImageSprite = new ImageSprite(texture);
		iconBg.centerAnchor();
		//iconBg.y._ = NDiGameConstants.GAME_HEIGHT * 0.08;
		iconBg.y._ = 36;
		//iconBg.x._ = NDiGameConstants.GAME_WIDTH * -0.17;
		iconBg.x._ = -((NDiGameConstants.GAME_WIDTH * 0.25) - 67);
		this.entity.addChild(new Entity().add(iconBg));
		
		
		this.setEnemy(NDI_TYPE_ENEMY_NONE);
		
		this.entity.add(transform);
		
	}
	
	private function addTurns()
	{
		trace("ADD TURNS");
		/*Add Timer to Enemy Attack*/
		var data:NDiLocalizationData = NDiLocalizationManager.getInstance().getLocalizationData("gameplay|hud|label|score");
		var font:Font = NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, data.fontName);
		this.timerEnemy = new TextSprite(font, "");		
		this.timerEnemy.align = TextAlign.Center;
		this.timerEnemy.x._ = (125) + data.offsetX;
		this.timerEnemy.y._ = 26 + data.offsetY;
		this.timerEnemy.setScale(data.fontScale);
		this.timerEnemy.disablePointer();
		
		this.owner.addChild(new Entity().add(this.timerEnemy));
	}
	
	private function addTextBar() 
	{
		var data:NDiLocalizationData = NDiLocalizationManager.getInstance().getLocalizationData("gameplay|hud|enemy|hp");
		
		var font:Font = NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, data.fontName);
		this.countEnemyLife = new TextSprite(font, "");
		this.countEnemyLife.align = TextAlign.Center;
		this.countEnemyLife.x._ = (0) + data.offsetX;
		this.countEnemyLife.y._ = (NDiGameConstants.GAME_HEIGHT * 0.04) + data.offsetY;
		this.countEnemyLife.setScale(data.fontScale);
		this.entity.addChild(new Entity().add(countEnemyLife));
	}
	
	/*THIS SETS UP THE ICON AND NAME FOR A GIVEN ENEMY*/
	public function setEnemy(enemy:NDiTypeEnemy) {
		
		var texture:Texture= NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.GENERALENEMY_ICON);	
		
		var data:NDiLocalizationData;
		var font:Font;
		
		data = NDiLocalizationManager.getInstance().getLocalizationData("gameplay|hud|enemyName|MOUSERS");
		font = NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, data.fontName);
		
		if (enemy == NDI_TYPE_ENEMY_NONE) {
			//texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.MOUSER_ICON);	
			
			data =
				NDiLocalizationManager.getInstance().getLocalizationData("gameplay|hud|enemyName|MOUSERS");
			font = 
				NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, data.fontName);
		}
		if (enemy == NDI_TYPE_ENEMY_RAHZAR) {
			//texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.RAHZAR_ICON);	
			
			data =
				NDiLocalizationManager.getInstance().getLocalizationData("gameplay|hud|enemyName|RAHZAR");
			font = 
				NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, data.fontName);
		}
		if (enemy == NDI_TYPE_ENEMY_FOOTBOT) {
			//texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.FOOTBOT_ICON);	
			
			data =
				NDiLocalizationManager.getInstance().getLocalizationData("gameplay|hud|enemyName|FOOTBOT");
			font = 
				NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, data.fontName);
		}
		if (enemy == NDI_TYPE_ENEMY_KRANG) {
			//texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.KRANGS_ICON);	
			
			data =
				NDiLocalizationManager.getInstance().getLocalizationData("gameplay|hud|enemyName|KRANG");
			font = 
				NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, data.fontName);
		}
		if (enemy == NDI_TYPE_ENEMY_MOUSER) {
			//texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.MOUSER_ICON);	
			
			data =
				NDiLocalizationManager.getInstance().getLocalizationData("gameplay|hud|enemyName|MOUSERS");
			font = 
				NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, data.fontName);
			this.enemyName.text = "M.O.U.S.E.R.S";
		}
		if (enemy == NDI_TYPE_ENEMY_SHREDDER) {
			//texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.SHREDDER_ICON);	
			
			data =
				NDiLocalizationManager.getInstance().getLocalizationData("gameplay|hud|enemyName|SHREDDER");
			font = 
				NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, data.fontName);
			this.enemyName.text = "SHREDDER";
		}
		if (enemy == NDI_TYPE_ENEMY_SNAKEWEED) {
			//texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.SNAKEWEED_ICON);	
			
			data =
				NDiLocalizationManager.getInstance().getLocalizationData("gameplay|hud|enemyName|SNAKEWEED");
			font = 
				NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, data.fontName);
			
		}
		if (enemy == NDI_TYPE_ENEMY_SPIDERBYTEZ) {
			//texture = NDiResourcesManager.getInstance().loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.SPIDERBYTEZ_ICON);	
			
			data =
				NDiLocalizationManager.getInstance().getLocalizationData("gameplay|hud|enemyName|SPIDERBYTEZ");
			font = 
				NDiResourcesManager.getInstance().loadFont(NDiGameConstants.ASSET_PACKAGE_GENERAL, data.fontName);
			this.enemyName.text = "SPIDERBYTEZ";
		}
		
		this.entity.removeChild(this.enemyNameEntity);
		this.enemyName = new TextSprite(font, "Enemy");
		this.enemyName.align = TextAlign.Left;
		this.enemyName.setScale(data.fontScale);
		this.enemyName.x._ = (-145)  +data.offsetX;
		this.enemyName.y._ = (53) +data.offsetY;
		this.enemyName.text = data.content;
		this.enemyNameEntity = new Entity();
		this.entity.addChild(this.enemyNameEntity.add(this.enemyName));
		
		/*ICON*/
		
		//this.entity.removeChild(this.iconEntity);
		if (this.iconEntity != null)
			this.iconEntity.dispose();
			
		this.iconEntity = new Entity();
		this.icon = new ImageSprite(texture);
		this.icon.centerAnchor();
		//this.icon.y._ = NDiGameConstants.GAME_HEIGHT * 0.08;
		//this.icon.x._ = NDiGameConstants.GAME_WIDTH * -0.17;
		this.icon.y._ = 36;
		this.icon.x._ = -((NDiGameConstants.GAME_WIDTH * 0.25) - 67);
		this.entity.addChild(this.iconEntity.add(this.icon));
	}
	
	public function updateEnemyAttackHint(dt:Float)
	{
		if (this.isActiveHint)
		{
			var deltaAlpha:Float = (0.5 * Math.sin(this.timeFadeTurn * 6)) + 0.5;		
			//trace("UUUUU - "+deltaAlpha);
			this.timerEnemy.alpha._ = deltaAlpha;
			this.timeFadeTurn += dt;
		}
	}
	
	public function updateBar(value:Float, valueText:String)
	{
		
		this.bar.scaleX.animateTo(value, 0.2);
		this.countEnemyLife.text = valueText;
	}
	
	override public function onAdded():Void
    {
		this.owner.add(transform);
		this.addBar();
		this.addTextBar();
		this.addTurns();
		this.owner.addChild(entity);		
	}
	
	override public function onRemoved():Void
	{
	}

	override public function onUpdate(dt:Float):Void
	{
		this.updateEnemyAttackHint(dt);
	}
	
	public function addToEntity():Entity
	{
		this.entity = new Entity();
		this.entity.add(this);
		return this.entity;
	}
	
}