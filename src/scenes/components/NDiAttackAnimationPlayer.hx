package scenes.components;

import flambe.display.Sprite;
import flambe.script.CallFunction;
import flambe.script.Delay;
import flambe.script.Script;
import flambe.script.Sequence;
import flambe.swf.Library;
import flambe.swf.MoviePlayer;
import game_objects.turtles.NDiTurtle;
import globals.NDiGameConstants;
import managers.NDiAudioManager;
import managers.NDiPlayerManager;

/**
 * ...
 * @author Edwin
 */
class NDiAttackAnimationPlayer extends MoviePlayer
{
	public var attackName:String;
	public var transform:Sprite;
	public var frequencyMatch:Int;
	public var totalTurtles:Int;
	
	private var originalTutle:NDiTurtle;
	private var parentManager:NDiPlayerManager;	
	
	public function new(lib:Library, turtle:NDiTurtle, parent:NDiPlayerManager) 
	{
		super(lib);
		this.transform = new Sprite();
		this.attackName = super.name;
		this.originalTutle = turtle;
		this.parentManager = parent;
		this.frequencyMatch = 0;
	}
	
	public function animationIdle(turnToAttack:Int, turnToAppear:Int)
	{
		//trace("TURN: " + turnToAttack);
		//trace("turnToAppear: " + turnToAppear);
		//trace("ATTACK NAME " + this.attackName);
		
		this.loop("empty_animation");
		
		this.play(this.attackName + "_attack");
		
		var f0:CallFunction = new CallFunction(function() {
			this.transform.visible = false;
			
			var f1:CallFunction = new CallFunction(function() {
				
				//if (this.parentManager.getParentManager().getEnemyPercentLife() > 0.0)
				if(!this.parentManager.getParentManager().getStateEnemyChange())
				{
					this.play(this.attackName + "_attack_wpn");				
					this.transform.visible = true;
					
					//EnemieDamage
					var tmpMap:Map<String, Int> = new Map<String, Int>();
					tmpMap.set(this.originalTutle.type.getName(), this.frequencyMatch);
					tmpMap.set(NDiGameConstants.TOTAL_TURTLES_TYPE, this.totalTurtles);
					this.parentManager.getParentManager().attackToEnemie(tmpMap);
					
					NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.SOUND_TMNT_WEAPON_FOLDER+""+this.attackName+""+NDiGameConstants.SOUND_TMNT_WEAPON_POSTFIX);
				}
				
				//trace(this.originalTutle.type + " ATTACK ---+++ " + this.frequencyMatch);
				var f2:CallFunction = new CallFunction(function() {
					this.owner.dispose();
					var f3:CallFunction = new CallFunction(function() {
						this.originalTutle.transform.visible = true;
						this.originalTutle.animationIdle();
						this.originalTutle.animationFall();
						if (!this.parentManager.firstTurtleAttack)
						{
							//trace("REMOVE -- TURTLE ATTACK");
							this.parentManager.getParentManager().sendBlockToPuzzle();
							this.parentManager.firstTurtleAttack = true;
						}
					});
					//trace(turnToAppear);
					//var delay:Float = turnToAppear * 0.6;
					var delay:Float = turnToAppear * 0.8;
					var seq3:Sequence = new Sequence([new Delay(delay), f3]);
					this.originalTutle.owner.get(Script).run(seq3);
				});
				var seq2:Sequence = new Sequence([new Delay(0.416), f2]);
				this.owner.get(Script).run(seq2);
				
			});
			var seq1:Sequence = new Sequence([new Delay(0.6*turnToAttack), f1]);
			this.owner.get(Script).run(seq1);
			
		});
		
		var seq0:Sequence = new Sequence([new Delay(0.666), f0]);
		this.owner.get(Script).run(seq0);
		
		/*
		this.movie._.looped.connect(function() {
			if (this.transform.alpha._ == 1)
			{
				trace("ALPHA: 0");
				this.transform.alpha._ = 0;
				var f1:CallFunction = new CallFunction(function() {					
					this.play(this.attackName + "_attack_wpn");
					//trace("ALPHA: 1");
					this.transform.alpha._ = 1;						
					this.movie.changed.connect(function(c, d) {
							if (c == null)
								return;
								
							//trace("DELETEEE "+this.attackName);
							this.owner.dispose();
							
							var f2:CallFunction = new CallFunction(function() {
								//this.originalTutle.transform.alpha._ = 1;
								this.originalTutle.transform.visible = true;
								this.originalTutle.animationFall();
							});
							var delay:Float = turnToAppear * 0.85;
							trace("DELAYYYY: "+delay);
							var seq2:Sequence = new Sequence([new Delay(delay), f2]);
							this.originalTutle.owner.get(Script).run(seq2);
						}
					).once();
				});
				var seq1:Sequence = new Sequence([new Delay(0.6*turnToAttack), f1]);
				this.owner.get(Script).run(seq1);
			}
		}).once();
		*/
		
	}
	
	override public function onAdded():Void
    {
		super.onAdded();
		this.owner.add(this.transform);
		this.owner.add(new Script());
		///trace("INIT PLAYERS");
		
	}
	
	public function delete():Void
	{		
		this.owner.dispose();
	}
	
}