import React, { useEffect, useState } from "react";
import "./curatorGroups.scss";
import GroupCard from "../../components/GroupCard/GroupCard";
import axios from "axios";
import { store } from "../../reducers";
const CuratorGroups = () => {
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/groups");
        setGroups(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGroups();
  }, []);
  return (
    <div className="curatorGroups">
      <div className="curatorGroups__container">
        <div className="groups__list">
          {groups.map((obj) => {
            for (
              let i = 0;
              i < store.getState().user.currentUser.groups.length;
              i++
            ) {
              if (obj.id == store.getState().user.currentUser.groups[i]) {
                return <GroupCard name={obj.name} key={obj.id} id={obj.id} />;
              }
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default CuratorGroups;
