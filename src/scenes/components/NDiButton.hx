package scenes.components;

import flambe.animation.Ease;
import flambe.display.ImageSprite;
import flambe.display.Sprite;
import flambe.display.Texture;

/**
 * NDiTeravision
 * @author Edwin Cobos
 */
class NDiButton extends ImageSprite
{
	public var isSelected:Bool;
	public var nameButton:String;

	public function new(texture:Texture):Void
	{
		super(texture);
		this.isSelected = false;
		this.nameButton = super.name;
	}
	
	public function animationPressed()
	{
		this.scaleX.animateTo(0.85, 0.2, Ease.linear);
		this.scaleY.animateTo(0.85, 0.2, Ease.linear);
	}
	
	public function animationRelease()
	{
		this.scaleX.animateTo(1, 0.2, Ease.linear);
		this.scaleY.animateTo(1, 0.2, Ease.linear);
	}
	
	override public function onAdded():Void
    {
		super.onAdded();				
	}
	
}