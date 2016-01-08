package scenes.components;

import flambe.display.ImageSprite;
import flambe.display.Texture;

/**
 * ...
 * @author Edwin Cobos
 */
class NDiTutorialHighlight extends ImageSprite
{
	private var countTime:Float;
	private var isHighLight:Bool;
	
	public function new(texture:Texture) 
	{
		super(texture);
		this.countTime = 0;
		this.isHighLight = false;
	}
	
	
	private function highLightOn()
	{
		this.alpha.animateTo(1, 0.4);
		
	}
	
	private function highLightOff()
	{
		this.alpha.animateTo(0, 0.4);
	}
	
	private function updateHighLight(dt:Float)
	{
		this.countTime += dt;
		if (this.countTime > 0.8)
		{
			if (this.isHighLight)
			{
				this.highLightOff();
				this.isHighLight = false;
			}else {
				this.highLightOn();
				this.isHighLight = true;
			}
			this.countTime = 0;
		}
	}
	
	override function onUpdate(dt:Float)
	{
		super.onUpdate(dt);
		this.updateHighLight(dt);
	}
	
	override public function onAdded():Void 
	{
		super.onAdded();
		
	}
	
}