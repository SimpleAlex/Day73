var canvas,ctx,p;
canvas = document.getElementsByTagName('canvas')[0];
ctx = canvas.getContext('2d');
canvas.width=canvas.height=400;
aaa();

function aaa(){
    var a,b,c,d,s,tim,q,qt,x,y,r,tx,ty;
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle="rgb(29, 23, 25)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.globalCompositeOperation = "lighter";

    tx=canvas.width/2;
    ty=canvas.height/2;
    tim=new Date().getTime()/31;

    p=[];
    for(a=0;a<3;a++){
        b=(a+1)/4;
        x=b;
        y=0;
        r=tim/13+a*(2);
        x+=Math.cos(r)*0.18;
        y+=Math.sin(r)*0.18;
        p.push([x,y]);
    }

    r=tim/43;
    q=[];
    s=[];
    for(a=0;a<3;a++){
        x=Math.cos(r)*130;
        y=Math.sin(r)*130;
        q.push([tx+x,ty+y]);
        s.push([tx-x,ty-y]);
        r+=Math.PI*2/3;
    }

    ctx.strokeStyle="hsl(154, 49%, 52%)";
    qt=[];
    for(a=0;a<3;a++){
        b=(a+1)%3;
        qt[a]=[];
        koch(q[a][0],q[a][1],q[b][0],q[b][1],4,qt[a]);
        qt[a].push(q[b]);
    }

    ctx.strokeStyle="hsla("+(55)+",90%,90%,0.08)";
    for(a=0;a<3;a++){
        b=qt[a];
        d=s[(a+2)%3];
        for(c=0;c<b.length;c++){
            ctx.beginPath();
            ctx.lineTo(d[0],d[1]);
            ctx.lineTo(b[c][0],b[c][1]);
            ctx.lineTo(tx,ty);
            ctx.stroke();
        }
    }
    requestAnimationFrame(aaa);
}

function koch(sx,sy,ex,ey,kai,qt){
    var a,x,y,p1,tx,ty,px,py,x1,y1;
    x=ex-sx;
    y=ey-sy;
    p1=[];
    for(a=0;a<3;a++){
        px=p[a][0];
        py=p[a][1];
        x1=sx+x*px-y*py;
        y1=sy+y*px+x*py;
        p1.push([x1,y1]);
    }

    if(kai<=0){
        ctx.beginPath();
        ctx.lineTo(sx,sy);
        ctx.lineTo(p1[0][0],p1[0][1]);
        ctx.lineTo(p1[1][0],p1[1][1]);
        ctx.lineTo(p1[2][0],p1[2][1]);
        ctx.lineTo(ex,ey);
        ctx.stroke();
        qt.push([sx,sy],p1[0],p1[1],p1[2]);
    }else{
        kai--;
        koch(p1[0][0],p1[0][1],sx,sy,kai,qt);
        koch(p1[0][0],p1[0][1],p1[1][0],p1[1][1],kai,qt);
        koch(p1[2][0],p1[2][1],p1[1][0],p1[1][1],kai,qt);
        koch(p1[2][0],p1[2][1],ex,ey,kai,qt);
    }
}
