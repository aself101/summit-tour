<?php
  /*
    Alexander Self
    9/28/16
    Summit tour application
    index.php: Main Database interaction file with the Summit Tour Application
  */

  // Initialize Database and only accept ajax requests
  if (is_ajax()) {
    $config = parse_ini_file('config.ini');
    $dbname = $config['dbname'];
  
    try {
  		$db = new PDO("mysql:host=localhost;dbname=$dbname;charset=utf8",$config['username'],$config['password']);
  	} catch(PDOException $ex) {
  		echo json_encode("No db connection");
  	}
    if (isset($_GET['tours'])) {
      fetchTours($db, $session);
    } elseif (isset($_GET['addmember'])) {
      addMember($db);
    } elseif (isset($_GET['deletemember'])) {
      deleteMember($db);
    } elseif (isset($_GET['approvetour'])) {
      approveTour($db);
    } elseif (isset($_GET['addtourinfo'])) {
      addTourInfo($db);
    } elseif (isset($_GET['assigntour'])) {
      assignTour($db);
    } elseif (isset($_GET['denytour'])) {
      denyTour($db);
    } elseif (isset($_GET['addcomment'])) {
      addComment($db);
    } elseif (isset($_GET['getUser'])) {
      getUser($session);
    }

  }

  function is_ajax() {
    return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
  }

  function getUser($session) {
    $user = $session->data[0];
    echo json_encode($user);
  }

  // Fetches all current tours
  function fetchTours($db, $session) {
    // Grab all current tours
    $stmt = $db->prepare("SELECT * from star WHERE dateStart >= CURDATE() AND STATUS !='3'");
    $stmt->execute();
    $star = $stmt->fetchAll(PDO::FETCH_ASSOC);


    // Put ids into an array to pull remainder of information
    $tour_ids = getTourIds($star);
    $tour = array();
    $tours = array();
    // Since star table is cached, store each record as Main info
    $c = 0;
    // Create state tree of tours
    foreach ($tour_ids as $value) {
      $tour = getTour($db, $value);
      // Push tour into tours array
      $tours[$c] = $tour;
      $c++;
    }

    echo json_encode($tours);
  }
  // Adds a member to the tour
  function addMember($db) {
    $data = $_GET['data'];
    $tour_id = $_GET['data']['SID'];
    $name = $_GET['data']['NAME'];
    $age = $_GET['data']['AGE'];
    $disability = $_GET['data']['DISABILITY'];

    $stmt = $db->prepare("INSERT INTO starMember (NAME, AGE, DISABILITY, SID) VALUES(?, ?, ?, ?)");
    $stmt->execute(array($name,$age,$disability,$tour_id));

    $tour = getTour($db, $tour_id);

    echo json_encode($tour);
  }
  // Deletes a member from the tour
  function deleteMember($db) {
    $tour_id = $_GET['data']['SID'];
    $member_id = $_GET['data']['ID'];

    $stmt = $db->prepare("DELETE FROM starMember WHERE ID='$member_id'");
    $stmt->execute();

    $tour = getTour($db, $tour_id);

    echo json_encode($tour);
  }

  // May require Email send outs
  // Approves a tour; Current guid is DEPT_TourId
  function approveTour($db) {
    $tour_id = $_GET['data']['SID'];
    $guid = $_GET['data']['GUID'];
    $status = $_GET['data']['STATUS'];
    $dept = $_GET['data']['DEPT'];

    $stmt = $db->prepare("INSERT INTO starSig (SID, GUID, STATUS, DEPT) VALUES(?, ?, ?, ?)");
    $stmt->execute(array($tour_id,$guid,$status,$dept));

    $stmt = $db->prepare("UPDATE star SET STATUS='$status' WHERE ID='$tour_id'");
    $stmt->execute();

    $tour = getTour($db, $tour_id);

    echo json_encode($tour);
  }

  // Updates tour information i nthe Assign Tour form
  function addTourInfo($db) {
    $tour_id = $_GET['data']['SID'];
    $tourDate = $_GET['data']['tourDate'];
    $tourSize = $_GET['data']['tourSize'];
    $numMinors = $_GET['data']['numMinors'];
    $briefInstructor = $_GET['data']['briefInstructor'];
    $briefLocation = $_GET['data']['briefLocation'];
    $briefTime = $_GET['data']['briefTime'];
    $tourTime = $_GET['data']['tourTime'];
    $tourGuide = $_GET['data']['tourGuide'];
    $signedForms = $_GET['data']['signedForms'];
    $MEALS = $_GET['data']['MEALS'];
    $LODGING = $_GET['data']['LODGING'];
    $TRANSPORTATION = $_GET['data']['TRANSPORTATION'];

    $stmt = $db->prepare("INSERT INTO starTour (SID, tourDate, tourSize, numMinors, briefInstructor, briefLocation,
                          briefTime, tourTime, tourGuide, signedForms, MEALS, LODGING, TRANSPORTATION)
                          VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)
                          ON DUPLICATE KEY UPDATE
                          tourDate = VALUES(tourDate), tourSize = VALUES(tourSize), numMinors = VALUES(numMinors),
                          briefInstructor = VALUES(briefInstructor), briefLocation = VALUES(briefLocation),
                          briefTime = VALUES(briefTime), tourTime = VALUES(tourTime), tourGuide = VALUES(tourGuide),
                          signedForms = VALUES(signedForms), MEALS = VALUES(MEALS), LODGING = VALUES(LODGING),
                          TRANSPORTATION = VALUES(TRANSPORTATION)");
    $stmt->execute(array($tour_id,$tourDate,$tourSize,$numMinors,$briefInstructor,$briefLocation,$briefTime,$tourTime,
      $tourGuide,$signedForms,$MEALS,$LODGING,$TRANSPORTATION));

    $tour = getTour($db, $tour_id);

    echo json_encode($tour);
  }
  // Assigns tour, sets status to approve
  function assignTour($db) {
    $tour_id = $_GET['data']['info']['SID'];
    $tourDate = $_GET['data']['info']['tourDate'];
    $tourSize = $_GET['data']['info']['tourSize'];
    $numMinors = $_GET['data']['info']['numMinors'];
    $briefInstructor = $_GET['data']['info']['briefInstructor'];
    $briefLocation = $_GET['data']['info']['briefLocation'];
    $briefTime = $_GET['data']['info']['briefTime'];
    $tourTime = $_GET['data']['info']['tourTime'];
    $tourGuide = $_GET['data']['info']['tourGuide'];
    $signedForms = $_GET['data']['info']['signedForms'];
    $MEALS = $_GET['data']['info']['MEALS'];
    $LODGING = $_GET['data']['info']['LODGING'];
    $TRANSPORTATION = $_GET['data']['info']['TRANSPORTATION'];

    // Update tour for approval
    $stmt = $db->prepare("UPDATE starTour SET tourDate=?, tourSize=?, numMinors=?, briefInstructor=?, briefLocation=?,
                          briefTime=?, tourTime=?, tourGuide=?, signedForms=?, MEALS=?, LODGING=?, TRANSPORTATION=?
                          WHERE SID=?");
    $stmt->execute(array($tour_id,$tourDate,$tourSize,$numMinors,$briefInstructor,$briefLocation,$briefTime,$tourTime,
      $tourGuide,$signedForms,$MEALS,$LODGING,$TRANSPORTATION));

    // Set status to approved
    updateStatus($db, '2', $tour_id);

    // Pull newly updated tour
    $tour = getTour($db, $tour_id);

    /**************************************
      Send out email notice with tour info
    ***************************************/
    //emailAssignTour($tour);

    echo json_encode($tour);
  }
  // Tour is denied
  function denyTour($db) {
    $tour_id = $_GET['data']['ID'];
    $reasons = $_GET['data']['reasons'];

    updateStatus($db, '3', $tour_id);

    // Pull newly updated tour
    $tour = getTour($db, $tour_id);


    //denyTourEmail($tour, $reasons);

    echo json_encode($tour);
  }

  // Add comments to tour
  function addComment($db) {
    $tour_id = $_GET['data']['SID'];
    $comment = $_GET['data']['COMMENTS'];
    $name = $_GET['data']['NAME'];
    $date = $_GET['data']['DATE'];
    $cn = $_GET['data']['CN'];

    $stmt = $db->prepare("INSERT INTO starComments (SID, NAME, COMMENTS, DATE, CN) VALUES(?,?,?,CURDATE(),?)");
    $stmt->execute(array($tour_id, $name, $comment, $cn));

    $tour = getTour($db, $tour_id);

    echo json_encode($tour);
  }

  /****************************** Helpers ******************************/
  // Pulls all current tour ids
  function getTourIds($query) {
    $tour_ids = array();
    $tour_count = 0;
    foreach ($query as $i => $v1) {
      foreach ($query[$i] as $j => $v2) {
        if ($j == "ID")
          $tour_ids[$tour_count] = $v2;
      }
      $tour_count++;
    }
    return $tour_ids;
  }
  // Pulls general table queries based on tour id
  function getQuery($db, $tour_id, $table_name) {
    $stmt = $db->prepare("SELECT * from $table_name WHERE SID='$tour_id'");
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return $rows;
  }
  // Star table only, as ID is the primary key passed around to all tables
  function getStarTableOnly($db, $tour_id) {
    $stmt = $db->prepare("SELECT * from star WHERE ID='$tour_id'");
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return $rows[0];
  }
  // Pulls single tour
  function getTour($db, $tour_id) {
    $tour = array();
    $tour['main'] = getStarTableOnly($db, $tour_id);
    $tour['signatures'] = getQuery($db, $tour_id, 'starSig');
    $tour['tourMembers'] = getQuery($db, $tour_id, 'starMember');
    $tour['comments'] = getQuery($db, $tour_id, 'starComments');
    $tour['assignTour'] = getQuery($db, $tour_id, 'starTour');

    return $tour;
  }
  // Updates status of the tour
  function updateStatus($db, $status, $tour_id) {
    $stmt = $db->prepare("UPDATE star SET status='$status' WHERE ID='$tour_id'");
    $stmt->execute();
    return 0;
  }

  function assignTourEmail($tour) {
    echo json_encode($tour);
  }

  function denyTourEmail($tour) {
    echo json_encode($tour);
  }

  /*********************************************************************/














































?>
