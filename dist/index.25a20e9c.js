let s,t;var i={};i=class{constructor(s,t,i){this.memory=new Uint8Array(4096),this.v=new Uint8Array(16),this.index=0,this.pc=512,this.stack=[],this.sp=0,this.delayTimer=0,this.soundTimer=0,this.keyboard=t,this.speaker=i,this.monitor=s,this.paused=!1,this.speed=10}loadSpritesIntoMemory(){let s=[240,144,144,144,240,32,96,32,32,112,240,16,240,128,240,240,16,240,16,240,144,144,240,16,16,240,128,240,16,240,240,128,240,144,240,240,16,32,64,64,240,144,240,144,240,240,144,240,16,240,240,144,240,144,144,224,144,224,144,224,240,128,128,128,240,224,144,144,144,224,240,128,240,128,240,240,128,240,128,128];for(let t=0;t<s.length;t++)this.memory[t]=s[t]}loadProgramIntoMemory(s){for(let t=0;t<s.length;t++)this.memory[512+t]=s[t]}cycle(){for(let s=0;s<this.speed;s++)if(!this.paused){let s=this.memory[this.pc]<<8|this.memory[this.pc+1];this.interpretInstruction(s)}this.paused||this.updateTimers(),this.monitor.paint()}sound(){this.soundTimer>0?this.speaker.play():this.speaker.stop()}updateTimers(){this.delayTimer>0&&(this.delayTimer-=1),this.soundTimer>0&&(this.soundTimer-=1)}interpretInstruction(s){this.pc+=2;let t=(3840&s)>>8,i=(240&s)>>4;switch(61440&s){case 0:switch(s){case 224:this.monitor.clear();break;case 238:this.pc=this.stack.pop()}break;case 4096:this.pc=4095&s;break;case 8192:this.stack.push(this.pc),this.pc=4095&s;break;case 12288:this.v[t]===(255&s)&&(this.pc+=2);break;case 16384:this.v[t]!==(255&s)&&(this.pc+=2);break;case 20480:this.v[t]===this.v[i]&&(this.pc+=2);break;case 24576:this.v[t]=255&s;break;case 28672:this.v[t]+=255&s;break;case 32768:switch(15&s){case 0:this.v[t]=this.v[i];break;case 1:this.v[t]|=this.v[i];break;case 2:this.v[t]&=this.v[i];break;case 3:this.v[t]^=this.v[i];break;case 4:let e=this.v[t]+=this.v[i];this.v[15]=0,e>255&&(this.v[15]=1),this.v[t]=e;break;case 5:this.v[15]=0,this.v[t]>this.v[i]&&(this.v[15]=1),this.v[t]-=this.v[i];break;case 6:this.v[15]=1&this.v[t],this.v[t]>>=1;break;case 7:this.v[15]=0,this.v[i]>this.v[t]&&(this.v[15]=1),this.v[t]=this.v[i]-this.v[t];break;case 14:this.v[15]=this.v[t]>>7,this.v[t]<<=1;break;default:console.error(`Unknown instruction: ${s.toString(16)}`)}break;case 36864:this.v[t]!==this.v[i]&&(this.pc+=2);break;case 40960:this.index=4095&s;break;case 45056:this.pc=(4095&s)+this.v[0];break;case 49152:let h=Math.floor(255*Math.random());this.v[t]=255&s&h;break;case 53248:let a=15&s;this.v[15]=0;for(let s=0;s<a;s++){let e=this.memory[this.index+s];for(let h=0;h<8;h++)(128&e)>0&&this.monitor.setPixel(this.v[t]+h,this.v[i]+s)&&(this.v[15]=1),e<<=1}break;case 57344:switch(255&s){case 158:this.keyboard.isKeyPressed(this.v[t])&&(this.pc+=2);break;case 161:this.keyboard.isKeyPressed(this.v[t])||(this.pc+=2);break;default:console.error(`Unknown instruction: ${s.toString(16)}`)}break;case 61440:switch(255&s){case 7:this.v[t]=this.delayTimer;break;case 10:this.paused=!0,this.keyboard.onNextKeyPress=(function(s){this.v[t]=s,this.paused=!1}).bind(this);break;case 21:this.delayTimer=this.v[t];break;case 24:this.soundTimer=this.v[t];break;case 30:this.index+=this.v[t];break;case 41:this.index=5*this.v[t];break;case 51:this.memory[this.index]=parseInt(this.v[t]/100),this.memory[this.index+1]=parseInt(this.v[t]%100/10),this.memory[this.index+2]=parseInt(this.v[t]%10);break;case 85:for(let s=0;s<=t;s++)this.memory[this.index+s]=this.v[s];break;case 101:for(let s=0;s<=t;s++)this.v[s]=this.memory[this.index+s];break;default:console.error(`Unknown instruction: ${s.toString(16)}`)}}}};var e={};e=class{constructor(s){this.cols=64,this.rows=32,this.display=Array(this.cols*this.rows),this.scale=15,this.canvas=s,this.canvas.width=this.cols*this.scale,this.canvas.height=this.rows*this.scale,this.canvasCtx=this.canvas.getContext("2d")}setPixel(s,t){return s>this.cols?s-=this.cols:s<0&&(s+=this.cols),t>this.rows?t-=this.rows:t<0&&(t+=this.rows),this.display[s+t*this.cols]^=1,1!=this.display[s+t*this.cols]}clear(){this.display=Array(this.cols*this.rows)}paint(){this.canvasCtx.fillStyle="#000000",this.canvasCtx.fillRect(0,0,this.canvas.width,this.canvas.height);for(let s=0;s<this.cols*this.rows;s++){let t=s%this.cols*this.scale,i=Math.floor(s/this.cols)*this.scale;1==this.display[s]&&(this.canvasCtx.fillStyle="#ffffff",this.canvasCtx.fillRect(t,i,this.scale,this.scale))}}testRender(){this.setPixel(0,0),this.setPixel(5,2),this.paint()}};var h={};h=class{constructor(){this.KEYMAP={49:1,50:2,51:3,52:12,81:4,87:5,69:6,82:13,65:7,83:8,68:9,70:14,90:10,88:0,67:11,86:15},this.keysPressed=[],this.onNextKeyPress=null,document.addEventListener("keydown",this.onKeyDown.bind(this),!1),document.addEventListener("keyup",this.onKeyUp.bind(this),!1)}isKeyPressed(s){return this.keysPressed[s]}onKeyDown(s){let t=this.KEYMAP[s.keyCode];this.keysPressed[t]=!0,null!=this.onNextKeyPress&&t&&(this.onNextKeyPress(parseInt(t)),this.onNextKeyPress=null)}onKeyUp(s){let t=this.KEYMAP[s.which];this.keysPressed[t]=!1}};var a={};a=class{constructor(){this.audioCtx=new window.AudioContext,this.audioCtx.resume(),window.addEventListener("click",()=>{this.audioCtx.resume()})}play(){this.audioCtx&&!this.oscillator&&(this.oscillator=this.audioCtx.createOscillator(),this.oscillator.type="square",this.oscillator.frequency.setValueAtTime(440,this.audioCtx.currentTime),this.oscillator.connect(this.audioCtx.destination),this.oscillator.start())}stop(){this.oscillator&&(this.oscillator.stop(),this.oscillator.disconnect(),this.oscillator=null)}};const r=new i(new e(document.getElementById("screen")),new h,new a);!function(i){function e(){Date.now()-t>s&&r.cycle(),requestAnimationFrame(e)}fetch(`/rom/${i}`).then(s=>s.arrayBuffer()).then(i=>{let h=new Uint8Array(i);s=16.666666666666668,t=Date.now(),r.loadSpritesIntoMemory(),r.loadProgramIntoMemory(h),requestAnimationFrame(e)})}("SPACE_INVADER");
//# sourceMappingURL=index.25a20e9c.js.map
