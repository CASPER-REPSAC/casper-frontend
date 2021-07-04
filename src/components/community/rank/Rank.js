import React, { Component } from "react";
import { InputGroup, OverlayTrigger, Tooltip } from "react-bootstrap";

export default class Rank extends Component {
  render() {
    const rank_dummy = {
      ranks: [
        {
          year: "2021",
          activist: {
            first_user: "neva",
            first_point: 3,
            second_user: "aven",
            second_point: 2,
            third_user: "coais",
            third_point: 1,
          },
          observer: {
            first_user: "coais",
            first_point: 3,
            second_user: "neva",
            second_point: 2,
            third_user: "aven",
            third_point: 1,
          },
          rescuer: {
            first_user: "neva",
            first_point: 3,
            second_user: "coais",
            second_point: 2,
            third_user: "aven",
            third_point: 1,
          },
        },
      ],
      mypoint: { activist: 3, observer: 2, rescuer: 3 },
    };
    return (
      <div>
        <p>Rank</p>
        <div className="ranks d-flex flex-row">
          <div className="ranks__activist border">
            Activist
            <p>
              1st {rank_dummy.ranks[0].activist.first_user} (
              {rank_dummy.ranks[0].activist.first_point})
            </p>
            <p>
              2nd {rank_dummy.ranks[0].activist.second_user} (
              {rank_dummy.ranks[0].activist.second_point})
            </p>
            <p>
              3rd {rank_dummy.ranks[0].activist.third_user} (
              {rank_dummy.ranks[0].activist.third_point})
            </p>
          </div>
          <div className="ranks__observer border">
            Observer
            <p>
              1st {rank_dummy.ranks[0].observer.first_user} (
              {rank_dummy.ranks[0].observer.first_point})
            </p>
            <p>
              2nd {rank_dummy.ranks[0].observer.second_user} (
              {rank_dummy.ranks[0].observer.second_point})
            </p>
            <p>
              3rd {rank_dummy.ranks[0].observer.third_user} (
              {rank_dummy.ranks[0].observer.third_point})
            </p>
          </div>
          <div className="ranks__rescuer border">
            Rescuer
            <p>
              1st {rank_dummy.ranks[0].rescuer.first_user} (
              {rank_dummy.ranks[0].rescuer.first_point})
            </p>
            <p>
              2nd {rank_dummy.ranks[0].rescuer.second_user} (
              {rank_dummy.ranks[0].rescuer.second_point})
            </p>
            <p>
              3rd {rank_dummy.ranks[0].rescuer.third_user} (
              {rank_dummy.ranks[0].rescuer.third_point})
            </p>
          </div>
        </div>

        <div className="my-rank border d-flex flex-row">
          <div className="my-rank__settings border">
            <div className="my-rank__settings__feed d-flex flex-row">
              Feed
              <InputGroup className="mb-3">
                <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="button-tooltip-2">
                      ? Observer Feed <br />
                      If you check this option, you will receive a feed on the
                      activities (not s.o.s)
                    </Tooltip>
                  }
                >
                  {({ ref, ...triggerHandler }) => (
                    <InputGroup.Text {...triggerHandler} ref={ref}>
                      Observer
                    </InputGroup.Text>
                  )}
                </OverlayTrigger>
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="button-tooltip-2">
                      ? Rescuer Feed <br />
                      If you check this option, you will receive s.o.s feed
                    </Tooltip>
                  }
                >
                  {({ ref, ...triggerHandler }) => (
                    <InputGroup.Text {...triggerHandler} ref={ref}>
                      Rescuer
                    </InputGroup.Text>
                  )}
                </OverlayTrigger>
              </InputGroup>
            </div>
            <div className="my-rank__settings__visible d-flex flex-row">
              Hide
              <InputGroup className="mb-3">
                <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="button-tooltip-2">
                      ? Observer Hide
                      <br />
                      If you check this option, you will not be exposed to
                      ranking of observer, etc.
                    </Tooltip>
                  }
                >
                  {({ ref, ...triggerHandler }) => (
                    <InputGroup.Text {...triggerHandler} ref={ref}>
                      Observer
                    </InputGroup.Text>
                  )}
                </OverlayTrigger>
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip id="button-tooltip-2">
                      ? Rescuer Hide
                      <br />
                      If you check this option, you will not be exposed to
                      ranking of rescuer, etc.
                    </Tooltip>
                  }
                >
                  {({ ref, ...triggerHandler }) => (
                    <InputGroup.Text {...triggerHandler} ref={ref}>
                      Rescuer
                    </InputGroup.Text>
                  )}
                </OverlayTrigger>
              </InputGroup>
            </div>
          </div>
          <div className="my-rank__point">
            Neva
            <p>Acitivist: {rank_dummy.mypoint.activist}</p>
            <p>Observer: {rank_dummy.mypoint.observer}</p>
            <p>Rescuer: {rank_dummy.mypoint.rescuer}</p>
          </div>
        </div>

        <div className="analytics">
          <div className="analytics__graph"></div>
        </div>
      </div>
    );
  }
}
