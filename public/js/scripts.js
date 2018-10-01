var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(95, window.innerWidth / window.innerHeight, 0.01, 9000);
camera.position.z = 1000;

var mouseX;
var mouseY; 
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;



var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 1);
document.body.appendChild(renderer.domElement);

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = false;
controls.dampingFactor = .25;
controls.enableZoom = true;
controls.autoRotate = false;

var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(33, 0%, 75%)'), 1.0);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(255, 0%, 12%)'), 0.75);
fillLight.position.set(-100, 0, 100);

var backLight = new THREE.DirectionalLight(0xff00000, 1.0);
backLight.position.set(100, 0, -100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);



circle = new THREE.Object3D();
skelet = new THREE.Object3D();
particle = new THREE.Object3D();

scene.add(circle);
scene.add(skelet);
scene.add(particle);

var geometry = new THREE.TetrahedronGeometry(2, 0);
var geom = new THREE.IcosahedronGeometry(7, 1);
var geom2 = new THREE.IcosahedronGeometry(15, 1);

var material = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  shading: THREE.FlatShading
});

for (var i = 0; i < 1000; i++) {
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
  mesh.position.multiplyScalar(90 + (Math.random() * 700));
  mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  particle.add(mesh);
}

var mat = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  shading: THREE.FlatShading
});

var mat2 = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  wireframe: true,
  side: THREE.DoubleSide

});

var planet = new THREE.Mesh(geom, mat);
planet.scale.x = planet.scale.y = planet.scale.z = 16;
circle.add(planet);

var planet2 = new THREE.Mesh(geom2, mat2);
planet2.scale.x = planet2.scale.y = planet2.scale.z = 10;
skelet.add(planet2);

var ambientLight = new THREE.AmbientLight(0x999999 );
scene.add(ambientLight);
var mtlLoader = new THREE.MTLLoader();
mtlLoader.setTexturePath('assets/');
mtlLoader.setPath('assets/');
mtlLoader.load('a.mtl', function (materials) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('assets/');
    objLoader.load('a.obj', function (object) {

        scene.add(object);
        object.position.y -= 0;

    });

});

var animate = function () {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
};



function onDocumentMouseMove(e){
     mouseX = (e.clientX - windowHalfX) / 3;
     mouseY = (e.clientY - windowHalfY) / 3;
     camera.position.x += (mouseX - camera.position.x) * .05;
     camera.position.y += (mouseX - camera.position.y) * .05;
}
function render() {

}


animate();
document.addEventListener('mousemove', onDocumentMouseMove, false );
