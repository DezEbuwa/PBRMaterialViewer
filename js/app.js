var canvas = document.getElementById('renderCanvas');
var engine = new BABYLON.Engine(canvas, true);

var materials = {};
var sphereGrp;
var spheres = new Array(30);

var hdrTexture;
var hdrHiTexture;
var createScene = function () {
    var scene = new BABYLON.Scene(engine);

    var light = new BABYLON.PointLight('Omni', new BABYLON.Vector3(20, 20, 100), scene);
    light.intensity = 1;

	camera = new BABYLON.UniversalCamera('uniCam', new BABYLON.Vector3(-100, 100, -150), scene);
    camera.setTarget(new BABYLON.Vector3(-99.34500825405121, 99.7378976047039, -149.29127711057663));
    camera.attachControl(canvas, false);
    camera.speed = 10;
    camera.angularSensibility = 2000;



    var row = 0;
    var col = 0;
    for(var i = 0; i < spheres.length; i++){
        spheres[i] = BABYLON.Mesh.CreateSphere('sphere_' + i, 48, 30.0, scene);
        spheres[i].position = new BABYLON.Vector3(col * 100, 0, row * 100);
        if(col < 5){
            col++;
        }else{
            col = 0;
            row++;
        }

    }


    hdrTexture = new BABYLON.HDRCubeTexture('./hdr/room.hdr', scene, 512);
    hdrHiTexture = hdrTexture.clone();

    var gridMaterial = new BABYLON.GridMaterial('gridMaterial', scene);
    gridMaterial.majorUnitFrequency = 10;
    gridMaterial.minorUnitVisibility = 0.8;
    gridMaterial.gridRatio = 0.5;
    gridMaterial.mainColor = new BABYLON.Color3(0, 0.05, 0.2);
    gridMaterial.lineColor = new BABYLON.Color3(64/255, 64/255, 64/255);
    gridMaterial.backFaceCulling = false;

    var hdrSkybox = BABYLON.Mesh.CreateBox('hdrSkybox', 1500, scene);
    hdrSkybox.material = gridMaterial;
    hdrSkybox.infiniteDistance = true;

    /*
    var hdrSkyboxMaterial = new BABYLON.PBRMaterial('skybox', scene);
    hdrSkyboxMaterial.backFaceCulling = false;
    hdrSkyboxMaterial.reflectionTexture = hdrHiTexture.clone();
    hdrSkyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    hdrSkyboxMaterial.microSurface = 1.0;
    hdrSkyboxMaterial.cameraExposure = 0.6;
    hdrSkyboxMaterial.cameraContrast = 1.6;
    hdrSkyboxMaterial.disableLighting = true;
    hdrSkybox.material = hdrSkyboxMaterial;
    */

    /* START MATERIALS */

    //Aluminum Rough
    materials.alumRough = new BABYLON.PBRMaterial('alumRough', scene);
    materials.alumRough.reflectionTexture = hdrTexture;
    materials.alumRough.backFaceCulling = false;
    materials.alumRough.emissiveColor = new BABYLON.Color3(1, 1, 1);
    materials.alumRough.specularPower = 16;
    materials.alumRough.directIntensity = 0;
    materials.alumRough.environmentIntensity = 0.85;
    materials.alumRough.cameraExposure = 0.66;
    materials.alumRough.cameraContrast = 1.66;
    materials.alumRough.microSurface = 0.75;
    materials.alumRough.reflectivityColor = new BABYLON.Color3(1, 1, 1);
    materials.alumRough.albedoColor = new BABYLON.Color3(0.95, 0.95, 0.95);
    materials.alumRough.bumpTexture = new BABYLON.Texture('./textures/metalBump.jpg', scene);

    spheres[0].bbLabel = getBBLabel(spheres[0], scene, 'Aluminum Rough');
    spheres[0].material = materials.alumRough;

    //Black Chrome
    materials.blackchrome = new BABYLON.PBRMaterial('blackchrome', scene);
    materials.blackchrome.reflectionTexture = hdrTexture;
    materials.blackchrome.backFaceCulling = false;
    materials.blackchrome.emissiveColor = new BABYLON.Color3(1, 1, 1);
    materials.blackchrome.specularPower = 16;
    materials.blackchrome.directIntensity = 0;
    materials.blackchrome.environmentIntensity = 0.85;
    materials.blackchrome.cameraExposure = 0.66;
    materials.blackchrome.cameraContrast = 1.66;
    materials.blackchrome.microSurface = 0.96;
    materials.blackchrome.reflectivityColor = new BABYLON.Color3(1, 1, 1);
    materials.blackchrome.albedoColor = new BABYLON.Color3(0, 0, 0);

    spheres[1].bbLabel = getBBLabel(spheres[1], scene, 'Black Chrome');
    spheres[1].material = materials.blackchrome;


    //Matte Black
    materials.matBlack = new BABYLON.StandardMaterial('matBlack', scene);
    materials.matBlack.alpha = 1;
    materials.matBlack.backFaceCulling = false;
    materials.matBlack.specularPower = 16;
    materials.matBlack.useSpecularOverAlpha = true;
    materials.matBlack.useAlphaFromDiffuseTexture = false;
    materials.matBlack.diffuseColor = new BABYLON.Color3(0, 0, 0);
    materials.matBlack.emissiveColor = new BABYLON.Color3(0.03, 0.03, 0.03);
    materials.matBlack.ambientColor = new BABYLON.Color3(0.04, 0.04, 0.04);
    materials.matBlack.specularColor = new BABYLON.Color3(0.2, 0.2, 0.2);

    spheres[2].bbLabel = getBBLabel(spheres[2], scene, 'Matte Black');
    spheres[2].material = materials.matBlack;


    //Metal Chrome Satin
    materials.metalChromeSatin = new BABYLON.PBRMaterial('metalChromeSatin', scene);
    materials.metalChromeSatin.reflectionTexture = hdrTexture;
    materials.metalChromeSatin.backFaceCulling = false;
    materials.metalChromeSatin.emissiveColor = new BABYLON.Color3(1, 1, 1);
    materials.metalChromeSatin.specularPower = 16;
    materials.metalChromeSatin.directIntensity = 0;
    materials.metalChromeSatin.environmentIntensity = 0.85;
    materials.metalChromeSatin.cameraExposure = 0.66;
    materials.metalChromeSatin.cameraContrast = 1.66;
    materials.metalChromeSatin.microSurface = 0.96;
    materials.metalChromeSatin.reflectivityColor = new BABYLON.Color3(0.98, 0.97, 0.86);
    materials.metalChromeSatin.albedoColor = new BABYLON.Color3(0.9, 0.9, 0.9);

    spheres[3].bbLabel = getBBLabel(spheres[3], scene, 'Metal Chrome Satin');
    spheres[3].material = materials.metalChromeSatin;


    //Matte Beige Metal
    materials.matBeigeMetal = new BABYLON.StandardMaterial('matBeigeMetal', scene);
    materials.matBeigeMetal.alpha = 1;
    materials.matBeigeMetal.backFaceCulling = false;
    materials.matBeigeMetal.specularPower = 16;
    materials.matBeigeMetal.useSpecularOverAlpha = true;
    materials.matBeigeMetal.useAlphaFromDiffuseTexture = false;
    materials.matBeigeMetal.diffuseColor = new BABYLON.Color3(0.78, 0.76, 0.69);
    materials.matBeigeMetal.emissiveColor = new BABYLON.Color3(0.03, 0.03, 0.03);
    materials.matBeigeMetal.ambientColor = new BABYLON.Color3(0.04, 0.04, 0.04);
    materials.matBeigeMetal.specularColor = new BABYLON.Color3(0.2, 0.2, 0.2);

    spheres[4].bbLabel = getBBLabel(spheres[4], scene, 'Matte Beige Metal');
    spheres[4].material = materials.matBeigeMetal;


    //Nickel Polished
    materials.nickelPolished = new BABYLON.PBRMaterial('nickelPolished', scene);
    materials.nickelPolished.reflectionTexture = hdrTexture;
    materials.nickelPolished.backFaceCulling = false;
    materials.nickelPolished.emissiveColor = new BABYLON.Color3(1, 1, 1);
    materials.nickelPolished.specularPower = 16;
    materials.nickelPolished.directIntensity = 0;
    materials.nickelPolished.environmentIntensity = 0.85;
    materials.nickelPolished.cameraExposure = 0.66;
    materials.nickelPolished.cameraContrast = 1.66;
    materials.nickelPolished.microSurface = 0.96;
    materials.nickelPolished.reflectivityColor = new BABYLON.Color3(0.78, 0.76, 0.69);
    materials.nickelPolished.albedoColor = new BABYLON.Color3(0.9, 0.9, 0.9);

    spheres[5].bbLabel = getBBLabel(spheres[5], scene, 'Nickel Polished');
    spheres[5].material = materials.nickelPolished;


    //Nickel Satin
    materials.nickelSatin = new BABYLON.PBRMaterial('nickelSatin', scene);
    materials.nickelSatin.reflectionTexture = hdrTexture;
    materials.nickelSatin.backFaceCulling = false;
    materials.nickelSatin.emissiveColor = new BABYLON.Color3(1, 1, 1);
    materials.nickelSatin.specularPower = 16;
    materials.nickelSatin.directIntensity = 0;
    materials.nickelSatin.environmentIntensity = 0.85;
    materials.nickelSatin.cameraExposure = 0.66;
    materials.nickelSatin.cameraContrast = 1.66;
    materials.nickelSatin.microSurface = 0.7;
    materials.nickelSatin.reflectivityColor = new BABYLON.Color3(0.78, 0.76, 0.69);
    materials.nickelSatin.albedoColor = new BABYLON.Color3(0.9, 0.9, 0.9);

    spheres[6].bbLabel = getBBLabel(spheres[6], scene, 'Nickel Satin');
    spheres[6].material = materials.nickelSatin;


    //Paint Gloss Black
    materials.paintGlossBlack = new BABYLON.PBRMaterial('paintGlossBlack', scene);
    materials.paintGlossBlack.reflectionTexture = hdrTexture;
    materials.paintGlossBlack.directIntensity = 0.6;
    materials.paintGlossBlack.environmentIntensity = 0.7;
    materials.paintGlossBlack.cameraExposure = 0.6;
    materials.paintGlossBlack.cameraContrast = 1.6;
    materials.paintGlossBlack.microSurface = 0.85;
    materials.paintGlossBlack.albedoColor = new BABYLON.Color3(0, 0, 0);
    materials.paintGlossBlack.reflectivityColor = new BABYLON.Color3(0.3, 0.3, 0.3);

    spheres[7].bbLabel = getBBLabel(spheres[7], scene, 'Paint Gloss Black');
    spheres[7].material = materials.paintGlossBlack;

    //Paint Gloss White
    materials.paintGlossBlack = new BABYLON.PBRMaterial('paintGlossBlack', scene);
    materials.paintGlossBlack.reflectionTexture = hdrTexture;
    materials.paintGlossBlack.directIntensity = 0.6;
    materials.paintGlossBlack.environmentIntensity = 0.7;
    materials.paintGlossBlack.cameraExposure = 0.6;
    materials.paintGlossBlack.cameraContrast = 1.6;
    materials.paintGlossBlack.microSurface = 0.85;
    materials.paintGlossBlack.albedoColor = new BABYLON.Color3(0.8, 0.8, 0.8);
    materials.paintGlossBlack.reflectivityColor = new BABYLON.Color3(0.3, 0.3, 0.3);

    spheres[8].bbLabel = getBBLabel(spheres[8], scene, 'Paint Gloss White');
    spheres[8].material = materials.paintGlossBlack;

    //Paint Gloss White 1
    materials.paintGlossBlack = new BABYLON.PBRMaterial('paintGlossBlack', scene);
    materials.paintGlossBlack.reflectionTexture = hdrTexture;
    materials.paintGlossBlack.directIntensity = 0.6;
    materials.paintGlossBlack.environmentIntensity = 0.7;
    materials.paintGlossBlack.cameraExposure = 0.6;
    materials.paintGlossBlack.cameraContrast = 1.6;
    materials.paintGlossBlack.microSurface = 0.85;
    materials.paintGlossBlack.albedoColor = new BABYLON.Color3(1, 1, 1);
    materials.paintGlossBlack.reflectivityColor = new BABYLON.Color3(0.3, 0.3, 0.3);

    spheres[9].bbLabel = getBBLabel(spheres[9], scene, 'Paint Gloss White 1');
    spheres[9].material = materials.paintGlossBlack;

    //Paint Matte Black
    materials.paintGlossBlack = new BABYLON.PBRMaterial('paintGlossBlack', scene);
    materials.paintGlossBlack.reflectionTexture = hdrTexture;
    materials.paintGlossBlack.directIntensity = 0.6;
    materials.paintGlossBlack.environmentIntensity = 0.7;
    materials.paintGlossBlack.cameraExposure = 0.6;
    materials.paintGlossBlack.cameraContrast = 1.6;
    materials.paintGlossBlack.microSurface = 0.7;
    materials.paintGlossBlack.albedoColor = new BABYLON.Color3(0, 0, 0);
    materials.paintGlossBlack.reflectivityColor = new BABYLON.Color3(0.2, 0.2, 0.2);

    spheres[10].bbLabel = getBBLabel(spheres[10], scene, 'Paint Matte Black');
    spheres[10].material = materials.paintGlossBlack;

    //Paint Metallic Black
    materials.paintGlossBlack = new BABYLON.PBRMaterial('paintGlossBlack', scene);
    materials.paintGlossBlack.reflectionTexture = hdrTexture;
    materials.paintGlossBlack.directIntensity = 0.6;
    materials.paintGlossBlack.environmentIntensity = 0.7;
    materials.paintGlossBlack.cameraExposure = 0.6;
    materials.paintGlossBlack.cameraContrast = 1.6;
    materials.paintGlossBlack.microSurface = 0.85;
    materials.paintGlossBlack.albedoColor = new BABYLON.Color3(0, 0, 0);
    materials.paintGlossBlack.reflectivityColor = new BABYLON.Color3(0.2, 0.2, 0.2);

    spheres[11].bbLabel = getBBLabel(spheres[11], scene, 'Paint Metallic Black');
    spheres[11].material = materials.paintGlossBlack;


    //Paint Metallic Cool Grey
    materials.paintMetallicCoolGrey = new BABYLON.PBRMaterial('paintMetallicCoolGrey', scene);
    materials.paintMetallicCoolGrey.reflectionTexture = hdrTexture;
    materials.paintMetallicCoolGrey.directIntensity = 0.6;
    materials.paintMetallicCoolGrey.environmentIntensity = 0.7;
    materials.paintMetallicCoolGrey.cameraExposure = 0.6;
    materials.paintMetallicCoolGrey.cameraContrast = 1.6;
    materials.paintMetallicCoolGrey.microSurface = 0.85;
    materials.paintMetallicCoolGrey.albedoColor = new BABYLON.Color3(0.8, 0.8, 0.8);
    materials.paintMetallicCoolGrey.reflectivityColor = new BABYLON.Color3(0.2, 0.2, 0.2);

    spheres[12].bbLabel = getBBLabel(spheres[12], scene, 'Paint Metallic Cool Grey');
    spheres[12].material = materials.paintMetallicCoolGrey;

    //Paint Metallic Slate Grey
    materials.paintMetallicSlateGrey = new BABYLON.PBRMaterial('paintMetallicSlateGrey', scene);
    materials.paintMetallicSlateGrey.reflectionTexture = hdrTexture;
    materials.paintMetallicSlateGrey.directIntensity = 0.6;
    materials.paintMetallicSlateGrey.environmentIntensity = 0.7;
    materials.paintMetallicSlateGrey.cameraExposure = 0.6;
    materials.paintMetallicSlateGrey.cameraContrast = 1.6;
    materials.paintMetallicSlateGrey.microSurface = 0.85;
    materials.paintMetallicSlateGrey.albedoColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    materials.paintMetallicSlateGrey.reflectivityColor = new BABYLON.Color3(0.2, 0.2, 0.2);

    spheres[13].bbLabel = getBBLabel(spheres[13], scene, 'Paint Metallic Slate Grey');
    spheres[13].material = materials.paintMetallicSlateGrey;


    //Stainless Steel Brushed
    materials.ssBrushed = new BABYLON.PBRMaterial('ssBrushed', scene);
    materials.ssBrushed.reflectionTexture = hdrTexture;
    materials.ssBrushed.backFaceCulling = false;
    materials.ssBrushed.emissiveColor = new BABYLON.Color3(1, 1, 1);
    materials.ssBrushed.specularPower = 16;
    materials.ssBrushed.directIntensity = 0;
    materials.ssBrushed.environmentIntensity = 0.85;
    materials.ssBrushed.cameraExposure = 0.66;
    materials.ssBrushed.cameraContrast = 1.66;
    materials.ssBrushed.microSurface = 0.8;
    materials.ssBrushed.reflectivityColor = new BABYLON.Color3(1, 1, 1);
    materials.ssBrushed.albedoColor = new BABYLON.Color3(0, 0, 0);
    materials.ssBrushed.bumpTexture = new BABYLON.Texture('./textures/brushedMetalNormal.jpg', scene);

    spheres[14].bbLabel = getBBLabel(spheres[14], scene, 'Stainless Steel Brushed');
    spheres[14].material = materials.ssBrushed;

    //Steel
    materials.steel = new BABYLON.PBRMaterial('steel', scene);
    materials.steel.reflectionTexture = hdrTexture;
    materials.steel.backFaceCulling = false;
    materials.steel.emissiveColor = new BABYLON.Color3(1, 1, 1);
    materials.steel.specularPower = 8;
    materials.steel.directIntensity = 0;
    materials.steel.environmentIntensity = 0.85;
    materials.steel.cameraExposure = 0.66;
    materials.steel.cameraContrast = 1.66;
    materials.steel.microSurface = 0.8;
    materials.steel.reflectivityColor = new BABYLON.Color3(1, 1, 1);
    materials.steel.albedoColor = new BABYLON.Color3(0, 0, 0);

    spheres[15].bbLabel = getBBLabel(spheres[15], scene, 'Steel');
    //spheres[15].material = materials.steel;


    //Steel 11
    materials.steel11 = new BABYLON.PBRMaterial('steel1111', scene);
    materials.steel11.reflectionTexture = hdrTexture;
    materials.steel11.backFaceCulling = false;
    materials.steel11.emissiveColor = new BABYLON.Color3(1, 1, 1);
    materials.steel11.specularPower = 8;
    materials.steel11.directIntensity = 0;
    materials.steel11.environmentIntensity = 0.85;
    materials.steel11.cameraExposure = 0.66;
    materials.steel11.cameraContrast = 1.66;
    materials.steel11.microSurface = 0.8;
    materials.steel11.reflectivityColor = new BABYLON.Color3(1, 1, 1);
    materials.steel11.albedoColor = new BABYLON.Color3(0, 0, 0);

    spheres[16].bbLabel = getBBLabel(spheres[16], scene, 'Steel 11');
    spheres[16].material = materials.steel11;

    //Steel 18
    materials.steel18 = new BABYLON.PBRMaterial('steel18', scene);
    materials.steel18.reflectionTexture = hdrTexture;
    materials.steel18.backFaceCulling = false;
    materials.steel18.emissiveColor = new BABYLON.Color3(1, 1, 1);
    materials.steel18.specularPower = 8;
    materials.steel18.directIntensity = 0;
    materials.steel18.environmentIntensity = 0.85;
    materials.steel18.cameraExposure = 0.66;
    materials.steel18.cameraContrast = 1.66;
    materials.steel18.microSurface = 0.8;
    materials.steel18.reflectivityColor = new BABYLON.Color3(1, 1, 1);
    materials.steel18.albedoColor = new BABYLON.Color3(0, 0, 0);

    spheres[17].bbLabel = getBBLabel(spheres[17], scene, 'Steel 18');
    spheres[17].material = materials.steel18;


    //Steel 3
    materials.steel3 = new BABYLON.PBRMaterial('steel3', scene);
    materials.steel3.reflectionTexture = hdrTexture;
    materials.steel3.backFaceCulling = false;
    materials.steel3.emissiveColor = new BABYLON.Color3(1, 1, 1);
    materials.steel3.specularPower = 8;
    materials.steel3.directIntensity = 0;
    materials.steel3.environmentIntensity = 0.85;
    materials.steel3.cameraExposure = 0.66;
    materials.steel3.cameraContrast = 1.66;
    materials.steel3.microSurface = 0.8;
    materials.steel3.reflectivityColor = new BABYLON.Color3(1, 1, 1);
    materials.steel3.albedoColor = new BABYLON.Color3(0, 0, 0);

    spheres[18].bbLabel = getBBLabel(spheres[18], scene, 'Steel 3');
    spheres[18].material = materials.steel3;


    //Steel Dusty Scratched
    materials.steelDustyScratched = new BABYLON.PBRMaterial('steelDustyScratched', scene);
    materials.steelDustyScratched.reflectionTexture = hdrTexture;
    materials.steelDustyScratched.backFaceCulling = false;
    materials.steelDustyScratched.emissiveColor = new BABYLON.Color3(1, 1, 1);
    materials.steelDustyScratched.specularPower = 8;
    materials.steelDustyScratched.directIntensity = 0;
    materials.steelDustyScratched.environmentIntensity = 0.85;
    materials.steelDustyScratched.cameraExposure = 0.66;
    materials.steelDustyScratched.cameraContrast = 1.66;
    materials.steelDustyScratched.microSurface = 0.8;
    materials.steelDustyScratched.reflectivityColor = new BABYLON.Color3(1, 1, 1);
    materials.steelDustyScratched.albedoColor = new BABYLON.Color3(0, 0, 0);
    materials.steelDustyScratched.bumpTexture = new BABYLON.Texture('./textures/scratchNormal.jpg', scene);

    spheres[19].bbLabel = getBBLabel(spheres[19], scene, 'Steel Dusty Scratched');
    spheres[19].material = materials.steelDustyScratched;


    //Steel Rougher
    materials.steelRougher = new BABYLON.PBRMaterial('steelRougher', scene);
    materials.steelRougher.reflectionTexture = hdrTexture;
    materials.steelRougher.backFaceCulling = false;
    materials.steelRougher.emissiveColor = new BABYLON.Color3(1, 1, 1);
    materials.steelRougher.specularPower = 8;
    materials.steelRougher.directIntensity = 0;
    materials.steelRougher.environmentIntensity = 0.85;
    materials.steelRougher.cameraExposure = 0.66;
    materials.steelRougher.cameraContrast = 1.66;
    materials.steelRougher.microSurface = 0.8;
    materials.steelRougher.reflectivityColor = new BABYLON.Color3(1, 1, 1);
    materials.steelRougher.albedoColor = new BABYLON.Color3(0, 0, 0);
    materials.steelRougher.bumpTexture = new BABYLON.Texture('./textures/metalBump.jpg', scene);

    spheres[20].bbLabel = getBBLabel(spheres[20], scene, 'Steel Rougher');
    spheres[20].material = materials.steelRougher;


    //Steel Ultra Scratched
    materials.steelUltraScratched1 = new BABYLON.PBRMaterial('steelUltraScratched1', scene);
    materials.steelUltraScratched1.reflectionTexture = hdrTexture;
    materials.steelUltraScratched1.backFaceCulling = false;
    materials.steelUltraScratched1.emissiveColor = new BABYLON.Color3(1, 1, 1);
    materials.steelUltraScratched1.specularPower = 8;
    materials.steelUltraScratched1.directIntensity = 0;
    materials.steelUltraScratched1.environmentIntensity = 0.85;
    materials.steelUltraScratched1.cameraExposure = 0.66;
    materials.steelUltraScratched1.cameraContrast = 1.66;
    materials.steelUltraScratched1.microSurface = 0.8;
    materials.steelUltraScratched1.reflectivityColor = new BABYLON.Color3(1, 1, 1);
    materials.steelUltraScratched1.albedoColor = new BABYLON.Color3(0, 0, 0);
    materials.steelUltraScratched1.bumpTexture = new BABYLON.Texture('./textures/ultraScratchNormal.jpg', scene);

    spheres[21].bbLabel = getBBLabel(spheres[21], scene, 'Steel Ultra Scratched 1');
    spheres[21].material = materials.steelUltraScratched1;


    //Titanium
    materials.titanium = new BABYLON.PBRMaterial('titanium', scene);
    materials.titanium.reflectionTexture = hdrTexture;
    materials.titanium.backFaceCulling = false;
    materials.titanium.emissiveColor = new BABYLON.Color3(1, 1, 1);
    materials.titanium.specularPower = 16;
    materials.titanium.directIntensity = 0;
    materials.titanium.environmentIntensity = 0.85;
    materials.titanium.cameraExposure = 0.66;
    materials.titanium.cameraContrast = 1.66;
    materials.titanium.microSurface = 0.75;
    materials.titanium.reflectivityColor = new BABYLON.Color3(1, 1, 1);
    materials.titanium.albedoColor = new BABYLON.Color3(0.95, 0.95, 0.95);

    spheres[22].bbLabel = getBBLabel(spheres[22], scene, 'Titanium');
    spheres[22].material = materials.titanium;


    //Matte Olive Green
    materials.matOliveGreen = new BABYLON.StandardMaterial('matOliveGreen', scene);
    materials.matOliveGreen.alpha = 1;
    materials.matOliveGreen.backFaceCulling = false;
    materials.matOliveGreen.specularPower = 16;
    materials.matOliveGreen.useSpecularOverAlpha = true;
    materials.matOliveGreen.useAlphaFromDiffuseTexture = false;
    materials.matOliveGreen.diffuseColor = new BABYLON.Color3(0.52, 0.59, 0.38);
    materials.matOliveGreen.emissiveColor = new BABYLON.Color3(0.03, 0.03, 0.03);
    materials.matOliveGreen.ambientColor = new BABYLON.Color3(0.04, 0.04, 0.04);
    materials.matOliveGreen.specularColor = new BABYLON.Color3(0.2, 0.2, 0.2);

    spheres[23].bbLabel = getBBLabel(spheres[23], scene, 'Matte Olive Green');
    spheres[23].material = materials.matOliveGreen;


    //Zinc Blue 1
    materials.zincBlue1 = new BABYLON.PBRMaterial('zincBlue1', scene);
    materials.zincBlue1.reflectionTexture = hdrTexture;
    materials.zincBlue1.backFaceCulling = false;
    materials.zincBlue1.emissiveColor = new BABYLON.Color3(1, 1, 1);
    materials.zincBlue1.specularPower = 8;
    materials.zincBlue1.directIntensity = 0;
    materials.zincBlue1.environmentIntensity = 0.85;
    materials.zincBlue1.cameraExposure = 0.66;
    materials.zincBlue1.cameraContrast = 1.66;
    materials.zincBlue1.microSurface = 0.8;
    materials.zincBlue1.reflectivityColor = new BABYLON.Color3(0.7, 0.7, 0.7);
    materials.zincBlue1.albedoColor = new BABYLON.Color3(0.3, 0.3, 0.8);

    spheres[24].bbLabel = getBBLabel(spheres[24], scene, 'Zinc Blue 1');
    spheres[24].material = materials.zincBlue1;


    //Zinc Yellow 3
    materials.zincYellow3 = new BABYLON.PBRMaterial('zincYellow3', scene);
    materials.zincYellow3.reflectionTexture = hdrTexture;
    materials.zincYellow3.backFaceCulling = false;
    materials.zincYellow3.emissiveColor = new BABYLON.Color3(1, 1, 1);
    materials.zincYellow3.specularPower = 8;
    materials.zincYellow3.directIntensity = 0;
    materials.zincYellow3.environmentIntensity = 0.85;
    materials.zincYellow3.cameraExposure = 0.66;
    materials.zincYellow3.cameraContrast = 1.66;
    materials.zincYellow3.microSurface = 0.8;
    materials.zincYellow3.reflectivityColor = new BABYLON.Color3(0.7, 0.7, 0.7);
    materials.zincYellow3.albedoColor = new BABYLON.Color3(0.8, 0.8, 0.3);

    spheres[25].bbLabel = getBBLabel(spheres[25], scene, 'Zinc Yellow 3');
    spheres[25].material = materials.zincYellow3;


    //Glass
    materials.glass = new BABYLON.PBRMaterial('glass', scene);
    materials.glass.reflectionTexture = hdrTexture;
    materials.glass.refractionTexture = hdrTexture;
    materials.glass.linkRefractionWithTransparency = true;
    materials.glass.indexOfRefraction = 0.52;
    materials.glass.alpha = 0;
    materials.glass.directIntensity = 0.0;
    materials.glass.environmentIntensity = 0.5;
    materials.glass.cameraExposure = 0.5;
    materials.glass.cameraContrast = 1.7;
    materials.glass.microSurface = 1;
    materials.glass.reflectivityColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    materials.glass.albedoColor = new BABYLON.Color3(0.95, 0.95, 0.95);

    spheres[26].bbLabel = getBBLabel(spheres[26], scene, 'Glass');
    //spheres[26].material = materials.glass;


    materials.chrome = new BABYLON.PBRMaterial('chrome', scene);
    materials.chrome.reflectionTexture = hdrTexture;
    materials.chrome.backFaceCulling = false;
    materials.chrome.emissiveColor = new BABYLON.Color3(1, 1, 1);
    materials.chrome.specularPower = 16;
    materials.chrome.directIntensity = 0;
    materials.chrome.environmentIntensity = 0.85;
    materials.chrome.cameraExposure = 0.66;
    materials.chrome.cameraContrast = 1.66;
    materials.chrome.microSurface = 0.96;
    materials.chrome.reflectivityColor = new BABYLON.Color3(1, 1, 1);
    materials.chrome.albedoColor = new BABYLON.Color3(0.95, 0.95, 0.95);

    spheres[27].bbLabel = getBBLabel(spheres[27], scene, 'Chrome');
    spheres[27].material = materials.chrome;

    materials.silver = new BABYLON.PBRMaterial('silver', scene);
    materials.silver.reflectionTexture = hdrTexture;
    materials.silver.backFaceCulling = false;
    materials.silver.emissiveColor = new BABYLON.Color3(1, 1, 1);
    materials.silver.specularPower = 16;
    materials.silver.directIntensity = 0;
    materials.silver.environmentIntensity = 0.85;
    materials.silver.cameraExposure = 0.66;
    materials.silver.cameraContrast = 1.66;
    materials.silver.microSurface = 0.8;
    materials.silver.reflectivityColor = new BABYLON.Color3(1, 1, 1);
    materials.silver.albedoColor = new BABYLON.Color3(0.95, 0.95, 0.95);

    spheres[28].bbLabel = getBBLabel(spheres[28], scene, 'Silver');
    spheres[28].material = materials.silver;


    materials.gold = new BABYLON.PBRMaterial('gold', scene);
    materials.gold.reflectionTexture = hdrTexture;
    materials.gold.backFaceCulling = false;
    materials.gold.emissiveColor = new BABYLON.Color3(1, 1, 1);
    materials.gold.specularPower = 16;
    materials.gold.directIntensity = 0;
    materials.gold.environmentIntensity = 0.85;
    materials.gold.cameraExposure = 0.66;
    materials.gold.cameraContrast = 1.66;
    materials.gold.microSurface = 0.8;
    materials.gold.reflectivityColor = new BABYLON.Color3(0.8, 0.8, 0.2);
    materials.gold.albedoColor = new BABYLON.Color3(0.95, 0.95, 0.95);

    spheres[29].bbLabel = getBBLabel(spheres[29], scene, 'Gold');
    spheres[29].material = materials.gold;


    /* END MATERIALS  */

    scene.registerBeforeRender(function () {
        light.position = camera.position;
    });
    
    return scene;
}

function getBBLabel(mesh, scene, text){
    var label = {
        outputplane : new BABYLON.Mesh.CreatePlane(text + '_outputplane', 25, scene, false),
        outputplaneTexture : new BABYLON.DynamicTexture(text + '_dynamic texture', 1024, scene, true)
    }

    label.outputplane.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
    label.outputplane.material = new BABYLON.StandardMaterial('outputplane', scene);
    var newPos = Object.create(mesh.position);
    newPos.y += 10;
    label.outputplane.position = newPos;

    label.outputplane.material.diffuseTexture = label.outputplaneTexture;
    label.outputplane.material.specularColor = new BABYLON.Color3(0, 0, 0);
    label.outputplane.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
    label.outputplane.material.backFaceCulling = false;

    label.outputplaneTexture.drawText(text, null, 60, 'bold 60px verdana', 'white', null);

    return label;
}
        
var scene = createScene();

//show debug layer
//scene.debugLayer.show();
engine.runRenderLoop(function () {
    scene.render();
});

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
};

window.addEventListener('resize', function () {
    engine.resize();
});


