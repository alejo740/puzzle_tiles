package game_objects.enemies;
import flambe.Entity;
import flambe.swf.Library;
import globals.NDiGameConstants;
import managers.NDiEnemyManager;
import managers.NDiResourcesManager;

/**
 * ...
 * @author Edwin
 */
class NDiMouserEnemy extends NDiEnemy
{
	private var subMouser:Array<NDiEnemy>;
	private var limitNumMousers:Int;
	
	public var countComboAttack:Int;
	
	public function new(index:Int)
	{
		super(index);
		this.subMouser = new Array<NDiEnemy>();
		this.limitNumMousers = 5;
		this.life = 50;
		this.totalLife = 50;
		this.attackLenghtTime = 0.75;
		this.countComboAttack = 0;
	}
	
	public function getNumSubMousers():Int
	{
		return this.subMouser.length;
	}
	
	override public function setConfigEnemy(config:Map<String, Dynamic>):Void
	{
		this.limitNumMousers = config.get("param1");		
	}
	
	override public function animationDeath()
	{
		super.animationDeath();		
		for (i in 0...this.subMouser.length-1)
		{
			this.subMouser[i + 1].animationDeath();
		}
	}
	
	override public function animationAttack()
	{
		this.countComboAttack = 0;
		super.animationAttack();
		if (this.life > 0) {			
			for (i in 0...this.subMouser.length-1)
			{
				this.subMouser[i + 1].animationAttack();
			}
		}		
	}
	
	override public function receiveDamage(matchingFrequency:Map<String, Int>):Float
	{
		var valueAttack:Float = super.receiveDamage(matchingFrequency);
		if (valueAttack <= 0)
			return valueAttack;
			
		if (this.life > 0) {
			for (i in 0...this.subMouser.length-1)
			{
				this.subMouser[i + 1].animationHit();
			}
		}
		
		return valueAttack;
	}
	
	override public function specialAttack()
	{
		if (this.subMouser.length < this.limitNumMousers)
		{
			trace("ADD NEW MOUSER");
			var newMouser:NDiEnemy = new NDiEnemy(this.indexEnemy);
			newMouser.type = this.type;
			newMouser.transform.x._ = NDiGameConstants.ARRAY_POSITIONS_MOUSERS[this.subMouser.length].x;
			newMouser.transform.y._ = NDiGameConstants.ARRAY_POSITIONS_MOUSERS[this.subMouser.length].y;
			newMouser.life = newMouser.totalLife = 50;
			newMouser.attackLenghtTime = this.attackLenghtTime;
			this.subMouser.push(newMouser);
			newMouser.animationIdle();
			this.owner.addChild(newMouser.addToEntity());
			newMouser.animationAppear();
			
			this.life += newMouser.life;
			this.totalLife += newMouser.totalLife;
			this.parentManager.getParentGamePlay().updateHUDEnemyLife();
		}
	}
	
	override public function onAdded():Void
    {
		super.onAdded();		
		//this.libraryAnimations = NDiResourcesManager.getInstance().loadSetAnimations(NDiGameConstants.ASSET_PACKAGE_GENERAL, NDiGameConstants.PACK_ANIMATIONS_ENEMIES);		
		//this.transform.setScale(0.5);
		this.transform.x._ = NDiGameConstants.ARRAY_POSITIONS_MOUSERS[0].x;
		this.transform.y._ = NDiGameConstants.ARRAY_POSITIONS_MOUSERS[0].y;
		this.subMouser.push(this);
		
	}
	
	
	
}