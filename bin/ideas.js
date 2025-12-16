          kindle.net.ensureWifiConnection("never", function (status) {
            requestBattery(function (batt) {
              dispatchUpdate({
                battery: batt,
                online: status === "success",
              });
            });
          });



                    if (isNight()) {
            kindle.net.setWirelessState("off");
            schedulerHandle = setTimeout(wifiCycle, msUntilMorning());
            return;
          }


                  function msUntilMorning() {
          var now = new Date();
          var morning = new Date(now);
          morning.setHours(6, 0, 0, 0);

          if (morning <= now) {
            morning.setDate(morning.getDate() + 1);
          }

          return morning.getTime() - now.getTime();
        }


                function isNight() {
          var h = new Date().getHours();
          return h >= 0 && h < 6;
        }



                function dispatchUpdate(data) {
          if (!contentWindow || !data || !data.online) {
            return;
          }
          setTimeout(function () {
            contentWindow.location.replace(
              "?battery=" + data.level + "&t=" + Date.now()
            );
          }, 100);
        }